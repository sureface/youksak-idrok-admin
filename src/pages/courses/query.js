import axios from "axios";
import {API_URL} from "../../utils/axios";

export const getCategoriesForCourses = async () => {
    let categoriesForCourses, error;
    try {
        const res = await axios.get(`${API_URL}/categories`);
        categoriesForCourses = res.data.categories;
    } catch (err) {
        error = error ? error.message : 'Oops kategoriyalarni olib kelishda xatolik yuz berdi !';
    }
    return {categoriesForCourses, error}
}

export const getCourses = async () => {
    let fetchCourses, error, count;
    try {
        const res = await axios.get(`${API_URL}/courses?limit=9999`);
        fetchCourses = res.data.courses;
        count = res.data.count;
    } catch (err) {
        error = error ? error.message : 'Oops kurslarni olib kelishda xatolik yuz berdi !';
    }
    return {fetchCourses, error, count};
}

export const fetchCourseById = async (id) => {
    let fetchCourses, error;
    try {
        const res = await axios.get(`${API_URL}/courses/${id}`);
        fetchCourses = res.data.course;
    } catch (err) {
        error = error ? error.message : 'Oops kurslarni olib kelishda xatolik yuz berdi !';
    }
    return {fetchCourses, error};
}