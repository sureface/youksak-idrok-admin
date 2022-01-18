import React from 'react';
import {FaThList, FaUserGraduate} from "react-icons/fa"
import {RiStackFill} from "react-icons/ri";
import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {BsInfoCircle} from "react-icons/bs";
import {MdCategory} from "react-icons/md";
import "../sidebar/sidebar.scss";
import {Link, NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-menu">
                    <ul className="sidebar-list">
                        <li className="sidebar-list-item">
                            <NavLink exact={true} to="/category" className="sidebar-list-item_link">
                                <MdCategory className="sidebar-list-item_icon" />
                                Bo'limlar
                            </NavLink>
                        </li>
                        <li className="sidebar-list-item">
                            <NavLink to="/courses" className="sidebar-list-item_link">
                                <FaThList className="sidebar-list-item_icon" />
                                Kurslar
                            </NavLink>
                        </li>
                        <li className="sidebar-list-item">
                            <NavLink to="/news" className="sidebar-list-item_link">
                                <RiStackFill className="sidebar-list-item_icon" />
                                Yangiliklar
                            </NavLink>
                        </li>
                        <li className="sidebar-list-item">
                            <NavLink to="/teachers" className="sidebar-list-item_link">
                                <FaUserGraduate className="sidebar-list-item_icon" />
                                Ustozlar
                            </NavLink>
                        </li>
                        <li className="sidebar-list-item">
                            <NavLink to="/certifications" className="sidebar-list-item_link">
                                <AiOutlineSafetyCertificate className="sidebar-list-item_icon" />
                                Sertifikatlar
                            </NavLink>
                        </li>
                        <li className="sidebar-list-item">
                            <NavLink to="/about" className="sidebar-list-item_link">
                                <BsInfoCircle className="sidebar-list-item_icon" />
                                Biz Haqimizda
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;