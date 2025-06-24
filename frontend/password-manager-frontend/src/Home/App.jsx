import {React ,useState } from 'react'

import { Link } from 'react-router'
import Auth from './components/Auth'

function App() {

  return (
    <>
    <div className='w-screen h-screen flex flex-col justify-center items-center relative bg-gray-900'>
      <div className='rounded-lg w-7/10 h-8/10  flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:items-center'>
        <div className='rounded-lg p-6 w-full sm:h-full sm:w-8/10 flex flex-col justify-center items-center bg-gray-900'>
          <img className='rounded-lg' src='/static/image/Night-Forest-Scenery.png'/>
        </div>
        <div className='rounded-lg w-full h-full sm:h-full  sm:w-7/10 p-4 flex flex-col justify-center items-center bg-gray-900'>
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
