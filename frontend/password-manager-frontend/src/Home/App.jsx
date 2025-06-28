import {React ,useState } from 'react'

import { Link } from 'react-router'
import Auth from './components/Auth'

function App() {

  return (
    <>
    <div className='w-screen h-screen flex flex-col justify-center items-center relative bg-gray-900'>
      <div className='rounded-lg w-7/10 h-8/10  flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:items-center'>
        <div className='rounded-lg hidden sm:h-full  sm:w-5/10 p-4 sm:flex flex-col justify-center items-center bg-gray-900'>
          <img src="static/image/login_page_image.jpg"/>
        </div>
        <div className='rounded-lg w-full h-full sm:h-full  sm:w-5/10 p-4 flex flex-col justify-center items-center bg-gray-900'>
          <Auth/>
        </div>
      </div>
      <div className='absolute bottom-0 w-screen flex flex-row justify-center items-center text-center'>
      </div>
    </div>
    </>
  )
}

export default App
