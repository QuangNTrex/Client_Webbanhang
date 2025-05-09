// src/pages/UserInfoPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./UserInfoPage.css"
import { useEffect, useRef, useState } from "react";
import { serverURL } from "../libs/http";
import ProductList from "../Component/UI/ProductList";
import { pushNotify } from "../redux/notifySlice";

const UserInfoPage = () => {
    const localUser = useSelector(state => state.user);
    const userID = localUser.userID;
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([{ price: 1000, title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06" }]);

    const isSaler = Number(user.role) === 3;
    const token = localStorage.getItem("token");

    const usernameRef = useRef();
    const gmailRef = useRef();
    const nameRef = useRef();
    const genderRef = useRef();
    const birthOfDateRef = useRef();
    const phoneNumberRef = useRef();
    const addressRef = useRef();
    const avatarUrlRef = useRef();
    const roleRef = useRef();

    const navigation = useNavigate();
    const dispatch = useDispatch()

    const updateHandler = (product) => {
        navigation("/product/update", { state: product });
    }

    useEffect(() => {
        fetch(serverURL + "/api/account?id=" + userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }).then(res => res.json()).then(data => {
            setUser(data);
        }).catch(err => {
            setUser(localUser);
        })

        fetch(serverURL + "/api/product?user_id=" + userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }).then(res => res.json()).then(data => {
            setProducts(data.data);
        }).catch(err => console.log(err))
    }, [userID]);

    //const datee = new Date(user.birthOfDate).toISOString().split('T')[0]
    console.log(user.birthOfDate, "datee");

    const deleteAccountHandler = () => {
        fetch(serverURL + "/api/admin/account/delete/" + userID, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
            },
        }).then(res => res.json()).then(data => {
            navigation("/");
        }).catch(err => {

        })
    }
    const updateAccountHandler = () => {
        const data = {
            Username: usernameRef.current.value,
            Email: gmailRef.current.value,
            Name: nameRef.current.value,
            Gender: genderRef.current.value ? true : false,
            BirthOfDate: birthOfDateRef.current.value,
            PhoneNumber: phoneNumberRef.current.value,
            Address: addressRef.current.value,
            AvatarUrl: avatarUrlRef.current.value,
        }
        fetch(serverURL + "/api/account/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                dispatch(pushNotify({title: "Cập nhật thành công!"}))
                dispatch(setUser(data));
                navigation("/");
            }).catch(err => {
                dispatch(pushNotify({title: "Cập nhật thất bại!", state: "ERR"}))
                console.log("error", err)
            })
    }

    return <div className="UserInfoPage">
        <div className="wrap-top wrap-top--">
            <div className="wrap-top-left">
                <div className="wrap-avatar">
                    <img src={user.avatarUrl} alt="" className="avatar" />
                </div>
                <div className="wrap-info">
                    <p className="name">{user.name}</p>
                </div>
            </div>
            <div className="wrap-top-right">
                <div className="wrap-top-right-left">
                    <p>Tên</p>
                    <p>Tên đăng nhập</p>
                    <p>Email</p>
                    <p>Giới tính</p>
                    <p>Ngày sinh</p>
                    <p>Địa chỉ</p>
                    <p>Số điện thoại</p>
                    <p>Avatar</p>
                </div>
                <div className="wrap-top-right-right">
                    <input type="text" className="name" ref={nameRef} defaultValue={user.name} />
                    <input type="text" className="username" ref={usernameRef} defaultValue={user.username} />
                    <input type="text" className="email" ref={gmailRef} defaultValue={user.email} />
                    <div>
                        <label htmlFor="">Nam</label>
                        <input type="radio" name="gender" className="gender" ref={genderRef} value={true} checked={user.gender} />
                        <label htmlFor="">Nữ</label>
                        <input type="radio" name="gender" className="gender" value={false} checked={!user.gender} />
                    </div>

                    <input type="date" className="birthOfDate" defaultValue={new Date(user.birthOfDate || Date.now()).toISOString().split('T')[0]} ref={birthOfDateRef} />
                    <input type="text" className="" ref={addressRef} defaultValue={user.address} />
                    <input type="text" className="" ref={phoneNumberRef} defaultValue={user.phoneNumber} />
                    <input type="text" className="" ref={avatarUrlRef} defaultValue={user.avatarUrl} />
                </div>
            </div>
        </div>
        <div className="wrap-bottom">
            <div className="wrap-btn">
                <button className="btn btn-update" onClick={updateAccountHandler}>Cập nhật</button>
                {isSaler && <button className="btn btn-update" onClick={() => { navigation("/product/add") }}>Thêm Sản Phẩm</button>}
                <button className="btn btn-update" onClick={() => { navigation("/user/repassword") }}>Đổi mật khẩu</button>
            </div>
        </div>
        {isSaler && <div className="wrap--" style={{ marginTop: "4rem" }} >
            <h3 className="title">Sản phẩm của bạn</h3>
            <div className="wrap-product">
                <ProductList clickHandler={updateHandler} products={products} />
            </div>
        </div>}
    </div>
};

export default UserInfoPage;
