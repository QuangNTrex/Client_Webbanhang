// src/pages/ChangePasswordPage.jsx
import { useDispatch } from "react-redux";

import PasswordForm from "../Component/AuthForm/PasswordForm";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../libs/http";


const ChangePasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const submitHandler = (data) => {
        fetch(serverURL + "/api/account/resetpassword", {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
            },
            body: JSON.stringify({CurrentPassword: data.CurrentPassword, NewPassword: data.newPassword})
        }).then(res => res.json()).then(data => {
            navigate("/signin");
        }).catch(err => console.log(err))
    }
    

    return (
        <div className="ChangePasswordPage">
            <PasswordForm onSubmit={submitHandler}/>
        </div>
    );
};

export default ChangePasswordPage;
