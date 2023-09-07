import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../../../api/product'
import { Button, Table } from 'antd'
import { NavLink } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const ProductListAdmin = () => {
    const [page, setPage] = useState(1)
    const { data,isLoading } = useGetProductsQuery({ page })
    const dataSource = data?.data?.map((item) => (
        {
            key: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            raitings: item.raitings,
            avatar: item.images[0].url,
            stock: item.stock
        }
    ))
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Mô tả sản phẩm',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ảnh mô tả sản phẩm',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => {
                return <>
                    <Button >Delete</Button>

                    <Button className='ml-3'>Edit</Button>

                </>
            }
        },
    ];
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='font-bold text-2xl'>Quản lí  sản phẩm</h1>
                <NavLink to={'/admin/categories/add'}><Button>Thêm mới sản phẩm</Button></NavLink>
            </div>
            {isLoading ? <Skeleton className='mt-5' count={5} /> : <Table className='mt-10' dataSource={dataSource} columns={columns}/>}
        </>
    )
}

export default ProductListAdmin