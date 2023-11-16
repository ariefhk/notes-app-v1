// third party
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// lib
import { getAccessToken } from "../lib/api";

export default function RequiredAuthProvider({ children }) {
    const navigate = useNavigate();
    const { isError } = useQuery({
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

    return !isError ?? children;
}

RequiredAuthProvider.propTypes = {
    children: PropTypes.node,
};
