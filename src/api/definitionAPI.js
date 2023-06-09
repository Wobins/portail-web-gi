import axios from "axios";
import url from "../utils/url";


export function getDefinitions () {
    return axios.get(`${url}/definitions/`, {
        headers: {
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': 'http://localhost:3000/'
        }
    });
}

export function getDefinition (id) {
    return axios.get(`${url}/definitions/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function addDefinition (definition) {
    return axios.post(`${url}/definitions/`, definition, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function deleteDefinition (id) {
    return axios.delete(`${url}/definitions/${id}/`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}