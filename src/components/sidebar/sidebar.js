import React, {useState} from 'react';
import {FaThList, FaUserGraduate, FaUserAlt, FaBars} from "react-icons/fa"
import {RiStackFill} from "react-icons/ri";
import {HiUserGroup} from "react-icons/hi";
import { MdCategory, MdOutlineClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import "../sidebar/sidebar.scss";
import {NavLink, useHistory} from "react-router-dom";

const Sidebar = (props) => {

    const [isOpen, setIsOpen] = useState(true);

    props.func(isOpen);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    const toggleTrue = () => {
        setIsOpen(true);
    }

    let history = useHistory();

    const clearStorageAndBack = () => {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div>
            <div className='mobile_bar'>
                <FaBars onClick={toggleSidebar} />
                <MdOutlineClose onClick={toggleSidebar} className="close" />
            </div>
            <div className={isOpen ? "sidebar active" : "sidebar"}>
                <FaBars onClick={toggleSidebar} className='bars' />
                <div className="sidebar-heading" onClick={toggleSidebar}>
                    <div className="sidebar-heading_icon">
                        <AiFillSetting />
                    </div>

                    boshqaruv
                </div>
                <div className="sidebar-wrapper">
                    <div className="sidebar-menu">
                        <ul className="sidebar-list" onClick={toggleTrue}>
                            <li className="sidebar-list-item">
                                <NavLink exact={true} to="/category" className="sidebar-list-item_link">
                                    <MdCategory className="sidebar-list-item_icon" />
                                    <p className="sidebar-list-item_text"> Bo'limlar</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-list-item">
                                <NavLink to="/courses" className="sidebar-list-item_link">
                                    <FaThList className="sidebar-list-item_icon" />
                                    <p className="sidebar-list-item_text"> Kurslar</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-list-item">
                                <NavLink to="/news" className="sidebar-list-item_link">
                                    <RiStackFill className="sidebar-list-item_icon" />
                                    <p className="sidebar-list-item_text">Yangiliklar</p>
                                </NavLink>
                            </li>
                            <li className="sidebar-list-item">
                                <NavLink to="/teachers" className="sidebar-list-item_link">
                                    <FaUserGraduate className="sidebar-list-item_icon" />
                                    <p className="sidebar-list-item_text"> Ustozlar </p>
                                </NavLink>
                            </li>
                            <li className="sidebar-list-item">
                                <NavLink to="/card-group" className="sidebar-list-item_link">
                                    <HiUserGroup className="sidebar-list-item_icon" />
                                    <p className="sidebar-list-item_text"> Guruhlar </p>
                                </NavLink>
                            </li>
                            <li className="sidebar-list-item">
                                <NavLink to="/card-individuals" className="sidebar-list-item_link">
                                    <FaUserAlt className="sidebar-list-item_icon" />
                                    <p className="sidebar-list-item_text"> Individual </p>
                                </NavLink>
                            </li>
                            <li className="sidebar-list-item">
                                <div onClick={clearStorageAndBack} className="sidebar-list-item_link">
                                    <BiLogOut className="sidebar-list-item_icon" />
                                    <p className="sidebar-list-item_text"> Chqish </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;