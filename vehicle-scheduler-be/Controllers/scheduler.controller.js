// const { api } = require("../index")
const axios = require("axios")
const { Log } = require("../logging-middleware/logger.js");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const api = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service/"
})
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJib29iZXNoa3VtYXI2MTA5QGdtYWlsLmNvbSIsImV4cCI6MTc4MjgwNDI1NCwiaWF0IjoxNzgyODAzMzU0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjZiZjRhOTItZjkyYi00NGUzLWE1YTAtYzg5YjM1NzIyYTNlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYm9vYmVzaGt1bWFyIHMiLCJzdWIiOiJhN2I0ZjBmYy02NjQzLTQwMzAtYmQ1NS1hNWViNGNkYzExMDAifSwiZW1haWwiOiJib29iZXNoa3VtYXI2MTA5QGdtYWlsLmNvbSIsIm5hbWUiOiJib29iZXNoa3VtYXIgcyIsInJvbGxObyI6IjIzY3NhMTgiLCJhY2Nlc3NDb2RlIjoiV2pOeUNUIiwiY2xpZW50SUQiOiJhN2I0ZjBmYy02NjQzLTQwMzAtYmQ1NS1hNWViNGNkYzExMDAiLCJjbGllbnRTZWNyZXQiOiJOYUJNS3ZKeVh6c3FGeFRYIn0.4s00zMRZz4gPRxLIyEniJOGvbGSNOAOhkXM_bJKRKB8"
api.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`
    return config
})
const getMechanics = async () => {
    const mechanics = await api.get("depots")
    return mechanics.data.depots;
}
const getVehicles = async () => {
    const vehicles = await api.get("vehicles")
    return vehicles.data.vehicles;
}

const schedule = async () => {
    try {

        const mechanics = await getMechanics();
        const vehicles = await getVehicles();
        let output = []
        vehicles.sort((a, b) => b.Impact - a.Impact)
        mechanics.sort((a, b) => b.capacity - a.capacity)
        mechanics.forEach(m => {
            while (m.capacity > 0 && vehicles.length > 0) {
                m.capacity -= vehicles[0].Impact;
                output.push({ mechanic: m.ID, vehicle: vehicles[0].TaskID })
                vehicles.shift()
            }
        })
        return output

    } catch (error) {
        Log("backend", "error", "controller", error.message)

    }
}

