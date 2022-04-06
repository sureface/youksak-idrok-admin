import React, {useEffect, useState} from 'react';
import {fetchCourseById} from "./query";
import {NavLink, useParams} from "react-router-dom";
import {HiPlusSm} from "react-icons/hi"
import {BiLogOut} from "react-icons/bi"

const More = () => {

    const {id} = useParams();

    const [moreCourses, setMoreCourses] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(false);

    // kurslani ob kelish
    const fetchCourse = async () => {
        setFetchLoading(true);
        const {fetchCourses, error} = await fetchCourseById(id);
        if (fetchCourses){
            setMoreCourses(fetchCourses);
            setFetchLoading(false);
        }else console.log(error);
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    return (
        <div className="courses">
            {
                fetchLoading ?
                    <div className="btn">
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    :
                    <div className="res">
                        {
                            moreCourses ?
                                moreCourses.map((item, index) => {
                                    return (
                                        <div key={index} className="res-more">
                                            <h1 className="courses-title">{item.title}</h1>
                                            <div className="res-more_body">

                                                <div className="res-more_body-image" style={{background: 'url(' + item.img + ') center / cover' }}> </div>

                                                <div className="res-more_body-item">
                                                    <div className="res-more_body-item_des">
                                                        {item.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : ""
                        }

                        <div className="res-btns">
                            <NavLink className="res-btns_gr" to={{pathname: '/add-to-group', state: {courseId: id}}}>
                                Guruh
                                <HiPlusSm  className="icon"/>
                            </NavLink>
                            <NavLink className="res-btns_in" to={{pathname: '/individual', state: {courseId: id}}}>
                                Individual
                                <HiPlusSm  className="icon"/>
                            </NavLink>
                            <NavLink className="res-btns_back" to="/courses">
                                Orqaga qaytish
                                <BiLogOut className="icon"/>
                            </NavLink>
                        </div>

                    </div>
            }
        </div>
    );
};

export default More;