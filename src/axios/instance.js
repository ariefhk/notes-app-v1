import axios from "axios";

export const apiInstance = axios.create({
    baseURL: "https://notes-api.dicoding.dev/v1",
});
