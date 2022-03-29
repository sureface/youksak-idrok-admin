import React, {useState} from 'react';
import {FaThList, FaUserGraduate, FaUserAlt} from "react-icons/fa"
import {RiStackFill} from "react-icons/ri";
import {HiUserGroup} from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import "../sidebar/sidebar.scss";
import {NavLink} from "react-router-dom";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    const toggleTrue = () => {
        setIsOpen(true);
    }
    return (
        <div className={isOpen ? "sidebar active" : "sidebar"}>
            <div className="bars">
            <FaBars onClick={toggleSidebar} className='bars-icon' />
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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;