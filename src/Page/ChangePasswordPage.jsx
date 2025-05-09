// src/pages/ChangePasswordPage.jsx
import { useDispatch } from "react-redux";

import PasswordForm from "../Component/AuthForm/PasswordForm";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../libs/http";


const ChangePasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const submitHandler = (data) => {
        console.log({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        })
        fetch(serverURL + "/api/account/resetpassword", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                CurrentPassword: data.currentPassword,
                NewPassword: data.newPassword
            })
        }).then(data => {
            navigate("/signin");
        }).catch(err => console.log(err))
    }


    return (
        <div className="ChangePasswordPage">
            <PasswordForm onSubmit={submitHandler} />
        </div>
    );
};

export default ChangePasswordPage;
