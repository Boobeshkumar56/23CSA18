const express = require("express")
const app = express();
const { Log } = require("../logging-middleware/logger.js");
const axios = require("axios")
const scheduler = require("./Routes/scheduler.routes.js")
const api = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service/"
})
const token = process.env.access_token
api.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`
    return config
})
app.use(express.json());
app.use("/schedule", scheduler)



app.listen(3000, () => {
    console.log("app running in port 3000");
})
module.exports = api;