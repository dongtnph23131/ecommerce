import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSigninMutation} from '../api/auth';
import Swal from "sweetalert2"
import { GoSync } from 'react-icons/go';
const schema = yup.object().shape({
    email: yup.string().email('Email chưa đúng địng dạng').required('Email không được để trống'),
    password: yup.string().required('Password không được để trống').min(6, 'Password ít nhất 6 kí tự'),
});
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const navagate = useNavigate()
    const [signin, { isLoading }] = useSigninMutation()
    const onSubmit =async (data) => {
        const acount = await signin(data)
        if (!acount.error) {
            Swal.fire(
                'Good job!',
                'Đăng nhập thành công',
                'success'
            )
            localStorage.setItem('user',JSON.stringify(acount.data.user))
            localStorage.setItem('token',JSON.stringify(acount.data.token))
            setTimeout(() => {
                navagate('/')
            }, 1000)
        }
        else {
            Swal.fire({
                icon: 'error',
                title: acount.error.data.message
            })
        }
    }
    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5'>
                <div className='sm:w-1/2 px-16'>
                    <h2 className='font-bold text-2xl text-[#002D74]'>Đăng nhập tài khoản</h2>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <input className='p-2 mt-8 rounded-xl border ' type='text' placeholder='Email' {...register('email')} />
                        <p className='text-red-400'>{errors.email ? errors?.email.message : ""}</p>
                        <input className='p-2 mt-8 rounded-xl border ' type='password' placeholder='Mật khẩu' {...register('password')} />
                        <p className='text-red-400'>{errors.password ? errors?.password.message : ""}</p>
                        <button className='bg-[#002D74] rounded-2xl text-white py-2 mt-4 hover:scale-105 duration-300' type='submit'>
                            {isLoading ? <GoSync className='animate-spin ml-[50%]' /> : 'Đăng nhập'}</button>
                       
                    </form>
                    <div className='mt-5 text-xs flex justify-between items-center'>
                        <p>Don't have an acount?</p>
                        <NavLink to={'/signup'}><button className='py-2 px-5 bg-white border rounded-xl'>Register</button></NavLink>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img src='https://i.imgur.com/SfVMNiF.png' />
                </div>
            </div>
        </div>
    )
}

export default Login