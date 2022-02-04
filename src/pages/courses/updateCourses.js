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
    const [selectedCategory, setSelectedCategory] = useState("");
    const [defCat, setDefCat] = useState("");
    const [name, setName] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [image, setImage] = useState(null);
    const [isChange, setIsChange] = useState(false);
    const [isChange1, setIsChange1] = useState(false);
    const [isChange2, setIsChange2] = useState(false);
    const [isChange3, setIsChange3] = useState(false);

    // categoriyani  selectni ichiga ob kelish
    const fetchCategoriesForCourses = async () => {
        const {categoriesForCourses, error} = await getCategoriesForCourses();
        if (categoriesForCourses){
            setCategory(categoriesForCourses)
        }else console.log(error)
    }

    // kurslani ob kelish
    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API_URL}/courses/${id}`)
            const re2 = await axios.get(`${API_URL}/categories/${res.data.course[0].category_id}`)
            console.log(re2, "cat by id")
            console.log(res, "*****************************")
            let defcategory = re2.data.name
            let title = res.data.course[0].title
            let des = res.data.course[0].description
            let img =  res.data.course[0].image
            setDefCat(defcategory)
            setName(title)
            setDescriptions(des)
            setImage(img)
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

    const onChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
        setIsChange(true);
    }
    const onChangeTitle = (e) => {
        setName(e.target.value);
        setIsChange1(true);
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

        if (isChange === true){
            data.append('category', selectedCategory);
        }
        if (isChange1 === true){
            data.append('title', name);
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

        await axios.patch(`${API_URL}/courses/${id}?token=${getToken()}`, data, config)
            .then((res) => {
                console.log(res, "post qo'yildi");
                setName("");
                setDescriptions("");
                setImage(null);
                setSelectedCategory("");
                history.push("/courses");
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
        <div className="courses">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="category">Kurs yo'nalishi</label>
                        {selectedCategory}
                        <select name="category" id="category" onChange={onChangeCategory}>
                            {category ?
                                <option value={defCat}>{defCat}</option>
                                :
                                <option value="1">kategoriya tanlang</option>
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
                               value={name} onChange={onChangeTitle}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Kurs haqida malumot</label>
                        <textarea name="description" id="description" placeholder="kurs haqida malumot"
                                  value={descriptions} onChange={onChangeDes}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Kurs chun rasim</label>
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

export default UpdateCourses;