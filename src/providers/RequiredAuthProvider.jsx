// third party
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";

// lib
import { getAccessToken } from "../lib/api";

export default function RequiredAuthProvider() {
    const navigate = useNavigate();
    const { isSuccess, isLoading } = useQuery({
        retry: false,
        queryKey: ["check-user"],
        queryFn: async ({ signal }) => {
            const res = await fetch("https://notes-api.dicoding.dev/v1/users/me", {
                signal,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });
            if (!res.ok) {
                navigate("/login", { replace: true });
                throw new Error(res.statusText);
            }
            return res.json();
        },
    });

    if (isLoading) {
        return "";
    }

    return isSuccess ? <Outlet /> : false;
}
