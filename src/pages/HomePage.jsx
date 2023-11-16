import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../lib/api";
// import { useNavigate } from "react-router-dom";

export default function HomePage() {
    // const navigate = useNavigate();
    const {
        data: todos,
        isError,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["getTodos"],
        queryFn: async ({ signal }) => {
            const response = await fetch(`https://notes-api.dicoding.dev/v1/notes`, {
                signal,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            if (!response.ok) {
                // navigate("/login", { replace: true });
                throw new Error(response.statusText);
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>Sorry you have error</h1>;
    }

    if (isSuccess) {
        console.log(todos.data);
        return todos?.data.map((todo) => {
            return <h1 key={todo.id}>{todo.body}</h1>;
        });
    }

    console.log("render page");
    return (
        <div className='h-screen w-screen bg-red-600'>
            <h1>test homepage</h1>
        </div>
    );
}
