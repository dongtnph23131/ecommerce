import React, { useState } from 'react'
import Header from '../components/website/Header'
import { Form, Input, InputNumber } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Footer from '../components/website/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateOrderMutation } from '../api/order'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'
import { GoSync } from 'react-icons/go'
import { clearCart } from '../slices/cart'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
const token = JSON.parse(localStorage.getItem('token'))
const CheckoutCartPage = () => {
    const stripePromise = loadStripe('pk_test_51NhcV4BTIfNMcVjXjMESMmQhCf2RhFgQ0Ty1jzFU9d11AbFWtF62jnDvc1GiGclfk790xYvUxvNCfjJtmH4OVExy00lacgrP5h')
    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const [createOrder, { isLoading }] = useCreateOrderMutation()
    const { items } = useSelector(state => state.cart)
    const totalCart = items.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
    const [info, setInfo] = useState()
    const onFinish = (value) => {

        setInfo(value);
    }
    const payment = async () => {
        const orderItems = items.map((item) => {
            return {
                name: item.name,
                price: item.price,
                image: item.images[0].url,
                productId: item._id,
                quantity: item.quantity
            }
        })
        const order = { ...info, orderItems, totalOrder: totalCart, paidAt: Date.now(), pay: true, payments: 'Thanh toán to pay' }
        if (!info) {
            return
        }
        const lineItems = items.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }
        })
        const { data } = await axios.post('https://ecommerce-poly-be.onrender.com/api/checkout', { lineItems }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const dataOrder = await createOrder(order)
        if (dataOrder?.data?.data) {
            dispatch(clearCart())
        }
        const stripe = await stripePromise
        await stripe.redirectToCheckout({ sessionId: data.id })


    }
    const payDelivery = async () => {
        if (!info) {
            return
        }
        const orderItems = items.map((item) => {
            return {
                name: item.name,
                price: item.price,
                image: item.images[0].url,
                productId: item._id,
                quantity: item.quantity
            }
        })
        const order = { ...info, orderItems, totalOrder: totalCart, paidAt: Date.now(), payments: 'Thanh toán khi nhận hàng' }
        const data = await createOrder(order)
        if (data?.data?.data) {
            Swal.fire(
                'Good job!',
                'Đặt hàng thành công',
                'success'
            )
            dispatch(clearCart())
            naviagte("/")
            return
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa đăng nhập hoặc token hết hạn hãy đăng nhập lại'
            })
        }
    }
    return (
        <>
            <Header />
            <Form onFinish={onFinish}>
                <div className='grid grid-cols-2 gap-10 mx-10 my-10'>
                    <div className='mr-[50px]'>
                        <h1 className='text-lg font-bold mb-10'>Shopping info</h1>
                        <Form.Item label="Tên người nhận" name="userNameReceive" rules={[{ required: true, message: 'Tên người nhận trống' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Địa chỉ người nhận" name="address" rules={[{ required: true, message: 'Địa người nhận trống' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số điện người nhận" name="phone" rules={[{ required: true, message: 'Số điện thoại người nhận trống' }]}>
                            <InputNumber className='w-full' />
                        </Form.Item>
                        <Form.Item label="Ghi chú" name={"node"}>
                            <TextArea />
                        </Form.Item>
                    </div>
                    <div>
                        <h2 className='text-lg font-bold mb-10'>Your Cart Items</h2>
                        {items.map(item => {
                            return <li key={item._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={item.images[0].url} />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <p>{item.name}</p>
                                            </h3>
                                            <p className="ml-4">$ {item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {item.quantity}</p>
                                        <div className="flex">
                                            <p>Total : ${item.quantity * item.price}</p>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        })}
                        <div className='mt-5 flex justify-between'>
                            <h1 className='text-sm font-bold'>Total</h1>
                            <p className='text-lg text-gray-950'>$ {totalCart}</p>
                        </div>
                        <div className='mt-5 flex'>
                            <button onClick={payDelivery} className='w-1/2 py-2 bg-orange-400 mr-3 text-white font-bold rounded-[10px]'>{isLoading ? <GoSync className='animate-spin ml-[50%]' /> : 'Thanh toán khi nhận hàng'}</button>
                            <button className='w-1/2 py-2 bg-orange-400 mr-3 text-white font-bold rounded-[10px]' onClick={payment}>Proceed to payment</button>
                        </div>
                    </div>
                </div>
            </Form>
            <Footer />
        </>
    )
}

export default CheckoutCartPage