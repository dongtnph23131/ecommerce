import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { GoSync } from "react-icons/go"
import {useGetOneCategoryQuery, useUpdateCategoryMutation } from '../../../api/category'
import { useNavigate, useParams } from 'react-router-dom'
const EditCategory = () => {
    const naigate = useNavigate()
    const { id } = useParams()
    const { data } = useGetOneCategoryQuery(id)
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])
    const [editCategory, { isLoading }] = useUpdateCategoryMutation()
    const onFinish = async (value) => {
        const data = await editCategory({id, ...value })
        if (data.data.updateCategory) {
            message.success('Cập nhập danh mục sản phẩm thành công');
            setTimeout(() => {
                naigate("/admin/categories")
            }, 1000)
        }
        else {
            message.error(data.data.message);
        }
    }
    return (
        <>
            <h1 className='font-bold text-2xl'>Cập nhập danh mục sản phẩm</h1>
            <Form form={form} onFinish={onFinish} className='mt-10 ml-5'>
                <Form.Item label="Tên danh mục sản phẩm" name="name" rules={[{ required: true, message: 'Tên danh mục sản phẩm không được để trống' }, { min: 6, message: 'Tên danh mục ít nhất 6 kí tự' }, { max: 255, message: 'Tên danh mục nhiều nhất 255 kí tự' }]}>
                    <Input className='w-[50%] ml-3' />
                </Form.Item>
                <Button htmlType='submit' className='mt-5'>{isLoading ? <GoSync className='animate-spin' /> : 'Cập nhập danh mục sản phẩm'}</Button>
            </Form>
        </>
    )
}

export default EditCategory