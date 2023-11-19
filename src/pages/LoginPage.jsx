import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import clsx from "clsx";
import { putAccessToken } from "../lib/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

export default function LoginPage() {
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: ({ email, password }) => {
            return fetch(`https://notes-api.dicoding.dev/v1/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const navigate = useNavigate();
    // const [email, onEmailChange] = useInput("");
    const { val: email, onValChange: onEmailChange } = useInput("");
    const { val: password, onValChange: onPasswordChange } = useInput("");
    const [isSubmitInput, setIsSubmitInput] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prevState) => !prevState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkInput = email || password;

        if (!checkInput) {
            alert("input cant be empty");
            return;
        }

        try {
            const response = await mutateAsync({ email, password });
            const data = await response.json();

            if (!response?.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Login!",
                    text: `${data.message}`,
                    timerProgressBar: true,
                    timer: 1300,
                });
                return;
            }

            if (response.ok) {
                const token = data?.data?.accessToken;
                putAccessToken(token);
                toast.success("Berhasil Login!", {
                    autoClose: 1200,
                });
                navigate("/", { replace: true });
            }

            console.log(response);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className='mx-auto flex h-screen w-screen flex-col bg-white  px-[26px] pt-[60px]'>
            <h1 className='mb-[24px] text-[24px] font-bold leading-[36px]'>Masuk</h1>
            <form className='flex flex-col gap-[16px] ' onSubmit={handleSubmit}>
                {/* email field */}
                <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='email' className='text-[12px] leading-[18px]'>
                        Email
                    </label>
                    <input
                        disabled={isPending}
                        type='email'
                        required
                        onFocus={() => setIsSubmitInput(true)}
                        onBlur={() => setIsSubmitInput(false)}
                        placeholder='Contoh: johndoe@gmail.com'
                        id='email'
                        className='h-[48px]  rounded-rad16 border px-[12px] py-[16px] outline-blum-4'
                        name={email}
                        onChange={onEmailChange}
                    />
                </div>
                {/* password field */}
                <div className=' flex flex-col gap-[4px]'>
                    <label htmlFor='password' className='text-[12px] leading-[18px]'>
                        Password
                    </label>
                    <div className='relative w-full '>
                        <input
                            disabled={isPending}
                            type={showPassword ? "text" : "password"}
                            id='password'
                            required
                            onFocus={() => setIsSubmitInput(true)}
                            onBlur={() => setIsSubmitInput(false)}
                            placeholder='Masukan Password'
                            className='h-[48px] w-full cursor-pointer appearance-none rounded-rad16 border py-[16px] pl-[12px] pr-[48px] outline-blum-4'
                            name={password}
                            onChange={onPasswordChange}
                        />
                        {showPassword ? (
                            <FiEye
                                onClick={togglePassword}
                                className={clsx(
                                    "absolute right-[12px] top-[50%] mr-3 h-[24px] w-[24px] translate-y-[-50%] cursor-pointer text-blum-4",
                                )}
                            />
                        ) : (
                            <FiEyeOff
                                onClick={togglePassword}
                                className={clsx(
                                    "absolute right-[12px] top-[50%] mr-3 h-[24px] w-[24px] translate-y-[-50%] cursor-pointer text-[#8A8A8A]",
                                )}
                            />
                        )}
                    </div>
                </div>
                {/* button submit */}
                <div className='mt-[8px] '>
                    <button
                        disabled={isPending}
                        type='submit'
                        className={clsx(
                            " flex h-[48px] w-full items-center justify-center gap-[16px] rounded-rad16 px-[6px] py-[3px] text-white",
                            { "bg-blum-4": !isPending },
                            { "bg-blum-4 opacity-50": isPending },
                        )}>
                        {/* loader */}
                        {isPending && <Loader />}
                        Login
                    </button>
                </div>
            </form>

            {/* redirect register */}
            <div
                className={clsx(
                    " bottom-[66px] left-[50%] flex w-max translate-x-[-50%] items-center justify-center gap-[8px]",
                    { hidden: isSubmitInput },
                    { fixed: !isSubmitInput },
                )}>
                <span className='text-[14px] leading-[20px]'>Belum Punya Akun ? </span>{" "}
                <span
                    className='cursor-pointer text-[14px] font-bold leading-[20px] text-blum-4'
                    onClick={() => {
                        navigate("/register", { replace: true });
                    }}>
                    Daftar Disini!
                </span>
            </div>
        </section>
    );
}
