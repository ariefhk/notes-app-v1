// third party
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import { AxiosError } from "axios";

// lib
import { getUserLogged } from "../axios/auth";

export default function RequiredAuthProvider() {
    const navigate = useNavigate();
    const { isSuccess, isLoading } = useQuery({
        retry: false,
        queryKey: ["check-user"],
        queryFn: async ({ signal }) => {
            try {
                const response = await getUserLogged({ signal });

                return response;
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
