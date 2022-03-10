import React, {useState, useEffect} from 'react';
import {getIndividuals, getTeachersForIn, postIndividuals} from "./query";
import {useLocation, useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const Individuals = () => {

    const location = useLocation();
    const history = useHistory();
    const {courseId} = location.state

    const [getTeach, setGetTeach] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [members, setMembers] = useState(null);
    const [price, setPrice] = useState(null);
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [durationByMonth, setDurationByMonth] = useState(null);
    const [durationByDay, setDurationByDay] = useState("");
    const [durationByMonthByDay, setDurationByMonthByDay] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [getLoading, setGetLoading] = useState(false);

    const getTeachers = async () => {
        setGetLoading(true);
        const {data, error} = await getTeachersForIn()
        if (data) {
            setGetTeach(data);
            setGetLoading(false);
        } else {
            console.log(error);
            setGetLoading(false);
        }
    }

    useEffect(() => {
        getTeachers();
    },[])

    const handleKeyPress = (e) => {
        if (e.charCode === 32){
            e.preventDefault();
        }
    }

    const onSubmitIndividuals = async (e) => {
        e.preventDefault();

        const data = {
            teacher_id: selectedTeacher,
            members: members,
            price: price,
            start: timeStart,
            end: timeEnd,
            duration: durationByMonth,
            days: durationByDay,
            in_month: durationByMonthByDay,
            active: isActive
        }

        const {pIndividuals, error} = await postIndividuals({data, courseId});

        console.log(pIndividuals, "individuals....!")
        if (pIndividuals) {
            toast.success("Individual guruh mofaqiyatli qo'shildi..! 😊")
            history.push('/card-individuals');
        }else {
            toast.error("Individual kurslarni qo'shishda xatolik yuz berdi..! 😡");
            console.log(error);
        }
        await getIndividuals();
    }

    return (
        <div className="individual">
            <h1 className="courses-title">Individual Guruhlar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmitIndividuals}>
                    <div className="input-group">
                        <label htmlFor="teachers">Kurs uchun ustozni tanlang</label>
                        <select name="teacher_id" id="teachers" required
                                onChange={(e) => setSelectedTeacher(e.target.value)}>
                            <option value="0">Ustozni tanlang</option>
                            {getTeach ?
                                getTeach.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.first_name}</option>
                                    )
                                })
                                : ""
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="members">O'quvchilar soni</label>
                        <input type="number" name="members" id="members" placeholder="O'quvchilar soni"
                               onChange={(e) => setMembers(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="price">Kurs narxi</label>
                        <input type="number" name="price" id="price" placeholder="Kursing 1 oylik to'lo'v narxi"
                               required onChange={(e) => setPrice(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="start">Kurs boshlanish vaqti</label>
                        <input type="text" name="start" id="start" placeholder="Kurs boshlanish vaqti"
                               onChange={(e) => setTimeStart(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="end">Kurs tugash vaqti</label>
                        <input type="text" name="end" id="end" placeholder="Kurs boshlanish vaqti"
                               onChange={(e) => setTimeEnd(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="duration">Kurs necha oy davom etishi</label>
                        <input type="number" name="duration" id="duration" placeholder="Kurs necha oy davom etishi"
                               required onChange={(e) => setDurationByMonth(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="days">Kurs kunlari</label>
                        <input type="text" name="days" id="days" placeholder="Kurs kunlari"
                               onKeyPress={(e) => handleKeyPress(e)}    onChange={(e) => setDurationByDay(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="in_month">1 oylik kurslar soni</label>
                        <input type="number" name="in_month" id="in_month" placeholder="1 oylik kurslar soni"
                               onChange={(e) => setDurationByMonthByDay(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="checkbox">Kurs faolmi ?</label>
                        <label className="switch" htmlFor="checkbox">
                            <input type="checkbox" id="checkbox" name="active" onClick={() => setIsActive(!isActive)}/>
                            <div className="slider round"></div>
                        </label>
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

export default Individuals;