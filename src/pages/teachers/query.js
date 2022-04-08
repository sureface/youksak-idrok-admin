import axios from "axios";
import {API_URL} from "../../utils/axios";

export const getTeachers = async () => {
    let getTeach, error, count;
    try {
        const res = await axios.get(`${API_URL}/teachers`);
        getTeach = res.data.teachers;
        count = res.data.count;
    } catch (err) {
        error = error ? error.message : 'Oops kategoriyalarni olib kelishda xatolik yuz berdi !';
    }
    return {getTeach, error, count}
}

export const fetchTeacher = async (id) => {
    let names, surNames, des, error;

    try {
        const res = await axios.get(`${API_URL}/teachers/${id}`)
        names = res.data.teacher[0].first_name;
        surNames = res.data.teacher[0].last_name;
        des = res.data.teacher[0].description;
    } catch (err) {
        error = err ? err.message : 'Oops kategoriyalarni olib kelishda xatolik yuz berdi !';
    }
    return {names, surNames, des, error};
}