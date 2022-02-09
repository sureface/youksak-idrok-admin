import axios from "axios";
import {API_URL} from "../../utils/axios";

export const getCategoriesForCourses = async () => {
    let categoriesForCourses, error, categoryName;
    try {
        const res = await axios.get(`${API_URL}/categories`);
        categoriesForCourses = res.data.categories
    } catch (err) {
        error = error ? error.message : 'Oops kategoriyalarni olib kelishda xatolik yuz berdi !';
    }
    return {categoriesForCourses, error}
}

export const getCourses = async () => {
    let fetchCourses, error;
    try {
        const res = await axios.get(`${API_URL}/courses`);
        fetchCourses = res.data.courses
    } catch (err) {
        error = error ? error.message : 'Oops kurslarni olib kelishda xatolik yuz berdi !';
    }
    return {fetchCourses, error}
}

export const fetchCourseById = async (id) => {
    let fetchCourses, error;
    try {
        const res = await axios.get(`${API_URL}/courses/${id}`);
        fetchCourses = res.data.course
    } catch (err) {
        error = error ? error.message : 'Oops kurslarni olib kelishda xatolik yuz berdi !';
    }
    return {fetchCourses, error}
}