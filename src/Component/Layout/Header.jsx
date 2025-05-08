// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';
import { serverURL } from '../../libs/http';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { avatarUrl, username, email, role } = useSelector(state => state.user);
    const isSaler = (role === 3);
    const isLogin = !!username;
    const [showMenuPerson, setShowMenuPerson] = useState(false);
    const [keyword, setKeyword] = useState("");

    const logoutHandler = () => {
        dispatch(clearUser());
        localStorage.removeItem("token")
        navigator("/signin");
        return;

        fetch(serverURL + "/api/account/logout", {
            method: "POST",
        })
            .then(res => {
                if (res.ok) {
                    dispatch(clearUser());
                    navigator("/signin");
                }
            })
            .catch(err => console.log(err))
    }
    const registerSalerHandler = () => {
        const token = localStorage.getItem("token")
        fetch(serverURL + "/api/account/registerseller", {
            method: "POST",
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                dispatch(clearUser());
                navigator("/signin");
            }
        }).catch(err => console.log(err))
    }

    return (
        <header className="header">
            <h1 onClick={() => { navigator("/") }}><i class="bi bi-backpack2-fill"></i></h1>
            {/* avatar */}
            <div className="wrap-center">
                <input onKeyDown={(e) => {
                    if (e.key === "Enter" && keyword.trim()) {
                        navigator(`/search?q=${encodeURIComponent(keyword)}`);
                        setKeyword("");
                    }
                }} onChange={(e) => setKeyword(e.target.value)} value={keyword} type="text" className="input-find" placeholder='Tìm sản phẩm tại đây' />
            </div>

            <div className="wrap-right">
                <div className="wrap-avatar" onClick={() => setShowMenuPerson(true)}>
                    {avatarUrl ? <img className="avatar" src={avatarUrl} /> : <i className="bi bi-person-bounding-box icon"></i>}
                </div>
                <div className="wrap-cart" onClick={() => navigator('/cart')}>
                    <i class="bi bi-cart4 icon-mini"></i>
                </div>
            </div>
            {/* menu */}
            {showMenuPerson && <div className="menuPerson" onClick={() => { setShowMenuPerson(false) }}>
                <div className="wrap-menu">
                    <div className="wrap-top">
                        {avatarUrl ? <img className="avatar" src={avatarUrl} /> : <i className="bi bi-person-bounding-box avatar-icon"></i>}
                        <div className="wrap-email">
                            <h5 className="email">{email}</h5>
                        </div>
                        <div className="state">
                            {isSaler ? <p>Bạn đang là người bán</p> : <p>Bạn chưa có vai trò người bán</p>}
                        </div>
                    </div>
                    <div className="wrap-center">
                        <Link className="link" to="/order">Đơn đã đặt</Link>
                        <Link className="link" to="/user/info">Trang cá nhân</Link>

                    </div>
                    <div className="wrap-bottom">
                        <div className="wrap-btns">
                            {isLogin && <Link onClick={logoutHandler}>Đăng xuất</Link>}
                            {!isSaler && <Link onClick={registerSalerHandler}>Đăng ký người bán</Link>}
                            {!isLogin && <Link to="/signin">Đăng nhập</Link>}
                            {!isLogin && <Link to="/signup">Đăng ký</Link>}
                        </div>
                    </div>
                </div>
            </div>}
        </header>
    );
};

export default Header;
