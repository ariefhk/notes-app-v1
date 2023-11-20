// third party
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import axios, { AxiosError } from "axios";

// lib
import { getAccessToken } from "../lib/api";

export default function RequiredAuthProvider() {
    const navigate = useNavigate();
    const { isSuccess, isLoading } = useQuery({
        retry: false,
        queryKey: ["check-user"],
        queryFn: async ({ signal }) => {
            try {
                const responseAxios = await axios.get("https://notes-api.dicoding.dev/v1/users/me", {
                    signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                return responseAxios.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error?.response?.status === 401) {
                        navigate("/login", { replace: true });
                        console.log(error?.response?.data);
                        throw new Error("Access denied!");
                    }
                }
            }
        },
    });

    if (isLoading) {
        return false;
    }

    return isSuccess ? <Outlet /> : false;
}
