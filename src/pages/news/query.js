import axios from "axios";
import { API_URL, getToken } from "../../utils/axios";


const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};


export const postNews = async (dataObj) => {
  let news, error;
  const token = getToken();
  try {
    const res = await axios.post(`${API_URL}/news?token=${token}`, dataObj, config);
    news = res;
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {news, error};
}

export const deleteNews = async (index) => {
  let data, error;
  const token = getToken();
  try {
    const res = await axios.delete(`${API_URL}/news/${index}?token=${token}`);
    data = res;
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {data, error};
}

export const patchNews = async (data, id) => {
  let dataobj, error;
  const token = getToken();
  try {
    const res = await axios.patch(`${API_URL}/news/${id}?token=${token}`, data, config);
    dataobj = res;
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {dataobj, error};
}


export const getNews = async () => {
  let news, error, count;
  try {
    const res = await axios.get(`${API_URL}/news?limit=9999`);
    news = res.data.news;
    count = res.data.count;
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {news, count, error};
}

export const getNewsById = async (id) => {
  let name, error;
  try {
    const res = await axios.get(`${API_URL}/news/${id}`);
    name = res.data.news;
  } catch (err) {
    error = error ? error.message : 'Oops something went wrong';
  }
  return {name, error};
}