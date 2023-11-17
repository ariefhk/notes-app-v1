// third party
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";

// component
import BottomNavigation from "../components/BottomNavigation";

// api
import { getAccessToken } from "../lib/api";

// utils
import { formatDotString } from "../utils/formatDotString";

// hooks
// import useInput from "../hooks/useInput";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function HomePage() {
    const [keywordTodo, setKeywordTodo] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const keywordParams = searchParams.get("keyword") || "";
    const debouncedKeywordParams = useDebounce(keywordParams, 300);
    const navigate = useNavigate();

    const {
        data: todos,
        isError,
        isLoading,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["getTodos", debouncedKeywordParams],
        queryFn: async ({ signal }) => {
            const response = await fetch(`https://notes-api.dicoding.dev/v1/notes`, {
                signal,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            if (!response.ok) {
                navigate("/login", { replace: true });
                throw new Error(response.statusText);
            }

            const data = await response.json();
            const hasilFilterKeyword = data?.data.filter((todo) => {
                return todo.title.toLowerCase().includes(debouncedKeywordParams.toLowerCase());
            });
            return hasilFilterKeyword;
        },
    });

    // const notify = () =>
    //     toast.success("Wow so easy !", {
    //         autoClose: 2000,
    //     });

    if (isError) {
        return <h1>Sorry you have error</h1>;
    }

    if (isLoading) {
        console.log("loading ...");
    }

    const handleKeywordOnChange = (keyword) => {
        if (keyword) {
            setSearchParams({ keyword });
        } else {
            setSearchParams({});
        }
        refetch();
        setKeywordTodo(keyword);
    };

    console.log("render home page");

    return (
        <main className='h-screen w-screen overflow-x-hidden'>
            <section className=' px-[24px] pt-[40px]'>
                <h1 className='text-[24px] font-bold leading-[30px]'>Daftar Catatan</h1>
                <input
                    id='catatan'
                    type='text'
                    name={keywordTodo}
                    onChange={(e) => handleKeywordOnChange(e.target.value)}
                    placeholder='Cari Catatan Anda ...'
                    className='mt-[24px] h-[48px] w-full rounded-rad16 border px-[12px] py-[16px] outline-blum-4'
                />
                {isLoading && <h1>Loadingg ...</h1>}
                <div
                    style={{ height: "calc(100vh - 220px)" }}
                    className='mt-[24px] grid  grid-cols-12 gap-[12px] overflow-y-scroll pb-[64px]'>
                    {isSuccess &&
                        todos?.map((todo) => {
                            // console.log(todo);
                            return (
                                <div
                                    key={todo.id}
                                    className='col-span-12  h-[200px] rounded-rad16 border p-[12px] hover:border-blum-4'>
                                    <h1 className='text-[16px] font-bold leading-[22px]'>
                                        {formatDotString(todo?.title, 60)}
                                    </h1>
                                    <span className='mt-[4px] text-[#8A8A8A8A]'>{todo?.createdAt}</span>
                                    <p className='mt-[16px] text-[14px] leading-[20px]'>
                                        {formatDotString(todo?.body, 150)}
                                    </p>
                                </div>
                            );
                        })}
                    {/* Placeholder */}
                    {isSuccess && todos?.data?.length < 3 && (
                        <div className='invisible col-span-12  h-[200px] rounded-rad16 border p-[12px] hover:border-blum-4'>
                            <h1 className='text-[16px] font-bold leading-[22px]'></h1>
                            <span className='mt-[4px] text-[#8A8A8A8A]'></span>
                            <p className='mt-[16px] text-[14px] leading-[20px]'></p>
                        </div>
                    )}
                </div>
            </section>
            <BottomNavigation />
        </main>
    );
}
