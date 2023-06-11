import axios from "axios";
import url from "../utils/url";

export default function createSubscription (email) {
    return axios.post(`${url}/subscriptions/`, email, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}