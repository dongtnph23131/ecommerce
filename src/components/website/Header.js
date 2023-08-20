import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [isHide, setIsHide] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const onClick = () => {
    setIsHide(!isHide)
  }
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser()
  }
  return (
    <>
      <div className='shadow-sm grid grid-cols-3 gap-4 bg-gray-100 justify-between h-[100px] px-[50px] py-4'>
        <img src='https://i.imgur.com/SfVMNiF.png' className='w-[50px] h-full' />
        <div className="flex bg-white h-[50px] mt-2 rounded-[20px]">
          <input placeholder='Search your products here' className='w-[90%] px-3 py-3 border border-white rounded-[20px] focus:outline-none' />
          <span className='mt-3 ml-3'><i className="fas fa-search" /></span>
        </div>
        <div className='ml-[300px] mt-[20px] flex'>
          {user ? <div className='relative'>
            <button onClick={onClick} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src={user?.avatar} />
            </button>

            {isHide && <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
              <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</button>
              <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
            </div>}
          </div> : <><NavLink to={'/login'}><Button>Login</Button></NavLink><NavLink to={'/signup'}><Button>Register</Button></NavLink></>}
          <a href="/cart"><div className="relative ml-5"><svg stroke="currentColor" fillRule="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-red-400 text-white">1</span></div></a>
        </div>
      </div>
    </>
  )
}

export default Header