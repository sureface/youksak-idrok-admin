import React, {useState, useEffect} from 'react';
import "../../App.scss";
import axios from "axios";
import {API_URL, getToken} from "../../utils/axios";
import {NavLink, useHistory, useParams} from "react-router-dom";
import {getCategoriesForCourses} from "./query";

const UpdateCourses = () => {
    const history = useHistory();
    const {id} = useParams();
    const [category, setCategory] = useState("");
    const [courses, setCourses] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [image, setImage] = useState(null);

    // categoriyani  selectni ichiga ob kelish
    const fetchCategoriesForCourses = async () => {
        const {categoriesForCourses, error} = await getCategoriesForCourses();
        if (categoriesForCourses){
            setCategory(categoriesForCourses)
        }else console.log(error)
    }

    console.log(category,"////")
    // kurslani ob kelish
    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API_URL}/courses/${id}`)
            console.log(res, "*****************************")
            let cat = res.data.course[0].category_id
            let title = res.data.course[0].title
            let des = res.data.course[0].description
            setSelectedCategory(cat)
            setName(title)
            setDescriptions(des)
        } catch (e) {
            if (e.response.status === 401){
                localStorage.clear();
                history.push("/");
            }else console.log(e)
        }
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
                setCourses("");
                setName("");
                setDescriptions("");
                setImage(null);
                setSelectedCategory("");
            })
            .catch(err => {
                if (err.response.status === 401){
                    localStorage.clear();
                    history.push("/");
                }
            })

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
                            <option value={category[0].id}>{category[0].name}</option>
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
        </div>
    );
};

export default UpdateCourses;