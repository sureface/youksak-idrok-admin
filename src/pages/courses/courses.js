import React, {useState} from 'react';
import "../courses/courses.scss";
import axios from "axios";

const Courses = () => {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [image, setImage] = useState("");


    const handleImage = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            setImage(event.target.files)
        }
    }

    console.log(image);


    const onSubmit = (e) => {
        e.preventDefault();


        const data = {
            category: category,
            title: name,
            description: descriptions,
        }
        //?token=${localStorage.getItem("TOKEN-YUKSAK-IDROK")}
        axios.post(`${process.env.REACT_APP_API_PATH}/courses?token=${localStorage.getItem("TOKEN-YUKSAK-IDROK")}`, data)
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="courses">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="category">Kurs yo'nalishi</label>
                        <input type="text" name="category" id="category" placeholder="Kusr yo'nalishi" required
                               onChange={(e) => setCategory(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="title">Kurs nomi</label>
                        <input type="text" name="title" id="title" placeholder="kurs nomi" required
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Kurs haqida malumot</label>
                        <textarea name="description" id="description" placeholder="kurs haqida malumot" required
                                  onChange={(event) => handleImage(event)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Kurs chun rasim</label>
                        <input accept="image/*" className="image" type="file" name="image" id="image" placeholder="kurs uchun rasim"
                               required onChange={(e) => setImage(e.target.files)}/>
                        {image && (<img src={URL.createObjectURL(image[0])} alt='' width={300}/> )}
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

export default Courses;