import React from 'react';
import {BiMessageDetail} from "react-icons/bi";
import {useHistory} from "react-router-dom";
import "../topbar/topbar.scss";


const Topbar = () => {
    let history = useHistory();

    const clearStorageAndBack = () => {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="topbar">
            <div className="topbar_wrapper">
                <div className="topbar_wrapper-top_left">
                    <span className="logo">Boshqaruv bo'limi</span>
                </div>
                <div className="topbar_wrapper-top_right">
                    <div className="topbar_wrapper-top_right_container">
                        <BiMessageDetail  className="icon"/>
                        <span className="top-icon-badge">2</span>
                    </div>
                    <button className="logOut" onClick={clearStorageAndBack}>chiqish</button>
                </div>
            </div>
        </div>
    );
};

export default Topbar;