import { Table } from 'antd';
import React, { useState } from 'react'
import { useGetOneProductQuery } from '../../api/product';

const ModalViewComment = ({ hiddenViewComment,dataViewComment }) => {
    const {data}=useGetOneProductQuery(dataViewComment.key)

    const dataSource = data?.data?.reviews.map((item,index)=>{
        return {
            key: index,
            userId:item.userId,
            name: item.name,
            avatar:item.avatar,
            rating:item.rating,
            comment:item.comment
        }
    })

    const columns = [
        {
            title: 'UserId',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'UserName',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'AvatarUser',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="w-6/12 h-400">
                <div className="px-6 py-3 h-10 bg-gray-600 text-left text-xs font-medium text-black uppercase tracking-wider">
                    <button onClick={hiddenViewComment} className="float-right">
                        <i className="fas fa-times" />
                    </button>
                </div>
                <div className="py-10 h-900 bg-gray-100 flex justify-between">
                    <Table className='w-full mx-5 my-5' dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default ModalViewComment