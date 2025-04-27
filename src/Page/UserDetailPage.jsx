// src/pages/UserDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { serverURL } from '../libs/http';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDetail from '../Component/UI/UserDetail';

const UserDetailPage = () => {
    
    const userID = useParams().id;
    console.log(userID);
    

    return <div className="UserDetailPage">
        <UserDetail userID={userID}></UserDetail>
    </div>;
};

export default UserDetailPage;
