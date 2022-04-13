import React, {useEffect, useState} from 'react';
import ResultIndividuals from "./resultIndividuals";
import {getIndividuals} from "./query";
import {toast} from "react-toastify";

const CardIndividuals = () => {

    const [individuals, setIndividuals] = useState([]);
    const [isReFetch, setReFetch] = useState(false);

    const getResIndividuals = React.useCallback(async () => {
        const {data, error} = await getIndividuals();

        if (data) setIndividuals(data);
        if (error) toast.error("xatolik  yuz berdi..!");

    }, []);

    const refetch = React.useCallback(() => {
        setReFetch((prev) => !prev);
    }, []);

    useEffect(() => {
        getResIndividuals();
    }, [individuals, isReFetch]);

    return (
        <div className="group">
            <h1 className="courses-title">Qo'shilgan Guruhlar</h1>

            <div className="card-wrapper">
                {
                    individuals.length ?
                        individuals.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ResultIndividuals
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
                        }): <p>Individual guruh topilmadi..!</p>
                }
            </div>
        </div>
    );
};

export default CardIndividuals;