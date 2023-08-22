import React, { useState } from 'react'
import Header from '../components/website/Header'
import ProductList from '../components/website/ProductList'
import Footer from '../components/website/Footer'
import Cart from '../components/website/Cart'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const [valueSearch,setValueSearch]=useState("")
  const onChangeSearch=(value)=>{
    setValueSearch(value);
  }
  const [isShowCart,setIsShowCart]=useState(false)
  const onShowCart=()=>{
    setIsShowCart(true)
  }
  const onHiddenCart=()=>{
    setIsShowCart(false)
  }
  return (
    <>
      <Header onShowCart={onShowCart} onChangeSearch={onChangeSearch}/>
      <ProductList valueSearch={valueSearch}/>
      <Footer/>
      {isShowCart && <Cart onHiddenCart={onHiddenCart}/>}
    </>
  )
}

export default HomePage