import React from 'react';
import {BiMessageDetail} from "react-icons/bi"
import "../topbar/topbar.scss";

const Topbar = () => {
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
                </div>
            </div>
        </div>
    );
};

export default Topbar;