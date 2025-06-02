import {React ,useState } from 'react'

import { Link } from 'react-router'

function App() {

  return (
    <>
    <div className='w-screen h-screen flex flex-col bg-black relative'>
      <nav className='hidden sm:flex p-4 w-full flex-row justify-end items-end'>
        <Link className='font-bold text-indigo-600 border-2 px-4 p-2 rounded-md mx-1 cursor hover:bg-rose-50' to={'auth'}>Login</Link>
        <Link className='font-bold text-indigo-600 border-2 px-4 p-2 rounded-md cursor hover:bg-rose-50' to={'auth'}>Register</Link>
      </nav>
      <section className='w-0.98 h-full  flex flex-col justify-center items-center sm:flex-row'>
        <div className='w-full sm:h-full p-8 flex flex-col justify-center items-center'>
          <p className='text-3xl font-bold text-slate-400 text-center'>Password Manager</p>
        </div>
        <div className='w-full h-full sm:h-full p-8 flex flex-col justify-center items-center'>
          <p className='sm:flex text-slate-400'>This portion will hold image</p>
        </div>
      </section>
      <nav className='flex sm:hidden p-2 my-20 w-full flex-row justify-center items-center'>
        <Link className='font-bold text-indigo-600 border-2 px-4 p-2 rounded-md mx-1 cursor hover:bg-rose-50' to={'auth'}>Login</Link>
        <Link className='font-bold text-indigo-600 border-2 px-4 p-2 rounded-md mx-1 cursor hover:bg-rose-50' to={'auth'}>Register</Link>
      </nav>

      <div className='absolute bottom-0 w-screen flex flex-row justify-center items-center text-center'>
        <p className='text-slate-400 font-bold text-md'>Made with Django React and Love</p>
      </div>
    </div>
    </>
  )
}

export default App
