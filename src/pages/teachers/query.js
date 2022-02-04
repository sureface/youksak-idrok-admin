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