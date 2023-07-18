import axios from "axios";
import url from "../utils/url";


export function getCourses () {
    return axios.get(`${url}/courses`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function addCourse (course) {
    return axios.post(`${url}/courses/`, course, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function getCourse (id) {
    return axios.get(`${url}/courses/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function deleteCourse (id) {
    return axios.delete(`${url}/courses/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}