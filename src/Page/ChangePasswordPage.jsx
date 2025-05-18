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

    const submitHandler = async (data) => {
        try {
            if (data.newPassword != data.renewPassword) {
                throw new Error("Mật khẩu mới chưa khớp với nhau!")
            }
            console.log({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                renew: data.renewPassword
            })

            const response = await fetch(serverURL + "/api/account/resetpassword", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    CurrentPassword: data.currentPassword,
                    NewPassword: data.newPassword
                })
            });

            if (!response.ok) {
                throw new Error("Đổi mật khẩu thất bại.");
            }

            dispatch(pushNotify({ title: "Đổi mật khẩu thành công!" }));
            navigate("/signin");

        } catch (error) {
            dispatch(pushNotify({
                title: "Cập nhật thất bại. Vui lòng thử lại!",
                state: "ERR"
            }));
        }
    }

    return (
        <div className="ChangePasswordPage">
            <PasswordForm onSubmit={submitHandler} />
        </div>
    );
};

export default ChangePasswordPage;
