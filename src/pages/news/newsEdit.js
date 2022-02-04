import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById, patchNews } from './query';

const NewsEdit = () => {

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


        console.log(event.target.files[0]);

        const url = URL.createObjectURL(event.target.files[0])

        setImage(url)
        console.log(image);
    }


    useEffect( () => {
        fetchNews()
    }, [])


    const onSubmit = async (evt) => {
        evt.preventDefault();
        const date = new FormData();

        date.append('title', title);
        date.append('subtitle', name);
        date.append('image', image);

            if (date) {
                const {data, error} = await patchNews(date, id)
                console.log(data);
            }


        setTitle("")
        setName("")
        setImage(null)
    }













  return (
        <div>
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
                  {image && <img src={image}  alt=""/>}

              </div>
              <div className="input-group">
                  <div className="btn">
                      <button type="submit">Joylashtirish</button>
                  </div>
              </div>
          </form>
        </div>
  )
};

export default NewsEdit;
