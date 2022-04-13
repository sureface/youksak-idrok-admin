import React, {useEffect, useState} from 'react';
import ResultGroup from "./resultGroup";
import {getGroups} from "./query";
import {toast} from "react-toastify";

const CardGroup = () => {

    const [resGroup, setResGroup] = useState([]);
    const [isReFetch, setReFetch] = useState(false);

    const getResGroups = React.useCallback(async () => {
        const {data, error} = await getGroups();

        if (data) setResGroup(data);
        if (error) toast.error("xatolik  yuz berdi..!");

    }, []);

    const refetch = React.useCallback(() => {
        setReFetch((prev) => !prev);
    }, []);

    useEffect(() => {
        getResGroups();
    }, [getResGroups, isReFetch]);

    return (
        <div className="group">
            <h1 className="courses-title">Qo'shilgan Guruhlar</h1>

            <div className="card-wrapper">
                {
                    resGroup.length ?
                        resGroup.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ResultGroup
                                        refetch={refetch}
                                        active={item.active}
                                        price={item.price}
                                        start={item.start}
                                        end={item.end}
                                        members={item.members}
                                        in_month={item.in_month}
                                        days={item.days}
                                        duration={item.duration}
                                        id={item.id}
                                        teacher_id={item.teacher_id}
                                        courseId={item.course_id}
                                    />
                                </div>
                            );
                        }): <p>Guruh topilmadi..!</p>
                }
            </div>
        </div>
    );
};

export default CardGroup;