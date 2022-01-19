import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import "../login/login.scss";
import axios from "axios";



const Login = () => {
    const history = useHistory();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const data = {
            username: login,
            password: password
        }
        axios.post(`${process.env.REACT_APP_API_PATH}/login`, data)
            .then((res) => {
                console.log(res, "token come")
                localStorage.setItem("TOKEN-YUKSAK-IDROK", res.data.token);
                history.push("/category");
                setLogin("");
                setPassword("");
            })
            .catch(err => console.log(err, "iam err"))

    }

    return (
        <div className="login-wrapper">
            <h1>Boshqaruv bo'limiga krish</h1>
            <form className="login-wrapper_form" onSubmit={onSubmitHandler}>
                <input type="text" name="username" id="username" placeholder="Login" required value={login} onChange={(e) => setLogin(e.target.value)}/>
                <input type="password" name="password" id="password" placeholder="Parol" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="btn">
                    <button type="submit">Kirish</button>
                </div>
            </form>
        </div>
    );
};

export default Login;