import axios from "axios";
import url from "../utils/url";

export function getCommunications () {
    return axios.get(`${url}/communications`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
