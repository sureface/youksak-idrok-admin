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

export const postGroup = async ({data, id}) => {
    let pGroup, error;
    const token = getToken()
    try {
        const res = await axios.post(`${API_URL}/courses/${id}/groups?token=${token}`, data);
        pGroup = res
        console.log(pGroup, " res group posted !")
    } catch (err) {
        error = error ? error.message : 'Oops something went wrong';
    }
    return {pGroup, error}
}