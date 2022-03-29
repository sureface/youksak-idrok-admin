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
                console.log(res.data.course)
            })
            .catch(error => console.log(error))

    }, [props.courseId]);

    const delIndividuals = async (index) => {
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
        <div className={props.active ? "res-group active" : "res-group noActive"}>
            <div className="res-group_isActive">{props.active ? "Faol" : "Faol emas"}</div>
            <div className="res-group_name">{props.id} Guruh</div>
            <div className='res-group_text'><h3>O'qituvchi:</h3> {name} </div>
            <div className='res-group_text'><h3>Kurs nomi:</h3> {courseName} </div>
            <div className='res-group_text'>kurs {props.members} kishiga mojalangan</div>
            <div className='res-group_text'><h3>Kurs: </h3> <span>{props.days.substring(1, props.days.length - 1)}</span> kunlari bo'ladi</div>
            <div className='res-group_text'>Kurs har kuni soat {props.start} boshlanib soat {props.end} da tugaydi</div>
            <div className='res-group_text'><h3>Kurs: </h3> {props.duration} oy davom etadi</div>
            <div className='res-group_text'>1 oyda {props.in_month} dars boladi</div>
            <div className='res-group_text'><h3>Kurs narxi:</h3> {props.price} </div>

            <div className="btn">
                {delLoading ?
                    "O'chirilmoqda"
                    :  <button className="del" onClick={() => delIndividuals(props.id)}>O'chirish</button>
                }

                <NavLink to={`/individual-edit/` + props.id} className="change">Tahrirlash</NavLink>
            </div>
        </div>
    );
};

export default ResultIndividuals;