import axios from "axios";
import { API_URL, getToken } from "../../utils/axios";

export const postCategory = async (name) => {
  let data, error;
  const token = getToken()
  try {
    const res = await axios.post(`${API_URL}/categories?token=${token}`, {
      name: name
    });
    data = res
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {data, error}
}

export const deleteCategory = async (index) => {
  let data, error;
  const token = getToken()
  try {
    const res = await axios.delete(`${API_URL}/categories/${index}?token=${token}`);
    data = res
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {data, error}
}
export const patchCategory = async (name, index) => {
  let data, error;
  const token = getToken()
  try {
    const res = await axios.patch(`${API_URL}/categories/${index}?token=${token}`, {
      name: name
    });
    data = res
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {data, error}
}


export const getCategories = async () => {
  let categories, error;
  try {
    const res = await axios.get(`${API_URL}/categories`);
    categories = res.data.categories
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {categories, error}
}

export const getCategoriesById = async (id) => {
  let name, error;
  try {
    const res = await axios.get(`${API_URL}/categories/${id}`);
    name = res.data.name
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {name, error}
}