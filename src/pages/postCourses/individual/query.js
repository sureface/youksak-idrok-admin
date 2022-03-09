import axios from "axios";
import {API_URL, getToken} from "../../../utils/axios";
import {toast} from "react-toastify";


export const getTeachersForIn = async () => {
    let data, error;
    try {
        const res = await axios.get(`${API_URL}/teachers`);
        data = res.data.teachers
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
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

export const postIndividuals = async ({data, courseId}) => {
    let pIndividuals, error;
    const token = getToken()
    try {
        const res = await axios.post(`${API_URL}/courses/${courseId}/individuals?token=${token}`, data);
        pIndividuals = res
        console.log(res, "posted..!")
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {pIndividuals, error}
}

export const PatchIndividuals = async ({individualsData, id}) => {
    let data;
    const token = getToken()
    try {
        const res = await axios.patch(`${API_URL}/individuals/${id}?token=${token}`, individualsData);
        data = res
        if (res.status === 200){
            toast.success("Guruh mofaqiyatli O'zgartirildi..!")
        }
    } catch (err) {
        toast.error("xatolik yuz berdi..!")
        console.log(err)
    }
    return {data}
}

export const deleteIndividuals = async (index) => {
    let data, error;
    const token = getToken()
    try {
        const res = await axios.delete(`${API_URL}/individuals/${index}?token=${token}`);
        data = res
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
}

export const getIndividuals = async () => {
    let data, error;
    try {
        const res = await axios.get(`${API_URL}/individuals`);
        data = res.data.individuals
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
}

export const getIndividualsById = async (id) => {
    let data, error;
    try {
        const res = await axios.get(`${API_URL}/individuals/${id}`);
        data = res.data.group[0]

        const getTeach = await axios.get(`${API_URL}/teachers/${data.teacher_id}`);
        data.teacherName = getTeach.data.teacher[0].first_name + " " + getTeach.data.teacher[0].last_name

    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {data, error}
}