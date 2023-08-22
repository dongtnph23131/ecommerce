import React, { useState } from 'react'
import Footer from '../components/website/Footer'
import Header from '../components/website/Header'
import { Rate } from "antd"
import { useGetOneProductQuery } from '../api/product'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
const ProductDetail = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetOneProductQuery(id)
    const [numberImg, setNumberImage] = useState(0)
    return (
        <>
            <Header />
            {isLoading ? <Skeleton count={5} /> : <div className="bg-white">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>
                                <div className="flex items-center">
                                    <h1 className="mr-2 text-sm font-medium text-gray-900">{data?.data?.categoryId?.name}</h1>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <p className="mr-2 text-sm font-medium text-gray-900">{data?.data?.name}</p>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className='flex gap-4'>
                        <div
                            id="carouselExampleIndicators"
                            className="relative mx-[150px] my-[50px] w-[50%] h-full"
                            data-te-carousel-init
                            data-te-ride="carousel">
                            <div
                                className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                                data-te-carousel-indicators>
                                {data?.data?.images?.map((item) => {
                                    return <button
                                        key={item._id}
                                        type="button"
                                        data-te-target="#carouselExampleIndicators"
                                        data-te-slide-to="0"
                                        data-te-carousel-active
                                        className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                        aria-current="true"
                                        aria-label="Slide 1"></button>
                                })}
                            </div>

                            <div
                                className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                                <div
                                    className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-te-carousel-item
                                    data-te-carousel-active>
                                    <img
                                        src={data?.data?.images[numberImg]?.url}
                                        className="block w-full h-full"
                                        alt="Wild Landscape" />
                                </div>
                            </div>
                            <button
                                onClick={()=>{
                                  setNumberImage(numberImg-1)
                                  if(numberImg===0){
                                    setNumberImage(data?.data?.images.length-1)
                                  }
                                }}
                                className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-indigo-600 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-indigo-600 hover:no-underline hover:opacity-90 hover:outline-none focus:text-indigo-600 focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                type="button"
                                data-te-target="#carouselExampleIndicators"
                                data-te-slide="prev">
                                <span className="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={()=>{
                                    setNumberImage(numberImg+1)
                                    if(numberImg>data?.data?.images.length-2){
                                        setNumberImage(0)
                                    }
                                    
                                }}
                                className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-indigo-600 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-indigo-600 hover:no-underline hover:opacity-90 hover:outline-none focus:text-indigo-600 focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                type="button"
                                data-te-target="#carouselExampleIndicators"
                                data-te-slide="next">
                                <span className="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className='mt-[50px]'>
                            <div className="lg:col-span-2 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data?.data?.name}</h1>
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl mt-6 tracking-tight text-gray-900">$ {data?.data?.price}</p>
                                <div className='flex mt-6'>
                                    <Rate value={4} />
                                    <p href="#" className="ml-5 mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</p>
                                </div>
                                <div className='mt-6'>
                                    <h3 className="sr-only">Description</h3>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{data?.data?.description}</p>
                                    </div>
                                </div>
                                <button type="submit" className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <Footer />
        </>
    )
}

export default ProductDetail