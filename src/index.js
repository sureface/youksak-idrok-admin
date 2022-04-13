import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import axios from "axios";
import {toast} from "react-toastify";


axios.interceptors.response.use(
    (res) => {
        return res;
    }, error => {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.pathname = "/login";
        } else if (error.response.status === 422) {
            toast.warning("O'qituvchini Tugatilmagan Darslari bor");
        } else if (error.response.status === 415) {
            toast.warning("Rasim yoki video formati to'gri kelmadi. \n rasim uchun (png, jpg, jpeg, gif) video uchun (mp4, mov, wmv, avi)");
        } else if (error.response.status === 500) {
            toast.warning("Serverda xatolik yuz berdi, qaytadan urunib ko'ring yoki programist bilan boglaning +998950071430");
        } else if (error.response.status === 400) {
            toast.warning("Nmanidur  xato bajardingiz, qayta urunib koring");
        }
        return error;
    }
);

ReactDOM.render(<App/>, document.getElementById('root'));