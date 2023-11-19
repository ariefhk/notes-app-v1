import BottomNavigation from "../components/BottomNavigation";
import Loader from "../components/Loader";
import useInput from "../hooks/useInput";
import { cn } from "../utils/tailwind-utils";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getAccessToken } from "../lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AddNotePage() {
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["add-notes"],
        mutationFn: ({ title, body }) => {
            return fetch(`https://notes-api.dicoding.dev/v1/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({ title, body }),
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const { val: title, onValChange: onChangeTitle, clearVal: clearTitle } = useInput("");
    const { val: body, onValChange: onChangeBody, clearVal: clearBody } = useInput("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await mutateAsync({ title, body });
            const data = await response.json();

            if (!response?.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Buat Catatan",
                    text: `${data.message}`,
                    timerProgressBar: true,
                    timer: 1300,
                });
            } else if (response.ok) {
                toast.success("Berhasil Buat Catatan!", {
                    autoClose: 1200,
                });
                navigate("/");
            }

            console.log(response);
            console.log(data);
            clearTitle();
            clearBody();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className='h-screen w-screen overflow-x-hidden'>
            <section className={cn("px-[24px] pt-[40px]")}>
                <h1 className='text-[24px] font-bold leading-[30px]'>Tambah Catatan</h1>
                <form onSubmit={onSubmit} className='mt-[24px] flex flex-col space-y-[24px]'>
                    {/* title field */}
                    <div className='flex flex-col gap-[4px]'>
                        <label htmlFor='title' className='text-[12px] leading-[18px]'>
                            Judul
                        </label>
                        <input
                            disabled={isPending}
                            id='title'
                            type='title'
                            name='title'
                            required
                            placeholder='Masukan judul catatan'
                            className='h-[48px]  rounded-rad16 border px-[12px] py-[16px] outline-blum-4'
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </div>
                    {/* body field */}
                    <div className='flex flex-col gap-[4px]'>
                        <label htmlFor='body' className='text-[12px] leading-[18px]'>
                            Catatan
                        </label>
                        <textarea
                            disabled={isPending}
                            id='body'
                            name='body'
                            required
                            placeholder='Masukan catatan'
                            cols='30'
                            className='  rounded-rad16 border px-[12px] py-[16px] outline-blum-4'
                            rows='10'
                            value={body}
                            onChange={onChangeBody}></textarea>
                    </div>
                    {/* button submit */}
                    <div className='mt-[8px] '>
                        <button
                            disabled={isPending}
                            type='submit'
                            className={cn(
                                "flex h-[48px] w-full items-center justify-center gap-[16px] rounded-rad16 bg-blum-4 px-[6px] py-[3px] text-white",
                                { "bg-blum-4 opacity-50": isPending },
                            )}>
                            {/* loader */}
                            {isPending && <Loader />}
                            Buat Catatan
                        </button>
                    </div>
                </form>
            </section>
            <BottomNavigation />
        </main>
    );
}
