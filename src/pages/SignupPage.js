import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from "sweetalert2"
import { useSignupMutation } from '../api/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import {GoSync}from "react-icons/go"
const schema = yup.object().shape({
    name: yup.string().required('Tên tài khoản không để trống'),
    email: yup.string().email('Email chưa đúng địng dạng').required('Email không được để trống'),
    password: yup.string().required('Password không được để trống').min(6, 'Password ít nhất 6 kí tự'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), 'Nhập lại mật khẩu chưa đúng']).required('Cần nhập lại mật khẩu'),
    avatar:yup.mixed().test('required','Cần upload file avatar',value=>{
        return value && value.length;
    })
});
const SignupPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const navagate = useNavigate()
    const [signup, { isLoading }] = useSignupMutation()
    const [img, setImage] = useState("")
    const onChangeImg = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const apiResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
            formData
        );
        setImage(apiResponse.data.data.url);
    }
    const onSubmit = async (data) => {
        const acount = await signup({ ...data, avatar: img })
        if (!acount.error) {
            Swal.fire(
                'Good job!',
                'Đăng ký thành công',
                'success'
            )
            setTimeout(() => {
                navagate('/login')
            }, 1000)
        }
        else {
            Swal.fire({
                icon: 'error',
                title: acount.error.data.message
            })
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5'>
                <div className='sm:w-1/2 px-16'>
                    <h2 className='font-bold text-2xl text-[#002D74]'>Đăng ký tài khoản</h2>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <input className='p-2 mt-8 rounded-xl border ' type='text' placeholder='Email' {...register('email')} />
                        <p className='text-red-400'>{errors.email ? errors?.email.message : ""}</p>
                        <input className='p-2 mt-8 rounded-xl border ' type='text' placeholder='Name' {...register('name')} />
                        <p className='text-red-400'>{errors.name ? errors?.name.message : ""}</p>
                        <input className='p-2 mt-8 rounded-xl border ' type='password' placeholder='Mật khẩu' {...register('password')} />
                        <p className='text-red-400'>{errors.password ? errors?.password.message : ""}</p>
                        <input className='p-2 mt-8 rounded-xl border ' type='password' {...register('confirmPassword')} placeholder='Nhập lại mật khẩu' />
                        <p className='text-red-400'>{errors.confirmPassword ? errors?.confirmPassword.message : ""}</p>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                        <input {...register('avatar')} onChange={onChangeImg} accept=".png, .jpg" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />
                        <p className='text-red-400'>{errors.avatar ? errors?.avatar.message : ""}</p>
                        <button className='bg-[#002D74] rounded-2xl text-white py-2 mt-4 hover:scale-105 duration-300' type='submit'>
                            {isLoading ?<GoSync className='animate-spin ml-[50%]' />:'Đăng ký'}</button>
                    </form>
                    <div className='mt-5 text-xs flex justify-between items-center'>
                        <p>Don't have an acount?</p>
                        <NavLink to={'/login'}><button className='py-2 px-5 bg-white border rounded-xl'>Login</button></NavLink>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img src='https://i.imgur.com/SfVMNiF.png' />
                </div>
            </div>
        </div>
    )
}
export default SignupPage