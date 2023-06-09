import axios from "axios";
import url from "./url";

const getCourses = async () => {
    let courses = [];
    const res = await axios.get(`${url}/courses/`);
    const {data} = res;
    for (let i = 0; i < data.length; i++) {
        courses.push(data[i]);
    }
    return data;
}

const courses = await getCourses();

export default courses;