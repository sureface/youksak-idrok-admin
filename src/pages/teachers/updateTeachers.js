import React, {useState, useEffect} from 'react';
import "../../App.scss";
import axios from "axios";
import {API_URL, getToken} from "../../utils/axios";
import {useHistory, useParams} from "react-router-dom";
import {fetchTeacher} from "./query";

const UpdateTeachers = () => {

    const history = useHistory();
    const {id} = useParams();


    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [image, setImage] = useState(null);
    const [isChange1, setIsChange1] = useState(false);
    const [isChange2, setIsChange2] = useState(false);
    const [isChange3, setIsChange3] = useState(false);
    const [isChange4, setIsChange4] = useState(false);


    // kurslani ob kelish
    const fetchTeachers = async () => {
        const {names, surNames, des, error} = await fetchTeacher(id);
        let uName = names
        setName(uName);
        setSurName(surNames);
        setDescriptions(des);
        if (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTeachers();
    }, [])

    const onChangeTitle = (e) => {
        setName(e.target.value);
        setIsChange1(true);
    }
    const onChangeSurTitle = (e) => {
        setSurName(e.target.value);
        setIsChange4(true);
    }
    const onChangeDes = (e) => {
        setDescriptions(e.target.value);
        setIsChange2(true);
    }
    const onChangeImg = (e) => {
        setImage(e.target.files);
        setIsChange3(true);
    }

    // kurs qoshish
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        if (isChange1 === true){
            data.append('first_name', name);
        }
        if (isChange4 === true){
            data.append('last_name', surName);
        }
        if (isChange2 === true){
            data.append('description', descriptions);
        }
        if (isChange3 === true){
            data.append('image', image[0]);
        }


        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        await axios.patch(`${API_URL}/teachers/${id}?token=${getToken()}`, data, config)
            .then((res) => {
                console.log(res, "ustozlar ozgardi !");
                setName("");
                setSurName("");
                setDescriptions("");
                setImage(null);

                history.push("/teachers");
            })
            .catch(err => {
                console.log(err.response.data.message, "my message +++")
                if (err.response.status === 401){
                    localStorage.clear();
                    history.push("/");
                }
            })
    }

    return (
        <div className="teachers">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="first_name">O'qituvchi nomi</label>
                        <input type="text" name="first_name" id="first_name" placeholder="o'qituvchi nomi" required value={name} onChange={onChangeTitle}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="familya">O'qituvchi familyasi</label>
                        <input type="text" name="last_name" id="familya" placeholder="Ustozning familyasi" value={surName} onChange={onChangeSurTitle}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">O'qituvchi haqida malumot</label>
                        <textarea name="description" id="description" placeholder="kurs haqida malumot"
                                  value={descriptions} onChange={onChangeDes}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">O'qituvchining  rasimi</label>
                        <input className="image" type="file" name="image" id="image" placeholder="kurs uchun rasim"
                               onChange={onChangeImg}/>
                    </div>
                    <div className="input-group">
                        <div className="btn">
                            <button style={{marginRight: 20 + 'px'}}>Orqaga qaytish</button>
                            <button type="submit">Joylashtirish</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default UpdateTeachers;