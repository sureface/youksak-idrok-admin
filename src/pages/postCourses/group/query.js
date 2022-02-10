import axios from "axios";
import {API_URL, getToken} from "../../../utils/axios";


export const getTeachersForGr = async () => {
    let teachersForGr, error;
    try {
        const res = await axios.get(`${API_URL}/teachers`);
        teachersForGr = res.data.teachers
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {teachersForGr, error}
}

export const postGroup = async ({data, courseId}) => {
    let pGroup, error;
    const token = getToken()
    console.log(courseId, "in query");
    try {
        const res = await axios.post(`${API_URL}/courses/${courseId}/groups?token=${token}`, data);
        pGroup = res
        console.log(pGroup, " res group posted !")
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {pGroup, error}
}

export const getResGroups = async () => {
    let rGroup, error;
    try {
        const res = await axios.get(`${API_URL}/groups`);
        rGroup = res.data.groups
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {rGroup, error}
}