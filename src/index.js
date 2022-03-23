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
        }else if(error.response.status === 422){
            toast.warning("O'qituvchini Tugatilmagan Darslari bor")
        }
        return error;
    }
);

ReactDOM.render(<App/>, document.getElementById('root'));