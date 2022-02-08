import React, {useState, useEffect} from 'react';
import "../../App.scss"
import {NavLink} from "react-router-dom";
import { getCategories, postCategory } from './query';
import DeleteButton from './deleteButton';


const Category = () => {
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);



    const fetchCategories = async () => {
        setFetchLoading(true)
        const {categories, error} = await getCategories();
        if(categories) {
            setData(categories)
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const {data, err} = await postCategory(name);
        await fetchCategories()
        setIsLoading(false)
        setName("")
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
                                    <div className="lds-ellipsis">
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
                fetchLoading ?
                    <div className="btn">
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    :
                    <div className="card-wrapper">
                        {
                            data ?
                                data.map((item, index) => {
                                    return (
                                        <div key={index} className="card-wrapper_card">
                                            <div className="card-wrapper_card-text">
                                                <div className="card-wrapper_card-text_title">
                                                    {item.name}
                                                </div>
                                            </div>

                                            <div className="card-wrapper_card-btns">
                                                <NavLink className="NavLink" to={"/category-edit/" + item.id + "/" + item.name.replace(/\s+/g, '-')}>
                                                    Tahrirlash
                                                </NavLink>

                                                <div>
                                                    <DeleteButton fetchCategories={fetchCategories} id={item.id} />
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                                : ""
                        }
                    </div>
            }
        </div>
    );
};

export default Category;