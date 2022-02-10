import React, {useEffect, useState} from 'react';
import {getResGroups} from "../query";

const Group = () => {


    const [resGroup, setResGroup] = useState(null);
    const {isLoading, setIsLoading} = useState(false);

    const fetchResGroup = async () => {
        const {rGroup} = await getResGroups();
        setResGroup(rGroup);
    }

    useEffect(() => {
        fetchResGroup();
    },[])


    return (
        <div className="group">
            <h1 className="courses-title">Qo'shilgan yangiliklar</h1>

            <div className="card-wrapper">
                {   resGroup ?
                    resGroup.length ? (
                    resGroup.map((item, index) => {
                        return (
                            <div key={index} className="res-group">
                                <div className="name">{} Guruhi</div>
                            </div>
                        )
                    })) : <p>Not found</p>
                    :"iltimos kuting"
                }
            </div>
        </div>
    );
};

export default Group;