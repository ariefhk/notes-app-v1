import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import clsx from "clsx";
import { putAccessToken } from "../lib/api";
import { toast } from "react-toastify";

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
    const [email, onEmailChange] = useInput("");
    const [password, onPasswordChange] = useInput("");
    const [confirmPassword, onConfirmPasswordChange] = useInput("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkInput = email || password || confirmPassword;

        if (!checkInput) {
            alert("input cant be empty");
            return;
        }

        if (password !== confirmPassword) {
            alert("invalid check password");
            return;
        }

        try {
            const response = await mutateAsync({ email, password });
            const data = await response.json();
            const token = data?.data?.accessToken;
            putAccessToken(token);
            if (response.ok) {
                toast.success("Berhasil Login!", {
                    autoClose: 1500,
                });
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className='flex h-screen w-screen items-center justify-center bg-slate-500 '>
            <form className='bg-white' onSubmit={handleSubmit}>
                <h1>LoginPage</h1>

                <div className='flex gap-[16px]'>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' id='email' className='border' name={email} onChange={onEmailChange} />
                </div>
                <div className='flex gap-[16px]'>
                    <label htmlFor='password'>Password :</label>
                    <input
                        type='password'
                        id='password'
                        className='border'
                        name={password}
                        onChange={onPasswordChange}
                    />
                </div>
                <div className='flex gap-[16px]'>
                    <label htmlFor='confirm-password'>Confirm Password :</label>
                    <input
                        type='password'
                        id='confirm-password'
                        className='border'
                        name={confirmPassword}
                        onChange={onConfirmPasswordChange}
                    />
                </div>
                <div className='flex gap-[16px]'>
                    <button
                        disabled={isPending}
                        type='submit'
                        className={clsx(
                            " px-[6px] py-[3px]  text-white",
                            { "bg-blue-600": !isPending },
                            { "bg-red-600": isPending },
                        )}>
                        Login
                    </button>
                    <button
                        onClick={() => {
                            navigate("/register", { replace: true });
                        }}
                        className='bg-blue-600 px-[6px] py-[3px]  text-white'>
                        i dont have an account
                    </button>
                </div>
            </form>
        </section>
    );
}
