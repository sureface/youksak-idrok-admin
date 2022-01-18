import React, {useState, useEffect} from 'react';
import "../category/category.scss"
import axios from "axios";
import {AiFillDelete} from "react-icons/ai"
import {BsPencilFill} from "react-icons/bs"

const Category = () => {

    const [name, setName] = useState("");
    const [data, setData] = useState([]);


    const fetchCategories = () => {
        axios.get(`${process.env.REACT_APP_API_PATH}/categories`)
            .then((res) => {
                let resData = res.data.categories
                setData(resData)
                console.log(res, 'categories come')
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchCategories();
    },[])


    const onSubmitHandler = (e) => {
        e.preventDefault();

        const data = {
            name: name
        }

        axios.post(`${process.env.REACT_APP_API_PATH}/categories?token=${localStorage.getItem('TOKEN-YUKSAK-IDROK')}`, data)
            .then((res) => {
                console.log(res, "categories")
                setName("");
            })
            .catch(err => console.log(err));

        fetchCategories();
    }



    const deleteCategories = (index) => {
        console.log(index, "**********")
        axios.delete(`${process.env.REACT_APP_API_PATH}/categories/${index}?token=${localStorage.getItem('TOKEN-YUKSAK-IDROK')}`)
            .then((res) => {
                console.log(res, 'categories deleted')
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
                            <button type="submit">Joylashtirish</button>
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
                                <BsPencilFill className="change"/>
                                <AiFillDelete className="delete" onClick={() => deleteCategories(item.id)}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Category;