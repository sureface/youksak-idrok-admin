import axios from "axios";
import {API_URL, getToken} from "../../../utils/axios";
import {toast} from "react-toastify";


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

export const getAllTeachers = async () => {
    let data, error;
    try {
        const res = await axios.get(`${API_URL}/teachers`);
        data = res.data.teachers
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
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

export const PatchGroup = async ({GroupsData, id}) => {
    let data;
    const token = getToken()
    try {
        const res = await axios.patch(`${API_URL}/groups/${id}?token=${token}`, GroupsData);
        data = res
        if (res.status === 200){
            toast.success("Guruh mofaqiyatli O'zgartirildi..!")
        }
    } catch (err) {
        toast.error("xatolik yuz berdi..!")
        console.log(err)
    }
    return {data};
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

        const getTeach = await axios.get(`${API_URL}/teachers/${data.teacher_id}`);
        data.teacherName = getTeach.data.teacher[0].first_name + " " + getTeach.data.teacher[0].last_name

    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
}