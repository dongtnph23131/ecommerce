import { Button, Table } from 'antd'
import React from 'react'
import { useGetCategoriesQuery } from '../../../api/category'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'

const ListCategory = () => {
    const { data, isLoading } = useGetCategoriesQuery()
    const dataSource = data?.data?.map((item) => (
        {
            key: item._id,
            name: item.name
        }
    ))
    const columns = [
        {
            title: 'Tên danh mục sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => {
                return <>
                  <Button>Delete</Button>
                  <Button className='ml-3'>Edit</Button>
                </>
            }
        },
    ];
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='font-bold text-2xl'>Quản lí danh mục sản phẩm</h1>
                <NavLink to={'/admin/categories/add'}><Button>Thêm mới danh mục sản phẩm</Button></NavLink>
            </div>
            {isLoading?<Skeleton className='mt-5' count={5}/>:<Table className='mt-10' dataSource={dataSource} columns={columns} pagination={{pageSize:6}}/>}
        </>
    )
}

export default ListCategory