import axios from "axios";

const api = axios.create({
    baseURL: "https://vehiclerental-api.onrender.com"
});

export default api;