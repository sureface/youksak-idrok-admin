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
    try {
        const res = await axios.post(`${API_URL}/courses/${courseId}/groups?token=${token}`, data);
        pGroup = res
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {pGroup, error}
}

export const deleteGroups = async (index) => {
    let data, error;
    const token = getToken()
    try {
        const res = await axios.delete(`${API_URL}/groups/${index}?token=${token}`);
        data = res
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
}

export const getGroups = async () => {
    let data, error;
    try {
        const res = await axios.get(`${API_URL}/groups`);
        data = res.data.groups
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
}

export const getGroupsById = async (id) => {
    let data, error;
    try {
        const res = await axios.get(`${API_URL}/groups/${id}`);
        data = res.data.group[0]
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
}