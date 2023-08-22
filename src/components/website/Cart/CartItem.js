import { Button, InputNumber, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addItem, removeItem, updateItem } from '../../../slices/cart';

const CartItem = ({ item }) => {
    const dispatch = useDispatch()
    const onChangeQuantity = (value) => {
        console.log(String(value));
        if(value==null){
            return
        }
        if (String(value).startsWith('-')) {
            return
        }
        else {
            dispatch(updateItem({ ...item, quantity: value }))
        }
    }
    return (
        <li className="flex py-6">
            <div
                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={item.images[0].url}
                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                    className="h-full w-full object-cover object-center" />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div
                        className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <p >{item.name}</p>
                        </h3>
                        <p className="ml-4">$ {item.price * item.quantity}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">$ {item.price}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className='flex'>
                        <Button onClick={() => dispatch(removeItem(item))}>-</Button>
                        <InputNumber onChange={onChangeQuantity} value={item.quantity} className='w-[70px] pl-2' />
                        <Button onClick={() => dispatch(addItem(item))}>+</Button>
                    </div>

                    <div className="flex">
                        <button type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartItem