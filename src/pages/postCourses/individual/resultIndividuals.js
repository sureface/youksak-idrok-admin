import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_URL} from "../../../utils/axios";
import { deleteIndividuals, getIndividuals} from "./query";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

const ResultIndividuals = (props) => {

    const [name, setName] = useState("")
    const [courseName, setCourseName] = useState("");
    const [delLoading, setDelLoading] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/teachers/${props.teacher_id}`)
            .then(res => {
                const FName = res.data.teacher[0].first_name
                const LName = res.data.teacher[0].last_name
                const finalName = FName + " " + LName
                setName(finalName);
            })
            .catch(error => console.log(error))

    }, [props.teacher_id])

    useEffect(() => {
        axios.get(`${API_URL}/courses/${props.courseId}`)
            .then(res => {
                const course_name = res.data.course[0].title
                setCourseName(course_name)
            })
            .catch(error => console.log(error))

    }, [props.courseId])


    const delGroup = async (index) => {
        setDelLoading(true);
        const {data, error} = await deleteIndividuals(index)
        if (data) {
            toast.success("Guruh mofaqiyatli o'chirildi..!")
        }else if (error){
          toast.error("kusr o'chirishda xatolik yuz berdi..!")
        } else{
            toast.warning("oops, tehik xatolik yuz berdi..")
        }
        await getIndividuals();
        setDelLoading(false)
    }

    return (
        <div className="res-group">
            <div className="res-group_name">{props.id} Guruh</div>
            <div>O'qituvchi: {name} </div>
            <div>Kurs nomi: {courseName} </div>
            <div>kurs {props.members} kishiga mojalangan</div>
            <div>Kurs: <span>{props.days.substring(1, props.days.length - 1)}</span> kinlari bo'ladi</div>
            <div>kurs kar kuni soat {props.start} boshlanib soat {props.end} da tugaydi</div>
            <div>Kurs: {props.duration} oy davom etadi</div>
            <div>1 oyda {props.in_month} dars boladi</div>
            <div>kurs narxi: {props.price} </div>

            <div className="btn">
                {delLoading ?
                    "O'chirilmoqda"
                    :  <button className="del" onClick={() => delGroup(props.id)}>O'chirish</button>
                }

                <NavLink to={`/individual-edit/` + props.id} className="change">Tahrirlash</NavLink>
            </div>
        </div>
    );
};

export default ResultIndividuals;