import React from 'react'
import { useGetProductsAdminQuery, useRemoveProductMutation } from '../../../api/product'
import { Button, Table, message } from 'antd'
import { NavLink } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useGetCategoriesQuery } from '../../../api/category'
import { GoSync } from 'react-icons/go'

const ProductListAdmin = () => {
    const { data: categories } = useGetCategoriesQuery()
    const { data, isLoading } = useGetProductsAdminQuery({})
    const [removeProduct, { isLoadingRemove }] = useRemoveProductMutation()
    const dataSource = data?.data?.map((item) => (
        {
            key: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            raitings: item.raitings,
            avatar: item.images[0].url,
            stock: item.stock,
            numOfReviews: item.numOfReviews,
            raitings: item.raitings,
            categoryName: categories?.data.find(data => {

                return data._id === item.categoryId
            }).name
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
            render: (item) => {
                return <img className='w-[80px]' src={item}></img>
            }
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Số lượng bình luận',
            dataIndex: 'numOfReviews',
            key: 'numOfReviews',
        },
        {
            title: 'Raitings',
            dataIndex: 'raitings',
            key: 'raitings',
        },
        {
            title: 'Danh mục sản phẩm',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => {
                return <>
                    <Button onClick={async () => {
                        const confirm = window.confirm('Bạn có muốn xóa không ?')
                        if (confirm) {
                            const data = await removeProduct(item.key)
                            message.success(data.data.message)
                        }
                    }}>{isLoadingRemove ? <GoSync className='animate-spin' /> : 'Delete'}</Button>
                    <NavLink to={`/admin/products/edit/${item.key}`}>
                    <Button className='ml-3'>Edit</Button>
                    </NavLink>
                </>
            }
        },
    ];
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='font-bold text-2xl'>Quản lí  sản phẩm</h1>
                <NavLink to={'/admin/products/add'}><Button>Thêm mới sản phẩm</Button></NavLink>
            </div>
            {isLoading ? <Skeleton className='mt-5' count={5} /> : <Table className='mt-10' dataSource={dataSource} columns={columns} pagination={{ pageSize: 4 }} />}
        </>
    )
}

export default ProductListAdmin