import { apiInstance } from "./instance";

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
    return localStorage.setItem("accessToken", accessToken);
}

function deleteAccessToken() {
    return localStorage.removeItem("accessToken");
}

async function login({ email, password, ...config }) {
    const checkInput = email && password;

    if (!checkInput) throw new Error("Must input all value!");

    const response = await apiInstance.post(
        `/login`,
        {
            email,
            password,
        },
        {
            ...config,
            headers: {
                ...config.headers,
                "Content-Type": "application/json",
            },
        },
    );

    return response.data;
}

async function register({ name, email, password, re_password, ...config }) {
    const checkInput = email && email && password && re_password;

    if (!checkInput) throw new Error("Must input all value!");
    if (password !== re_password) throw new Error("Password and confirm password not same!");

    const response = await apiInstance.post(
        `/register`,
        {
            name,
            email,
            password,
        },
        {
            ...config,
            headers: {
                ...config.headers,
                "Content-Type": "application/json",
            },
        },
    );

    return response.data;
}

async function getUserLogged({ ...config }) {
    const response = await apiInstance.get(`/users/me`, {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

export { getAccessToken, putAccessToken, deleteAccessToken, login, register, getUserLogged };
