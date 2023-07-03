import axios from "axios";
import url from "../utils/url";

export function getCompanies () {
    return axios.get(`${url}/companies`);
}

export function getCompany (id) {
    return axios.get(`${url}/companies/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function addCompany (company) {
    return axios.post(`${url}/companies/`, company, {
        headers: {
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': '*'
        }
    });
}

export function deleteCompany (id) {
    return axios.delete(`${url}/companies/${id}`);
}
