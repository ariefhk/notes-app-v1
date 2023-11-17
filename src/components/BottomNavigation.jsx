import { MdDarkMode, MdArchive, MdHome, MdNoteAdd, MdLogout, MdOutlineWbSunny } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { ThemeContext } from "../context/theme-context";
import { useContext } from "react";
import { deleteAccessToken } from "../lib/api";

const navConfig = [
    { id: 1, name: "Gelap", href: "", iconA: MdDarkMode, iconB: MdOutlineWbSunny },
    {
        id: 2,
        name: "Arsip",
        href: "/archive",
        iconA: MdArchive,
        iconB: "",
    },
    { id: 3, name: "Beranda", href: "/", iconA: MdHome, iconB: "" },
    { id: 4, name: "Buat", href: "/add", iconA: MdNoteAdd, iconB: "" },
    { id: 5, name: "Keluar", href: "/login", iconA: MdLogout, iconB: "" },
];

export default function BottomNavigation() {
    const { theme, changeTheme } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();

    const logOut = () => {
        deleteAccessToken();
        navigate("/login", { replace: true });
    };

    return (
        <section className='fixed bottom-0 flex h-[60px] w-full items-center justify-between bg-white px-[24px] shadow-low'>
            {navConfig.map((nav) => {
                const NavIconA = nav?.iconA;

                if (nav?.name?.toLowerCase() === "gelap") {
                    const NavIconB = nav?.iconB;
                    return (
                        <div
                            key={nav.id}
                            onClick={() => changeTheme()}
                            className={clsx("group/dark-btn flex flex-col items-center gap-[4px]  ")}>
                            {theme === "light" ? (
                                <NavIconA className='h-[24px] w-[24px] text-[#8A8A8A] group-hover/dark-btn:text-blum-4 ' />
                            ) : (
                                <NavIconB className='h-[24px] w-[24px] text-[#8A8A8A]' />
                            )}
                            {theme === "light" ? (
                                <p className='text-[10px] leading-[14px] text-[#8A8A8A] group-hover/dark-btn:text-blum-4'>
                                    {nav?.name}
                                </p>
                            ) : (
                                <p className='text-[10px] leading-[14px] text-[#8A8A8A]'>Cerah</p>
                            )}
                        </div>
                    );
                } else if (nav?.name?.toLowerCase() === "keluar") {
                    return (
                        <div
                            key={nav.id}
                            onClick={() => logOut()}
                            className={clsx("group/logout-btn flex flex-col items-center gap-[4px]  ")}>
                            <NavIconA className='h-[24px] w-[24px] text-[#8A8A8A] group-hover/logout-btn:text-blum-4 ' />
                            <p className='text-[10px] leading-[14px] text-[#8A8A8A] group-hover/logout-btn:text-blum-4'>
                                {nav?.name}
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <Link to={nav.href} key={nav.id} className='flex flex-col items-center gap-[4px] '>
                            <NavIconA
                                className={clsx("h-[24px] w-[24px] text-[#8A8A8A]", {
                                    "text-blum-4": location.pathname === nav.href,
                                })}
                            />
                            <p
                                className={clsx("text-[10px] leading-[14px] text-[#8A8A8A]", {
                                    "text-blum-4": location.pathname === nav.href,
                                })}>
                                {nav?.name}
                            </p>
                        </Link>
                    );
                }
            })}
        </section>
    );
}
