import React, {useState, useEffect} from 'react';
import "../../App.scss";
import axios from "axios";
import {API_URL, getToken} from "../../utils/axios";
import {NavLink} from "react-router-dom";
import {BsPencilFill} from "react-icons/bs";
import DeleteButton from "../category/deleteButton";

const Courses = () => {
    const [category, setCategory] = useState("");
    const [courses, setCourses] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [image, setImage] = useState(null);


    const getCategories = async () => {
        await axios.get(`${API_URL}/categories`)
            .then((res) => {
                console.log(res, "i am categories")
                let data = res.data.categories
                setCategory(data)
            })
            .catch(err => console.log(err))
    }
    const getCourses = async () => {
        await axios.get(`${API_URL}/courses`)
            .then((res) => {
                console.log(res, "iam courses")
                let data = res.data.courses
                setCourses(data)
            })
            .catch(err => console.log(err))
    }
    console.log(courses, "++++++ courses ++++++++++")

    useEffect(() => {
        getCategories();
        getCourses();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('category', selectedCategory);
        data.append('title', name);
        data.append('description', descriptions);
        data.append('image', image[0]);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(`${API_URL}/courses?token=${getToken()}`, data, config)
            .then((res) => {
                console.log(res, "++++++++++++++");
            })
            .catch(error => console.log(error.message));
    }

    return (
        <div className="courses">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="category">Kurs yo'nalishi</label>
                        {selectedCategory}
                        <select name="category" id="category" onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="category">kategoriya tanlang</option>
                            {category ?
                                category.map((item, index) => {
                                    return (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    )
                                })
                                : ""
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="title">Kurs nomi</label>
                        {name}
                        <input type="text" name="title" id="title" placeholder="kurs nomi" required
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Kurs haqida malumot</label>
                        {descriptions}
                        <textarea name="description" id="description" placeholder="kurs haqida malumot"
                                  onChange={(e) => setDescriptions(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Kurs chun rasim</label>
                        {console.log(image)}
                        <input className="image" type="file" name="image" id="image" placeholder="kurs uchun rasim"
                                onChange={(e) => setImage(e.target.files)}/>
                    </div>
                    <div className="input-group">
                        <div className="btn">
                            <button type="submit">Joylashtirish</button>
                        </div>
                    </div>
                </form>
            </div>
            <h1 className="courses-title">Qo'shilgan Kurslar</h1>
            {
                courses ?
                courses.map((item, index) => {
                    return (
                        <div key={index} className="category-result">
                            <div className="category-result_title">
                                {index - -1 + ' ' + item.title}
                            </div>
                            <div className="category-result_btn">
                                <NavLink to={"/nmadur"}>
                                    <BsPencilFill className="change"/>
                                </NavLink>
                                <DeleteButton />
                            </div>
                        </div>
                    )
                })
                    : ""
            }
        </div>
    );
};

export default Courses;