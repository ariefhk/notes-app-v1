import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import clsx from "clsx";
import { putAccessToken } from "../lib/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { AxiosError } from "axios";
import { login } from "../axios/auth";
import useCheckInputField from "../hooks/useCheckInputField";
import { cn } from "../utils/tailwind-utils";

export default function LoginPage() {
    const navigate = useNavigate();
    const { val: email, onValChange: onEmailChange } = useInput("");
    const { val: password, onValChange: onPasswordChange } = useInput("");
    const { statusInput, makeStatusInputActive, makeStatusInputNonActive } = useCheckInputField();

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prevState) => !prevState);

    const { mutate, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ email, password }) => {
            const response = await login({ email, password });
            return response;
        },
        onSuccess: (data) => {
            const token = data?.data?.accessToken;
            putAccessToken(token);

            toast.success("Berhasil Login!", {
                autoClose: 1200,
            });

            navigate("/", { replace: true });
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                const errorData = error.response.data;
                console.log(error.response.data);
                Swal.fire({
                    icon: "error",
                    title: "Gagal Login!",
                    text: `${errorData?.message}`,
                    timerProgressBar: true,
                    timer: 1300,
                });
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkInput = email || password;

        if (!checkInput) {
            alert("input cant be empty");
            return;
        }
        mutate({ email, password });
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
                        onFocus={() => makeStatusInputActive()}
                        onBlur={() => makeStatusInputNonActive()}
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
                            onFocus={() => makeStatusInputActive()}
                            onBlur={() => makeStatusInputNonActive()}
                            placeholder='Masukan Password'
                            className='h-[48px] w-full cursor-pointer appearance-none rounded-rad16 border py-[16px] pl-[12px] pr-[48px] outline-blum-4'
                            name={password}
                            onChange={onPasswordChange}
                        />
                        {showPassword ? (
                            <FiEye
                                onClick={togglePassword}
                                className={cn(
                                    "absolute right-[12px] top-[50%] mr-3 h-[24px] w-[24px] translate-y-[-50%] cursor-pointer text-blum-4",
                                )}
                            />
                        ) : (
                            <FiEyeOff
                                onClick={togglePassword}
                                className={cn(
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
                        className={cn(
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
                    { hidden: statusInput },
                    { fixed: !statusInput },
                )}>
                <span className='text-[14px] leading-[20px]'>Belum Punya Akun ? </span>{" "}
                <Link
                    to={"/register"}
                    replace
                    className='cursor-pointer text-[14px] font-bold leading-[20px] text-blum-4'>
                    Daftar Disini!
                </Link>
            </div>
        </section>
    );
}
