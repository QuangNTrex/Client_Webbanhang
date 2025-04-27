import ProductCard from './ProductCard';
import './UserDetail.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { serverURL } from '../../libs/http';
import ProductList from './ProductList';

const UserDetail = ({userID}) => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([{price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"},{price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"},{price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}, {price: 1000,title: "abc", description: "abc", images: "https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/492804809_1331048907962344_9076142306362101331_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH5-d3gebRUQ75CWelguqfV9L4dHzGJ2wv0vh0fMYnbCxSoSR_xSE_4KU-kFzZJJN2_iYZt4TM09qzP5ZbPmQW1&_nc_ohc=7mrz0hB3WYsQ7kNvwFC67hE&_nc_oc=AdmFuOEWyX57JbG5-IRr1vmDeL7JUvQ5WG19YusX5nkjJb6cXPWzARuNuPBUhnBfydg&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=tUX1phrybSDVDmrzSh5elQ&oh=00_AfHnpXvioz7yhiK9sN_p77UNaFRffdomOh-Fi4i-V6vs7w&oe=68120A06"}]);
    
    const navigation = useNavigate();
    const pseudoUser = useSelector(state => state.user);
    const clickHandler = (product) => {
        navigation("/detail/" + product.productID);
    } 
    
    useEffect(() => {
            fetch(serverURL + "/api/account?id=" + userID, {
                method: "GET",
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_TOKEN_HERE'
                },
                body: JSON.stringify({id: userID})
            }).then(res => res.json()).then(data => {
                setUser(data);
            }).catch(err => {
                setUser(pseudoUser);
            })

            fetch(serverURL + "/api/product?user_id=" + userID, {
                method: "GET",
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_TOKEN_HERE'
                },
                body: JSON.stringify({userID: userID})
            }).then(res => res.json()).then(data => {
                setProducts(data);
            }).catch(err => {
                console.log(err);
            })
        }, [userID]);


    
    return <div className="UserDetail">
       <div className="wrap-top wrap-top--">
            <div className="wrap-top-left">
                <div className="wrap-avatar">
                    <img src={user.avatarUrl} alt="" className="avatar" />
                </div>
                <div className="wrap-info">
                    <p className="name">{user.name}</p>
                    <p className="username">{user.username}</p>
                </div>
            </div>
            <div className="wrap-top-right">
                <p className="title">Sản phẩm: {products.length}</p>
                <p className="title">Số điện thoại: {user.phoneNumber}</p>
                <p className="title">Gmail: {user.email}</p>

            </div>
        </div>
        <div className="wrap-bottom">
            <h2 className="title">Tất cả sản phẩm</h2>
            <div className="wrap-product">
                <ProductList products={products} clickHandler={clickHandler}/>
            </div>
        </div>
    </div>
}
export default UserDetail;