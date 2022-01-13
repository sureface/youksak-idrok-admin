import React from 'react';
import {FaThList, FaUserGraduate} from "react-icons/fa"
import {RiStackFill} from "react-icons/ri";
import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {BsInfoCircle} from "react-icons/bs";
import "../sidebar/sidebar.scss";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-menu">
                    <h3 className="sidebar-title">Boshqaruv Bo'limi</h3>
                    <ul className="sidebar-list">
                        <li className="sidebar-list-item">
                            <Link to="/courses" className="sidebar-list-item_link">
                                <FaThList className="sidebar-list-item_icon" />
                                Kurslar
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <Link to="/news" className="sidebar-list-item_link">
                                <RiStackFill className="sidebar-list-item_icon" />
                                Yangiliklar
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <Link to="/teachers" className="sidebar-list-item_link">
                                <FaUserGraduate className="sidebar-list-item_icon" />
                                Ustozlar
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <Link to="/certifications" className="sidebar-list-item_link">
                                <AiOutlineSafetyCertificate className="sidebar-list-item_icon" />
                                Sertifikatlar
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <Link to="/about" className="sidebar-list-item_link">
                                <BsInfoCircle className="sidebar-list-item_icon" />
                                Biz Haqimizda
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;