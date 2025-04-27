// src/pages/OrderPage.jsx
import { useDispatch, useSelector } from "react-redux";
import "./OrderPage.css"
import { useEffect, useState } from "react";
import { serverURL } from "../libs/http";
import OrderItem from "../Component/UI/OrderItem";


const OrderPage = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([{
        orderID: "1234 ",
        createdAt: 1745728763738,
        buyer: {
            userID: "ababa",
            name: "ahihi",
            address: "ijandkjnd and jdn ad "
        },
        vendor: {
            userID: "babab",
            name: "ah",
            email: "abc@gmail.com"
        },
        orderDetails: [{
            price: 1000,
            product: {user: {
                userID: "ahihi",
                avatarUrl: "https://down-vn.img.susercontent.com/file/vn-11134216-7r98o-lvvpsh3mxz2z4c@resize_w160_nl.webp",
                name: "MuscleStore -Thực Phẩm Bổ Sung",
            }, productID: "1111",price: 1000,title: "Creatine Monohydrate - Ostrovit (300g, 500g) Tăng Cơ, Tăng Sức Mạnh & Hiệu Suất Tập Luyện", description: "OstroVit Creatine Monohydrate là sản phẩm bổ sung creatine monohydrate với mức độ vi mô hóa tuyệt vời. Creatine là một chất bổ sung được biết đến và sử dụng rộng rãi. Hiệu quả của nó đã được xác nhận bởi nhiều nghiên cứu khoa học. Nó cung cấp sự phát triển cơ bắp tốt hơn, tái tạo hiệu quả và năng lượng để tập luyện lâu hơn, hiệu quả hơn. Creatine là một hợp chất hóa học hữu cơ xuất hiện tự nhiên trong cơ thể con người. Nó thường được cung cấp cùng với các sản phẩm từ thịt động vật, trứng hoặc cá. Tác dụng có lợi của nó dựa trên một cơ chế đơn giản giải phóng năng lượng dưới dạng các phân tử năng lượng cao ATP (adenosine triphosphate) thông qua sự phân hủy phosphocreatine trong cơ. Mặc dù thực tế là creatine cũng có trong thực phẩm, nhưng cách duy nhất để giúp cơ bắp của chúng ta bão hòa 100% với creatine là bổ sung nó liên tục", images: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzr6bvyk5kf503"}    
        }]
    }]);
    const user = useSelector(state => state.user);
    const deleteOrderHandler = (orderID) => {
        fetch(serverURL + "/api/order/id?id=" + orderID, {
            method: "DELETE",
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
            },
            body: JSON.stringify({id: orderID})
        }).then(res => res.json()).then(data => {
            
        }).catch(err => {
            console.log(err);
        })

        setOrders(prev => prev.filter(e => e.orderID !== orderID));
    } 

     useEffect(() => {
                fetch(serverURL + "/api/order/userid?id=" + user.userID, {
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_TOKEN_HERE'
                    },
                    body: JSON.stringify({userID: user.userID})
                }).then(res => res.json()).then(data => {
                   setOrders(data);
                }).catch(err => {
                    
                })
            }, [user]);

    return (
        <div className="OrderPage">
            <h2 className="title">Đơn đã đặt</h2>
            {orders.map(e => <OrderItem order={e} onDeleteOrder={deleteOrderHandler}/>)}
        </div>
    );
};

export default OrderPage;
