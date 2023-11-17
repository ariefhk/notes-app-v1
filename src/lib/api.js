import axios from "axios";
const BASE_URL = "https://notes-api.dicoding.dev/v1";

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
    return localStorage.setItem("accessToken", accessToken);
}

function deleteAccessToken() {
    return localStorage.removeItem("accessToken");
}

// async function fetchWithToken(url, options = {}) {
//     return fetch(url, {
//         ...options,
//         headers: {
//             ...options.headers,
//             Authorization: `Bearer ${getAccessToken()}`,
//         },
//     });
// }

async function login({ email, password, ...config }) {
    // const response = await fetch(`${BASE_URL}/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    // });

    const response = await axios.post(
        `${BASE_URL}/login`,
        {
            email,
            password,
        },
        {
            ...config,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        alert(responseJson.message);
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function register({ name, email, password, ...config }) {
    // const response = await fetch(`${BASE_URL}/register`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name, email, password }),
    // });

    // const responseJson = await response.json();

    const response = await axios.post(
        `${BASE_URL}/register`,
        {
            name,
            email,
            password,
        },
        {
            ...config,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        alert(responseJson.message);
        return { error: true };
    }

    return { error: false };
}

async function getUserLogged() {
    console.log(getAccessToken());
    const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const responseJson = await response.data;
    // return responseJson;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function addNote({ title, body, ...config }) {
    // const response = await fetchWithToken(`${BASE_URL}/notes`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ title, body }),
    // });

    // const responseJson = await response.json();

    const response = await axios.post(
        `${BASE_URL}/notes`,
        {
            title,
            body,
        },
        {
            ...config,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        },
    );

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function getActiveNotes(...config) {
    // const response = await fetchWithToken(`${BASE_URL}/notes`);
    // const responseJson = await response.json();

    const response = await axios.get(`${BASE_URL}/notes`, {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function getArchivedNotes(...config) {
    // const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
    // const responseJson = await response.json();

    const response = await axios.get(`${BASE_URL}/notes/archived`, {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function getNote({ id, ...config }) {
    // const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
    // const responseJson = await response.json();

    const response = await axios.get(`${BASE_URL}/notes/${id}`, {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function archiveNote({ id, ...config }) {
    // const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    //     method: "POST",
    // });

    // const responseJson = await response.json();

    const response = await axios.post(`${BASE_URL}/notes/${id}/archive`, {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function unarchiveNote({ id, ...config }) {
    // const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    //     method: "POST",
    // });

    // const responseJson = await response.json();

    const response = await axios.post(`${BASE_URL}/notes/${id}/unarchive`, {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function deleteNote({ id, ...config }) {
    // const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    //     method: "DELETE",
    // });

    // const responseJson = await response.json();

    const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const responseJson = await response.data;

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

export {
    getAccessToken,
    putAccessToken,
    login,
    register,
    getUserLogged,
    addNote,
    getActiveNotes,
    getArchivedNotes,
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
    deleteAccessToken,
};
