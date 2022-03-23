import React, {useEffect, useState, useRef} from 'react';
import "../../App.scss";
import {getTeachers} from "./query";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {API_URL, getToken} from "../../utils/axios";
import {toast} from "react-toastify";

const Teachers = () => {

    const ref = useRef();

    const reset = () => {
        ref.current.value = "";
    };

    const [teachers, setTeachers] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [image, setImage] = useState(null);

    // qoshilgan teacherslani obkelish
    const fetchTeachers = async () => {
        const {getTeach, error} = await getTeachers();
        if (getTeach){
            setTeachers(getTeach)
        }else console.log(error)
    }

    useEffect(() => {
        fetchTeachers();
    }, [])


    const onSubmitTeacher = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('first_name', name);
        data.append('last_name', surName);
        data.append('description', descriptions);
        data.append('image', image);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        await axios.post(`${API_URL}/teachers?token=${getToken()}`, data, config)
            .then((res) => {
                if(res) {
                    toast.success("😌 O'qituvchi Mofaqiyatli Qo'shildi..!")
                }
            })
            .catch(err => {
                console.log(err)
                toast.error("😩 xatolik yuz berdi..");
            })
        setName("");
        setSurName("");
        setDescriptions("");

        reset();

        await fetchTeachers();
    }

    // delete teachers
    const deleteTeachers = async (index) => {
        await axios.delete(`${API_URL}/teachers/${index}?token=${getToken()}`)
            .then(res => {
                if(res) {
                    toast.success("😌 bo'lim mofaqiyatli o'chirildi..!")
                }
            })
            .catch(err => {
                console.log(err)
                toast.error("😩 xatolik yuz berdi..");
            })

        await fetchTeachers();
    }

    return (
        <div className="teachers">
            <h1 className="courses-title">Ustozlar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmitTeacher}>
                    <div className="input-group">
                        <label htmlFor="name">Isim</label>
                        <input type="text" name="first_name" id="name" placeholder="Ustozning isimi.." required value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="familya">Familyasi</label>
                        <input type="text" name="last_name" id="familya" placeholder="Ustozning familyasi.." value={surName} onChange={(e) => setSurName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Ustoz haqida malumot</label>
                        <textarea name="description" id="description" placeholder="Ustoz haqida malumot" value={descriptions} onChange={(e) => setDescriptions(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Kurs uchun rasim</label>
                        <input className="image" type="file" name="image" id="image" placeholder="kurs uchun rasim"  ref={ref} onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className="input-group">
                        <div className="btn">
                            <button type="submit">Joylashtirish</button>
                        </div>
                    </div>
                </form>
            </div>

            <h1 className="courses-title">Qo'shilgan Ustozlar</h1>
            <div className="card-wrapper">
                {
                    teachers ?
                        teachers.map((item, index) => {
                            return (
                                <div key={index} className="card-wrapper_card">

                                    <div className="card-wrapper_card-image" style={{background: 'url(' + item.img + ') center / cover' }}> </div>

                                    <div className="card-wrapper_card-text">
                                        <div className="card-wrapper_card-text_title">
                                            {item.first_name + " " + item.last_name}
                                        </div>
                                        <div className="card-wrapper_card-text_des">
                                            {item.description.slice(0,150) + "...."}
                                        </div>
                                    </div>

                                    <div className="card-wrapper_card-btns">
                                        <NavLink className="NavLink" to={"/teachers-edit/" + item.id + "/" + item.first_name + "-" + item.last_name.replace(/\s+/g, '-')}>
                                            Tahrirlash
                                        </NavLink>

                                        <div onClick={() => deleteTeachers(item.id)}>
                                            O'chirish
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : ""
                }
            </div>

        </div>
    );
};

export default Teachers;