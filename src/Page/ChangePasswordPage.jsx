// src/pages/ChangePasswordPage.jsx
import { useDispatch } from "react-redux";

import PasswordForm from "../Component/AuthForm/PasswordForm";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../libs/http";
import { pushNotify } from "../redux/notifySlice";


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
            dispatch(pushNotify({title: "Đổi mật khẩu thành công!",}))
            navigate("/signin");
        }).catch(err => {
            dispatch(pushNotify({title: "Cập nhật thất bại!", state: "ERR"}))
            console.log(err);
            navigate("/");
        })
    }

    return (
        <div className="ChangePasswordPage">
            <PasswordForm onSubmit={submitHandler} />
        </div>
    );
};

export default ChangePasswordPage;
