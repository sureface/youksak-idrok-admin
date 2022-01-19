import React, {useState, useEffect} from 'react';
import "../category/category.scss"
import axios from "axios";
import {AiFillDelete} from "react-icons/ai"
import {BsPencilFill} from "react-icons/bs"
import {NavLink} from "react-router-dom";

const Category = () => {
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);


    const fetchCategories = () => {
        axios.get(`${process.env.REACT_APP_API_PATH}/categories`)
            .then((res) => {
                let resData = res.data.categories
                setData(resData)
                console.log(res, 'updated')
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchCategories();
    },[])


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            name: name
        }

        await  axios.post(`${process.env.REACT_APP_API_PATH}/categories?token=${localStorage.getItem('TOKEN-YUKSAK-IDROK')}`, data)
            .then((res) => {
                console.log(res, "added")
                setName("");
                setIsLoading(false);
            })
            .catch(err => console.log(err));

        fetchCategories();
    }



    const deleteCategories = async (index) => {
        setDelLoading(true);
        await axios.delete(`${process.env.REACT_APP_API_PATH}/categories/${index}?token=${localStorage.getItem('TOKEN-YUKSAK-IDROK')}`)
            .then((res) => {
                console.log(res, 'categories deleted')
                setDelLoading(false);
            })
            .catch(err => console.log(err));
        fetchCategories();
    }

    return (
        <div className="category">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmitHandler}>
                    <div className="input-group">
                        <label htmlFor="category">Kurs yo'nalishi</label>
                        <input type="text" name="name" id="category" placeholder="Kusr yo'nalishi" value={name} required onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <div className="btn">
                            {
                                isLoading ?
                                    <div className="lds-spinner">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    :
                                    <button type="submit">Joylashtirish</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
            <h1 className="courses-title">Qo'shilgan Yo'nalishlar</h1>
            {
                data.map((item, index) => {
                    return (
                        <div key={index} className="category-result">
                            <div className="category-result_title">
                                {index - -1 + ' ' + item.name}
                            </div>
                            <div className="category-result_btn">
                                <NavLink to={"/category-edit/" + item.id + "/" + item.name.replace(/\s+/g, '-')}>
                                    <BsPencilFill className="change"/>
                                </NavLink>
                                {
                                    delLoading ?
                                        <div className="lds-spinner">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        :
                                        <AiFillDelete className="delete" onClick={() => deleteCategories(item.id)}/>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Category;