import axios from "axios";
import url from "../utils/url";


export function getTeachers () {
    return axios.get(`${url}/teachers`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function getTeacher (id) {
    return axios.get(`${url}/teachers/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function addTeacher (teacher) {
    return axios.post(`${url}/teachers`, teacher, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export function deleteTeacher (id) {
    return axios.delete(`${url}/teachers/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}