import { Button, Form, Input, InputNumber, Select, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useAddProductMutation } from '../../../api/product'
import { GoSync } from 'react-icons/go'
import { useGetCategoriesQuery } from '../../../api/category'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const navigate=useNavigate()
    const [images, setImages] = useState([])
    const [categoryId,setCategoryId]=useState("")
    const [addProduct, { isLoading }] = useAddProductMutation()
    const {data:categories}=useGetCategoriesQuery()
    const options=categories?.data?.map((item)=>{
        return {
            label:item.name,
            value:item._id
        }
    })
    const onFinish = async (value) => {
        const data = await addProduct({...value,categoryId,images})
        
        if (data.data.data) {
            message.success('Thêm sản phẩm thành công');
            setTimeout(() => {
                navigate("/admin/products")
            }, 1000)
        }
        else {
            message.error(data.data.message);
        }
    }
    const onChangeImg = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        const arrImage = []
        for (const key of event.target.files) {
            formData.append("image", key)
            const apiResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
                formData
            );
            arrImage.push({url:apiResponse.data.data.url})
        }
        setImages([...arrImage]);
    }
    const handleChange = (value) => {
        setCategoryId(value)
    };
    return (
        <>
            <h1 className='font-bold text-2xl'>Thêm mới sản phẩm</h1>
            <Form onFinish={onFinish} className='mt-10 ml-5'>
                <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Tên sản phẩm không được để trống' }, { min: 6, message: 'Tên sản phẩm ít nhất 6 kí tự' }, { max: 255, message: 'Tên sản phẩm nhiều nhất 255 kí tự' }]}>
                    <Input className='w-[50%] ml-3' />
                </Form.Item>
                <Form.Item label="Gía sản phẩm" name="price" rules={[{ required: true, message: 'Giá sản phẩm không được để trống' }]}>
                    <InputNumber className='w-[50%] ml-3' />
                </Form.Item>
                <Form.Item label="Mô tả sản phẩm" name="description" rules={[{ required: true, message: 'Mô tả sản phẩm không được để trống' }]}>
                    <Input className='w-[50%] ml-3' />
                </Form.Item>
                <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Stock không được để trống' }]}>
                    <InputNumber className='w-[50%] ml-3' />
                </Form.Item>
                Hình ảnh  <input onChange={onChangeImg} accept=".png, .jpg" className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
                Danh mục sản phẩm <Select
                    style={{ width: 120,marginTop:'20px' }}
                    onChange={handleChange}
                    defaultValue={'Chọn danh mục sản phẩm'}
                    options={options}
                />
                <br/>
                <Button htmlType='submit' className='mt-5'>{isLoading ? <GoSync className='animate-spin' /> : 'Thêm  sản phẩm'}</Button>
            </Form>
        </>
    )
}

export default AddProduct