import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../../App.css";
import { deleteNews, getNews, postNews } from './query';

const News = () => {
    const [news, setNews] = useState([])
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)

    const handleImage = (event) => {
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

    const onSubmit = async (evt) => {
        evt.preventDefault();
        const data = new FormData();

        data.append('title', title);
        data.append('subtitle', name);
        data.append('image', image[0]);

            if (data) {
                const {news, error} = await postNews(data)
            }

        setTitle("")
        setName("")
        setImage(null)

        await fetchNews()

    }

    const deleteNew = async (id) => {
        const {data, error} = await deleteNews(id)
        await fetchNews()
    }

    return (
        <div className="news">
            <h3 className='news__title'>Yangiliklar</h3>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Kurs nomi</label>
                    <input type="text" name="title" id="title" placeholder="Kurs nomi" required
                            value={title}  onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label htmlFor="description">Kurs haqida malumot</label>

                    <textarea name="description" id="description" placeholder="kurs haqida malumot"
                            value={name}     onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label htmlFor="image">Kurs chun rasim</label>
                    <input className="image" type="file" name="image" id="image" placeholder="kurs uchun rasim"
                            onChange={(event) => handleImage(event)}/>
                    {image && (<img src={URL.createObjectURL(image[0])} alt='' width={300}/> )}

                </div>
                <div className="input-group">
                    <div className="btn">
                        <button onClick={onSubmit} type="submit">Joylashtirish</button>
                    </div>
                </div>
            </form>
            <div>
                {news.length ? (
                    news.map((item, index) => {
                        return (
                            <div style={{backgroundColor: "#ccc"}} key={item.id}>
                                <h4>{item.title}</h4>
                                <p>{item.subtitle}</p>
                                {item.img && <img src={item.img} alt="News"/>}
                                <div>
                                    <button onClick={() => deleteNew(item.id)}>delete</button>
                                    <Link to={`/news-edit/${item.id}`}>edit</Link>
                                </div>
                            </div>
                        )
                    })) : <p>Not found</p>
                }
            </div>
        </div>
    );
};

export default News;