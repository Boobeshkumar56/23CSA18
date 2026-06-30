const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const api = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service/"
})
const token = process.env.access_token
api.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`
    return config
})
const Log = async (stack, level, package, message) => {
    try {
        const response = await api.post(
            "logs", {
            "stack": stack,
            "level": level,
            "package": package,
            "message": message

        }
        )
        console.log(response.data);
    } catch (error) {
        console.log("Error:", error.response ? error.response.data : error.message)

    }



}
Log("backend", "info", "handler", "test log");