import axios from "axios";
import {API_URL} from "../../utils/axios";

export const getTeachers = async () => {
    let getTeach, error;
    try {
        const res = await axios.get(`${API_URL}/teachers`);
        getTeach = res.data.teachers
    } catch (err) {
        error = error ? error.message : 'Oops kategoriyalarni olib kelishda xatolik yuz berdi !';
    }
    return {getTeach, error}
}

export const fetchTeacher = async (id) => {
    let names, surNames, des, error
    try {
        const res = await axios.get(`${API_URL}/teachers/${id}`)
        console.log(res, "*****************************")
        names = res.data.teacher[0].first_name
        surNames = res.data.teacher[0].last_name
        des = res.data.teacher[0].description
    } catch (error) {
        error = error ? error.message : 'Oops kategoriyalarni olib kelishda xatolik yuz berdi !';
    }
    return {names, surNames, des, error}
}