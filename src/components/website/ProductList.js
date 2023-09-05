import { Button } from 'antd'
import React, { useState } from 'react'
import { useGetProductsQuery } from '../../api/product'
import Skeleton from 'react-loading-skeleton'
import InputCategory from './Input/InputCategory'
import InputPrice from './Input/InputPrice'
import InputRaiting from './Input/InputRaiting'
import { useGetCategoriesQuery } from '../../api/category'
import { useDispatch } from 'react-redux'
import { addItem } from '../../slices/cart'
import { NavLink } from 'react-router-dom'

const ProductList = ({valueSearch}) => {
  const dispatch=useDispatch()
  const [isCategory, setIsCategory] = useState(false)
  const [isPrice, setIsPrice] = useState(false)
  const [isRaiting, setIsRaiting] = useState(false)
  const [page, setPage] = useState(1)
  const [raiting, setRaiting] = useState()
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [sortPrice, setSortPrice] = useState()
  const [categoryId,setCategoryId]=useState()
  const {data:categories}=useGetCategoriesQuery()
  const { data, isLoading } = useGetProductsQuery({ page, raiting, sortPrice, minPrice, maxPrice,valueSearch,categoryId })
  const numberPage=Number(Math.ceil(data?.data.length/8))
  const onNextPage = () => {
    setPage(page + 1)
    // if(page===numberPage){
    //   setPage(1)
    // }
  }
  const onChangeCategory=(event)=>{
      setCategoryId(event.target.value)
  }
  const onPrePage = () => {
    setPage(page - 1)
    // if(page===1){
    //   setPage(numberPage)
    // }
  }

  const onChangeSortPrice = (event) => {
    event.preventDefault()
    setSortPrice(event.target.value)
  }
  const onInputPriceChange = (event) => {
    setMinPrice(event.target.value.split(",")[0]);
    setMaxPrice(event.target.value.split(",")[1])
  }
  const onInputRaitingChange = (event) => {
    setRaiting(event.target.value)
  }
  return (
    <>{isLoading ? <Skeleton className='mt-5' count={5} /> : <div className='bg-white mx-5 my-5'>
      <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
        <div className="flex items-center">
          <div className="relative inline-block text-left">
            <div>
              Sort Price: <select onChange={onChangeSortPrice} className="py-1" role="none">
                <option value={'createAt'} className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Default</option>
                <option value={'price'} className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Low to High</option>
                <option value={'-price'} className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-4">High to Low</option>
              </select>
            </div>
          </div>

          <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
            <span className="sr-only">View grid</span>
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fillRule="currentColor">
              <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
            </svg>
          </button>
          <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <span className="sr-only">Filters</span>
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fillRule="currentColor">
              <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className='flex mt-4'>
        <div className='pl-3 w-[30%]'>
          <div className=" border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                <span className="font-medium text-gray-900">Category</span>
                <span className="ml-6 flex items-center">
                  {isCategory ? <svg onClick={() => setIsCategory(false)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                  </svg> : <svg onClick={() => setIsCategory(true)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>}
                </span>
              </button>
            </h3>
            {isCategory ? <InputCategory onChangeCategory={onChangeCategory} data={categories} /> : ""}
          </div>
          <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                <span className="font-medium text-gray-900">Price</span>
                <span className="ml-6 flex items-center">
                  {isPrice ? <svg onClick={() => setIsPrice(false)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                  </svg> : <svg onClick={() => setIsPrice(true)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>}
                </span>
              </button>
            </h3>
            <div className="pt-6" id="filter-section-mobile-0">
              {isPrice ? <InputPrice onInputPriceChange={onInputPriceChange} /> : ""}
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                <span className="font-medium text-gray-900">Raiting</span>
                <span className="ml-6 flex items-center">
                  {isRaiting ? <svg onClick={() => setIsRaiting(false)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                  </svg> : <svg onClick={() => setIsRaiting(true)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>}
                </span>
              </button>
            </h3>
            <div className="pt-6" id="filter-section-mobile-0">
              {isRaiting ? <InputRaiting onInputRaitingChange={onInputRaitingChange} /> : ""}
            </div>
          </div>
        </div>
        <div className='ml-[50px]'>
          {data?.data.length === 0 ? <h1 className='text-2xl font-bold'>No products matched</h1> : <><div className=' grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {data?.data?.map((item) => (
              <div key={item._id} className="group relative">
                <div className=" relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img src={item.images[0].url} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-[300px] w-full object-cover object-center group-hover:opacity-75" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                   <NavLink to={`/products/${item._id}`}> <button className="text-white text-lg w-9 h-8 rounded-full bg-red-400 flex items-center justify-center hover:bg-gray-800 transition"><i className="fas fa-eye" /></button></NavLink>
                  </div>
                </div>
                <div className='flex'>
                  <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                  <Button className='mt-4 ml-[30px] border border-red-400' onClick={()=>{
                      dispatch(addItem({...item,quantity:1}))
                  }}>Add to cart</Button>
                </div>
                <p className="mt-1 text-lg font-medium text-gray-900">${item.price}</p>
              </div>
            ))}

          </div>
            <div className='mt-[50px] flex justify-center items-center'>
              <button onClick={onPrePage} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <p aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{page}</p>
              <button onClick={onNextPage} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div></>}
        </div>
      </div>

    </div>}</>
  )
}

export default ProductList