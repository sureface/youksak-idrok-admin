import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import "../category/category.scss"
import axios from "axios";
// import {AiFillDelete} from "react-icons/ai"
// import {BsPencilFill} from "react-icons/bs"

const UpdateCategories = (props) => {

    const [name, setName] = useState("");
    const [data, setData] = useState([]);

    const {id} = useParams();
    const history = useHistory();

    const fetchCategories = async () => {
        await axios.get(`${process.env.REACT_APP_API_PATH}/categories/${id}`)
            .then((res) => {
                let resData = res.data.name
                setName(resData)
                console.log(res, 'updatedById')
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchCategories();
    },[])


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const data = {
            name: name
        }

        await  axios.patch(`${process.env.REACT_APP_API_PATH}/categories/${id}?token=${localStorage.getItem('TOKEN-YUKSAK-IDROK')}`, data)
            .then((res) => {
                console.log(res, "addedById")
                setName("");
                history.push("/category");
            })
            .catch(err => console.log(err));
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