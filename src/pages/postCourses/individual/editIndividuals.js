import React, {useState, useEffect} from 'react';
import { getAllTeachers, getIndividualsById, PatchIndividuals} from "./query";
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const EditIndividuals = () => {

    const history = useHistory();
    const {id} = useParams();


    const [groupsData, setGroupsData] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [defaultTeacher, setDefaultTeacher] = useState("");
    const [allTeachers, setAllTeachers] = useState([]);
    const [members, setMembers] = useState("");
    const [price, setPrice] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [durationByMonth, setDurationByMonth] = useState("");
    const [durationByDay, setDurationByDay] = useState("");
    const [durationByMonthByDay, setDurationByMonthByDay] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const getIndividualsEdit = async () => {
            const {data, error} = await getIndividualsById(id);
            if (data) {
                setGroupsData(data);
                setDefaultTeacher(data.teacherName)
                setMembers(data.members);
                setPrice(data.price);
                setTimeStart(data.start);
                setTimeEnd(data.end);
                setDurationByMonth(data.duration);
                setDurationByDay(data.days);
                setDurationByMonthByDay(data.in_month);
                setIsActive(data.active)
            }else if (error){
                toast.error("xatolik yuz berdi..!");
            }
        }
        getIndividualsEdit();
    },[])

    useEffect(() => {
        const fetchTeachers = async () => {
            const {data, error} = await getAllTeachers();
            if (data) {
                setAllTeachers(data);
            }else if (error){
                toast.error("O'qituvchilarni olib kelishda xatolik yuz berdi..!");
            }
        }
        fetchTeachers();
    },[])

    const handleKeyPress = (e) => {
        if (e.charCode === 32){
            e.preventDefault();
        }
    }

    const onSubmitIndividuals = async (e) => {
        e.preventDefault();

        const individualsData = {
            teacher_id: +selectedTeacher,
            members: +members,
            price: +price,
            start: timeStart,
            end: timeEnd,
            duration: +durationByMonth,
            days: durationByDay,
            in_month: +durationByMonthByDay,
            active: isActive
        }

        const {data, error} = await PatchIndividuals({individualsData, id});
        if (data) {
            toast.success("Indivual guruh qo'shildi..!");
            history.push('/card-individuals');
        }else if(error){
            toast.error("Xatolik yuz berdi..!");
        }
    }

    return (
        <div className="group">
            <h1 className="courses-title">Individual Guruhlar</h1>
            <div className="courses-wrapper">
                <form className="courses-wrapper_form" onSubmit={onSubmitIndividuals}>
                    <div className="input-group">
                        <label htmlFor="teachers">Kurs uchun ustozni tanlang</label>
                        <select name="teacher_id" id="teachers" required onChange={(e) => setSelectedTeacher(e.target.value)}>
                            {
                                defaultTeacher ?
                                    <option value={groupsData.teacher_id}>{defaultTeacher}</option>
                                    : <option value={"0"}>Ustoz tanlang</option>
                            }
                            {
                                setAllTeachers ? allTeachers.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.first_name + " " + item.last_name}</option>
                                    )
                                }) : ""
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="members">O'quvchilar soni</label>
                        <input type="number" name="members" id="members" placeholder="O'quvchilar soni"
                               value={members} onChange={(e) => setMembers(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="price">Kurs narxi</label>
                        <input type="number" name="price" id="price" placeholder="Kursing 1 oylik to'lo'v narxi"
                               value={price} required onChange={(e) => setPrice(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="start">Kurs boshlanish vaqti</label>
                        <input type="text" name="start" id="start" placeholder="Kurs boshlanish vaqti"
                               value={timeStart} onChange={(e) => setTimeStart(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="end">Kurs tugash vaqti</label>
                        <input type="text" name="end" id="end" placeholder="Kurs boshlanish vaqti"
                               value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="duration">Kurs necha oy davom etishi</label>
                        <input type="number" name="duration" id="duration" placeholder="Kurs necha oy davom etishi"
                               value={durationByMonth} required onChange={(e) => setDurationByMonth(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="days">Kurs kunlari</label>
                        <input type="text" name="days" id="days" placeholder="Kurs kunlari"
                               onKeyPress={(e) => handleKeyPress(e)}
                               value={durationByDay} onChange={(e) => setDurationByDay(e.target.value)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="in_month">1 oylik kurslar soni</label>
                        <input type="number" name="in_month" id="in_month" placeholder="1 oylik kurslar soni"
                               value={durationByMonthByDay} onChange={(e) => setDurationByMonthByDay(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="checkbox">Kurs faolmi ?</label>
                        <label className="switch" htmlFor="checkbox">
                            <input type="checkbox" id="checkbox" name="active" onClick={() => setIsActive(!isActive)}/>
                            <div className={`${isActive === true ? 'slider round active' : "slider round"}`}></div>
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

export default EditIndividuals;