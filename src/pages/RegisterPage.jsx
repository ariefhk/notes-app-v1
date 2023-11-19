import { useMutation } from "@tanstack/react-query";
import useInput from "../hooks/useInput";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: ({ name, email, password }) => {
            return fetch(`https://notes-api.dicoding.dev/v1/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });
    const { val: name, onValChange: onNameChange } = useInput("");
    const { val: email, onValChange: onEmailChange } = useInput("");
    const { val: password, onValChange: onPasswordChange } = useInput("");
    // const [name, onNameChange] = useInput("");
    // const [email, onEmailChange] = useInput("");
    // const [password, onPasswordChange] = useInput("");
    const { val: confirmPassword, onValChange: onConfirmPasswordChange } = useInput("");
    // const [confirmPassword, onConfirmPasswordChange] = useInput("");
    const [isSubmitInput, setIsSubmitInput] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prevState) => !prevState);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPassword = () => setShowConfirmPassword((prevState) => !prevState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("invalid check password");
            return;
        }

        try {
            const response = await mutateAsync({ name, email, password });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toast.success("Berhasil Registrasi!", {
                    autoClose: 1500,
                });
                navigate("/login", { replace: true });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className='mx-auto flex h-screen w-screen flex-col bg-white  px-[26px] pt-[60px]'>
            <h1 className='mb-[24px] text-[24px] font-bold leading-[36px]'>Daftar</h1>
            <form className='flex flex-col gap-[16px] ' onSubmit={handleSubmit}>
                {/* name field */}
                <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='name' className='text-[12px] leading-[18px]'>
                        Nama
                    </label>
                    <input
                        type='text'
                        required
                        onFocus={() => setIsSubmitInput(true)}
                        onBlur={() => setIsSubmitInput(false)}
                        placeholder='Contoh: Jhon Doe'
                        id='name'
                        className='h-[48px]  rounded-rad16 border px-[12px] py-[16px] outline-blum-4'
                        name={name}
                        onChange={onNameChange}
                    />
                </div>
                {/* email field */}
                <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='email' className='text-[12px] leading-[18px]'>
                        Email
                    </label>
                    <input
                        type='email'
                        required
                        onFocus={() => setIsSubmitInput(true)}
                        onBlur={() => setIsSubmitInput(false)}
                        placeholder='Contoh: johndoe@gmail.com'
                        id='email'
                        className='h-[48px] rounded-rad16 border px-[12px] py-[16px] outline-blum-4'
                        name={email}
                        onChange={onEmailChange}
                    />
                </div>
                {/* password field */}
                <div className=' flex flex-col gap-[4px]'>
                    <label htmlFor='password' className='text-[12px] leading-[18px]'>
                        Password
                    </label>
                    <div className='relative w-full'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            required
                            onFocus={() => setIsSubmitInput(true)}
                            onBlur={() => setIsSubmitInput(false)}
                            placeholder='Masukan Password'
                            className='h-[48px] w-full  cursor-pointer appearance-none rounded-rad16 border py-[16px] pl-[12px] pr-[48px] outline-blum-4'
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
                {/* confirmation password field */}
                <div className=' flex flex-col gap-[4px]'>
                    <label htmlFor='confirm_password' className='text-[12px] leading-[18px]'>
                        Konfirmasi Password
                    </label>
                    <div className='relative w-full'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='confirm_password'
                            required
                            onFocus={() => setIsSubmitInput(true)}
                            onBlur={() => setIsSubmitInput(false)}
                            placeholder='Masukan Password yang sama'
                            className='h-[48px] w-full  cursor-pointer appearance-none rounded-rad16 border py-[16px] pl-[12px] pr-[48px] outline-blum-4'
                            name={confirmPassword}
                            onChange={onConfirmPasswordChange}
                        />
                        {showConfirmPassword ? (
                            <FiEye
                                onClick={toggleConfirmPassword}
                                className={clsx(
                                    "absolute right-[12px] top-[50%] mr-3 h-[24px] w-[24px] translate-y-[-50%] cursor-pointer text-blum-4",
                                )}
                            />
                        ) : (
                            <FiEyeOff
                                onClick={toggleConfirmPassword}
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
                            " flex h-[48px] w-full  items-center justify-center gap-[16px] rounded-rad16 px-[6px] py-[3px] text-white",
                            { "bg-blum-4": !isPending },
                            { "bg-blum-4 opacity-50": isPending },
                        )}>
                        {/* loader */}
                        {isPending && (
                            <svg
                                aria-hidden='true'
                                className='h-[26px] w-[26px] animate-spin fill-blue-700 font-bold text-gray-200 dark:text-gray-600'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                    fill='currentColor'
                                />
                                <path
                                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                    fill='currentFill'
                                />
                            </svg>
                        )}
                        Daftar
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
                <span className='text-[14px] leading-[20px]'>Sudah Punya Akun ? </span>{" "}
                {/* <span
                    className='cursor-pointer text-[14px] font-bold leading-[20px] text-blum-4'
                    onClick={() => {
                        navigate("/login", { replace: true });
                    }}>
                    Masuk Disini!
                </span> */}
                <Link to={"/login"} replace className='cursor-pointer text-[14px] font-bold leading-[20px] text-blum-4'>
                    Masuk Disini!
                </Link>
            </div>
        </section>
    );
}
