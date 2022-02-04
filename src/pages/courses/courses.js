import React, {useState, useEffect} from 'react';
import "../../App.scss";
import axios from "axios";
import {API_URL, getToken} from "../../utils/axios";
import {NavLink, useHistory} from "react-router-dom";
import {getCategoriesForCourses, getCourses} from "./query";

const Courses = () => {
    const history = useHistory();
    const [category, setCategory] = useState("");
    const [courses, setCourses] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [image, setImage] = useState(null);

    // categoriyani  selectni ichiga ob kelish
    const fetchCategoriesForCourses = async () => {
        const {categoriesForCourses, error} = await getCategoriesForCourses();
        console.log(categoriesForCourses, " ****  category come ****")
        if (categoriesForCourses){
            setCategory(categoriesForCourses)
        }else console.log(error)
    }

    // kurslani ob kelish
    const fetchCourses = async () => {
        const {fetchCourses, error} = await getCourses();
        if (fetchCourses){
            setCourses(fetchCourses)
        }else console.log(error)
    }

    useEffect(() => {
        fetchCategoriesForCourses();
        fetchCourses();
    }, [])


    // kurs qoshish
    const onSubmit = async (e) => {
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

        await axios.post(`${API_URL}/courses?token=${getToken()}`, data, config)
            .then((res) => {
                console.log(res, "++++++++++++++");
            })
            .catch(err => {
                if (err.response.status === 401){
                    localStorage.clear();
                    history.push("/");
                }
            })

        setCourses("");
        setName("");
        setDescriptions("");
        setImage(null);
        setSelectedCategory("");


        await fetchCourses();
    }

    // delete courses
    const deleteCourses = async (index) => {
        console.log(index, "index here")
        await axios.delete(`${API_URL}/courses/${index}?token=${getToken()}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                if (err.response.status === 401){
                    localStorage.clear();
                    history.push("/");
                }
            })

        await fetchCourses();
    }

    return (
        <div className="courses">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="category">Kurs yo'nalishi</label>
                        <select name="category" id="category" onChange={(e) => setSelectedCategory(e.target.value)}>
                            {category.length > 0  ?
                                <option disabled value={selectedCategory}>kategoriya tanlang</option>
                                :
                                <option disabled value="0">yangi kategoriya qoshing !</option>
                            }
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
                        <input type="text" name="title" id="title" placeholder="kurs nomi" required
                             value={name}  onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Kurs haqida malumot</label>
                        <textarea name="description" id="description" placeholder="kurs haqida malumot"
                             value={descriptions}     onChange={(e) => setDescriptions(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Kurs chun rasim</label>
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
            <div className="card-wrapper">
                {
                    courses ?
                        courses.map((item, index) => {
                            return (
                                <div key={index} className="card-wrapper_card">

                                    <div className="card-wrapper_card-image" style={{background: 'url(' + item.img + ') center / cover' }}> </div>

                                    <div className="card-wrapper_card-text">
                                        <div className="card-wrapper_card-text_title">
                                            {item.title}
                                        </div>
                                        <div className="card-wrapper_card-text_des">
                                            {item.description.slice(0,150) + "...."}
                                        </div>
                                    </div>

                                    <div className="card-wrapper_card-btns">
                                        <NavLink className="NavLink" to={"/courses-edit/" + item.id + "/" + item.title.replace(/\s+/g, '-')}>
                                            Tahrirlash
                                        </NavLink>

                                        <div onClick={() => deleteCourses(item.id)}>
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

export default Courses;