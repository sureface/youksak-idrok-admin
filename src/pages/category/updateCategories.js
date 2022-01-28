import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import "../../App.scss"
import { getCategoriesById, patchCategory } from './query';

const UpdateCategories = (props) => {

    const [name, setName] = useState("");

    const {id} = useParams();
    const history = useHistory();

    const fetchCategories = async () => {
        const {name, error} = await getCategoriesById(id);
        if(name) {
            setName(name)
        }
    }

    useEffect(() => {
        fetchCategories();
    },[])


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const {data, error} = await patchCategory(name, id)
        setName("");
        history.push("/category");
    }



    return (
        <div className="category">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmitHandler}>
                    <div className="input-group">
                        <label htmlFor="category">Kurs yo'nalishi</label>
                        <input type="text" name="name" id="category" placeholder="Yangi kusr yo'nalishi" value={name} required onChange={(e) => setName(e.target.value)}/>
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

export default UpdateCategories;