import { apiInstance } from "./instance";
import { getAccessToken } from "./auth";

async function addNote({ title, body, ...config }) {
    const checkInput = title && body;

    if (!checkInput) throw new Error("Must input title and body!");

    const response = await apiInstance.post(
        `/notes`,
        {
            title,
            body,
        },
        {
            ...config,
            headers: {
                ...config.headers,
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        },
    );

    return response.data;
}

async function getActiveNotes({ ...config }) {
    const response = await apiInstance.get(`/notes`, {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

async function getArchivedNotes({ ...config }) {
    const response = await apiInstance.get(`/notes/archived`, {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

async function getNote({ id, ...config }) {
    const checkInput = id;

    if (!checkInput) throw new Error("note id must be submitted!");

    const response = await apiInstance.get(`/notes/${id}`, {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

async function archiveNote({ id, ...config }) {
    const checkInput = id;

    if (!checkInput) throw new Error("note id must be submitted!");

    const response = await apiInstance.post(`/notes/${id}/archive`, {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

async function unarchiveNote({ id, ...config }) {
    const checkInput = id;

    if (!checkInput) throw new Error("note id must be submitted!");

    const response = await apiInstance.post(`/notes/${id}/unarchive`, {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

async function deleteNote({ id, ...config }) {
    const checkInput = id;

    if (!checkInput) throw new Error("note id must be submitted!");

    const response = await apiInstance.delete(`/notes/${id}`, {
        ...config,
        headers: {
            ...config.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

export { addNote, archiveNote, deleteNote, getActiveNotes, getArchivedNotes, getNote, unarchiveNote };
