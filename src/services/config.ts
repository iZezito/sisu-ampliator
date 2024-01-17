import axios from "axios";

const config = {
    baseURL: "http://192.168.1.10:8080",
};

const instance = axios.create(config);

export default instance;