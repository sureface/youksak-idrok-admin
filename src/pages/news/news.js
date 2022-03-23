import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import "../../App.css";
import { deleteNews, getNews, postNews } from './query';
import {toast} from "react-toastify";

const News = () => {
    const [news, setNews] = useState([]);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [testImage, setTestImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const ref = useRef();

    const reset = () => {
        ref.current.value = "";
    };

    const handleImage = (event) => {
        setTestImage(true);
        if(event.target.files && event.target.files.length > 0) {
            setImage(event.target.files)
        }
    }

    const fetchNews = async () => {
        const {news, error} = await getNews()
        setNews(news)
    }

    useEffect( () => {
        fetchNews()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const data = new FormData();

        data.append('title', title);
        data.append('subtitle', name);
        if (testImage) {
            data.append('image', image[0]);
        }else{
            data.append('image', image);
        }


        if (data) {
            const {news, error} = await postNews(data);
            if(news) {
                toast.success("Yangilik Mofaqiyatli Qo'shildi..!", {icon: '🥳'})
            }else if(error){
                console.log(error);
                toast.error("😩 xatolik yuz berdi..");
            }
            setIsLoading(false);
        }

        setTitle("");
        setName("");

        reset();

        await fetchNews();
    }

    const deleteNew = async (id) => {
        const {data, error} = await deleteNews(id);
        if(data) {
            toast.success("Yangilik Mofaqiyatli O'chirildi..!", {icon: '🥳'})
        }else if(error){
            console.log(error);
            toast.error("😩 Xatolik Yuz Berdi..");
        }
        await fetchNews()
    }

    return (
        <div className="news">
            <h3 className='courses-title'>Yangiliklar</h3>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="title">Yangilik nomi</label>
                        <input type="text" name="title" id="title" placeholder="Yangilik nomi" required
                               value={title}  onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Yangilik haqida</label>
                        <textarea name="description" id="description" placeholder="Yangilik haqida malumot"
                                  value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="image">Yangilik uchun rasim</label>
                        <input className="image" type="file" name="image" id="image" placeholder="yangilik uchun rasim"
                               ref={ref}  onChange={(event) => handleImage(event)}/>
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

            <h1 className="courses-title">Qo'shilgan yangiliklar</h1>

            <div className="card-wrapper">
                {news.length ? (
                    news.map((item, index) => {
                        return (
                                <div key={index} className="card-wrapper_card">

                                    <div className="card-wrapper_card-image" style={{background: 'url(' + item.img + ') center / cover' }}> </div>

                                    <div className="card-wrapper_card-text">
                                        <div className="card-wrapper_card-text_title">
                                            {item.title}
                                        </div>
                                        <div className="card-wrapper_card-text_des">
                                            {item.subtitle.slice(0,150) + "...."}
                                        </div>
                                    </div>

                                    <div className="card-wrapper_card-btns">
                                        <NavLink className="NavLink" to={"/news-edit/" + item.id + "/" + item.title.replace(/\s+/g, '-')}>
                                            Tahrirlash
                                        </NavLink>
                                        <div onClick={() => deleteNew(item.id)}>
                                            O'chirish
                                        </div>
                                    </div>
                                </div>
                            )
                    })) : <p>Yangiliklar topilmadi.!</p>
                }
            </div>
        </div>
    );
};

export default News;