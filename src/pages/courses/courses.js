import React from 'react';
import "../courses/courses.scss";

const Courses = () => {
    return (
        <div className="courses">
            <h1 className="courses-title">Kurslar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form">
                    <div className="input-group">
                        <label htmlFor="category">Kurs yonalishi</label>
                        <input type="text" name="category" id="category"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="title">kurs nomi</label>
                        <input type="text" name="title" id="title"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Kurs haqida malumot</label>
                        <textarea name="description" id="description" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Courses;