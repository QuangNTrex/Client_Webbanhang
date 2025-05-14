// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';
import { serverURL } from '../../libs/http';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import { deleteNotify, pushNotify } from '../../redux/notifySlice';

const Header = () => {
    const notify = useSelector(state => state.notify);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { avatarUrl, username, email, role } = useSelector(state => state.user);
    const isSaler = (role === 3);
    const isLogin = !!username;
    const [showMenuPerson, setShowMenuPerson] = useState(false);
    const [keyword, setKeyword] = useState("");
    const token = localStorage.getItem("token")
    const cart = useSelector(state => state.cart.cart)

    const logoutHandler = () => {
        dispatch(clearUser());
        localStorage.removeItem("token")
        navigator("/signin");

        console.log("cart", cart);
        const filterCart = cart.map(({ product, quantity }) => ({
            productId: product.productID,
            quantity
        }));
        console.log("filterCart", filterCart);
        fetch(serverURL + "/api/cart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(filterCart)
        })
            .then(res => {
                if (res.ok) {
                    localStorage.removeItem("cart");
                }
            })
            .catch(err => console.log(err))

        fetch(serverURL + "/api/account/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {

                }
            })
            .catch(err => console.log(err))
    }
    const registerSalerHandler = () => {

        fetch(serverURL + "/api/account/registerseller", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                dispatch(clearUser());

                dispatch(pushNotify({ title: "Dang ki thanh cong, vui long dang nhap lai!" }))
                setTimeout(() => {
                    navigator("/signin");
                }, 2000)
            }
        }).catch(err => {
            dispatch(pushNotify({ title: "Dang ki that bai", state: "ERR" }))
        })
    }
    useEffect(() => {
        if (notify.title) {
            setTimeout(() => {
                dispatch(deleteNotify())
            }, notify.time)
        }
    }, [notify])

    return (
        <header className="header">
            {notify.title && <div className="wrap-notify" onClick={() => { dispatch(deleteNotify()) }}>
                <div className="notify" style={{ backgroundColor: notify.exp[notify.state].bgc, color: notify.exp[notify.state].col }} >
                    <p style={{ color: notify.exp[notify.state].col }}>{notify.title}</p>
                </div>
            </div>}
            <h1 onClick={() => { navigator("/") }}><i class="bi bi-backpack2-fill" onClick={() => { dispatch(pushNotify({ title: "hello hello" })) }}></i></h1>
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
