import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getNewsById, patchNews } from './query';

const NewsEdit = () => {

    const history = useHistory();

    const [news, setNews] = useState(null)
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const {id} = useParams()

    const fetchNews = async () => {
        const {name, error} = await getNewsById(id)
        setNews(name[0])
        if(name) {
            setTitle(name[0].title)
            setName(name[0].subtitle)
            setImage(name[0].img)
        }
    }



    const handleImage = (event) => {
        const url = event.target.files;

        setImage(url)
    }


    useEffect( () => {
        fetchNews()
    }, [])


    const onSubmit = async (evt) => {
        evt.preventDefault();

        const date = new FormData();

        date.append('title', title);
        date.append('subtitle', name);
        date.append('image', image[0]);

        if (date) {
            const {data, error} = await patchNews(date, id);
            history.push('/news');
        }


        setTitle("")
        setName("")
    }

  return (
    <div className="news">
      <h3 className='courses-title'>Yangiliklar</h3>
        <div className="courses-wrapper">
            <form className="courses-wrapper_form" onSubmit={onSubmit}>
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
                    {/*{image && <img src={image}  alt=""/>}*/}

                </div>
                <div className="input-group">
                    <div className="btn">
                        <button type="submit">Joylashtirish</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
  )
};

export default NewsEdit;
