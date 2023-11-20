//core
import { useState, useContext } from "react";

// third party
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import axios, { AxiosError } from "axios";

// component
import BottomNavigation from "../components/BottomNavigation";

// api
import { getAccessToken } from "../lib/api";

//context
// import { ThemeContext } from "../context/theme-context";
import { LocaleContext } from "../context/locale-context";

// utils
import { formatDotString } from "../utils/formatDotString";

// hooks
// --

const reformatDateWithHour = (date, locale) => {
    // const dayMonthYear = new Date(date).toLocaleString(locale, { day: "numeric", month: "long", year: "numeric" });
    // const hours = new Date(date).toLocaleString(locale, { hour: "2-digit" });
    // const minutes = new Date(date).toLocaleString(locale, { minute: "2-digit" });
    // const formattedHours = hours < 10 ? `0${hours}` : String(hours);
    // const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);
    // const localeFormat =
    //     locale === "id" ? `Pukul ${formattedHours}:${formattedMinutes}` : `${formattedHours}:${formattedMinutes}`;

    const weekDay = new Date(date).toLocaleString(locale, { weekday: "long" });
    const dayMonthYear = new Date(date).toLocaleString(locale, { day: "numeric", month: "long", year: "numeric" });
    const time = new Date(date).toLocaleString(locale, { hour: "numeric", minute: "numeric", hour12: locale == "en" });
    const localeFormat = locale === "id" ? `Pukul ${time}` : String(time);

    return `${weekDay}, ${dayMonthYear} ${localeFormat}`;
};

export default function HomePage() {
    const [keywordTodo, setKeywordTodo] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const keywordParams = searchParams.get("keyword") || "";
    const debouncedKeywordParams = useDebounce(keywordParams, 300);
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);

    const {
        data: todos,
        isError,
        isLoading,
        isSuccess,
        refetch: refetchTodos,
    } = useQuery({
        queryKey: ["getTodos", debouncedKeywordParams],
        queryFn: async ({ signal }) => {
            try {
                const responseAxios = await axios.get(`https://notes-api.dicoding.dev/v1/notes`, {
                    signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                const hasilFilterKeywordAxios = responseAxios.data?.data.filter((todo) => {
                    return todo.title.toLowerCase().includes(debouncedKeywordParams.toLowerCase());
                });
                return hasilFilterKeywordAxios;
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error?.response?.status === 401) {
                        navigate("/login", { replace: true });
                        console.log(error.response.data);
                        throw new Error("Access denied!");
                    }
                }
            }
        },
    });

    // if (isError) {
    //     return <h1>Sorry you have error</h1>;
    // }

    // if (isLoading) {
    //     console.log("loading ...");
    // }

    const handleKeywordOnChange = (keyword) => {
        if (keyword) {
            setSearchParams({ keyword });
        } else {
            setSearchParams({});
        }
        refetchTodos();
        setKeywordTodo(keyword);
    };

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
                <div
                    style={{ height: "calc(100vh - 220px)" }}
                    className='mt-[24px] grid  grid-cols-12 gap-[12px] overflow-y-scroll pb-[64px]'>
                    {isLoading && (
                        <>
                            <div className='col-span-12  flex h-[200px] animate-pulse flex-col  rounded-rad16 border p-[12px] '>
                                <div className='h-[16px] w-full rounded-full bg-gray-200'></div>
                                <div className='mt-[4px] h-[16px] w-2/3 rounded-full bg-gray-200'></div>
                                <div className='mt-[16px] w-full flex-1 rounded-[12px] bg-gray-200'></div>
                            </div>
                        </>
                    )}
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
                                    <span className='mt-[4px] text-[#8A8A8A8A]'>
                                        {reformatDateWithHour(todo?.createdAt, locale)}
                                    </span>
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
