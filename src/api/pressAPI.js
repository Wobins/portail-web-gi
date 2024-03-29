import axios from "axios";
import url from "../utils/url";

export function getCommunications () {
    return axios.get(`${url}/communications`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export function deleteCommunication (id) {
    return axios.delete(`${url}/communications/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function addCommunication (com) {
    return axios.post(`${url}/communications/`, com, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}
