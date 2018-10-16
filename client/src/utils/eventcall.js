import axios from "axios";

const eventcall = async () => {
    try {
        const response = await axios.get("/api/jayhawk")
        const events = await response.data
        return await events
    } catch (err) {
        throw new Error(err)
    }
}

console.log("eventcall: ", eventcall)

export default { eventcall }
