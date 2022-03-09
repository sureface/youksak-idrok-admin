import React, {useEffect, useState} from 'react';
import ResultIndividuals from "./resultIndividuals";
import {getIndividuals} from "./query";
import {toast} from "react-toastify";

const CardIndividuals = () => {

    const [resGroup, setResGroup] = useState([]);

    const getResIndividuals = async () => {

        const {data, error} = await getIndividuals();
        if (data){
            setResGroup(data);
        }else if (error){
            toast.error("xatolik  yuz berdi..!")
        }

    }

    useEffect(() => {
        getResIndividuals();
    }, [])

    return (
        <div className="group">
            <h1 className="courses-title">Qo'shilgan Guruhlar</h1>

            <div className="card-wrapper">
                {
                    resGroup.length ?
                        resGroup.map((item, index) => {
                            return(
                                <div key={index}>
                                    <ResultIndividuals active={item.active} price={item.price} start={item.start} end={item.end} members={item.members} in_month={item.in_month} days={item.days} duration={item.duration} id={item.id} teacher_id={item.teacher_id} courseId={item.course_id}/>
                                </div>
                            )
                        }): <p>Guruh topilmadi  iltimos Guruh qo'shing..!</p>
                }
            </div>
        </div>
    );
};

export default CardIndividuals;