import {React ,useState } from 'react'

import { Link } from 'react-router'

function App() {

  return (
    <>
    <div className='w-screen h-screen flex flex-col bg-rose-500 relative'>
      <nav className='p-4 w-full flex flex-row justify-end items-end'>
        <Link className='font-bold text-indigo-600 border-2 px-4 p-2 rounded-md mx-1 cursor hover:bg-rose-50' to={'auth'}>Login</Link>
        <Link className='font-bold text-indigo-600 border-2 px-4 p-2 rounded-md cursor hover:bg-rose-50' to={'auth'}>Register</Link>

      </nav>
      <section className='w-0.98 h-full bg-slate-300 flex flex-col justify-center items-center sm:flex-row bg-slate-600'>
        <div className='w-full sm:h-full p-8 flex flex-col justify-center items-center bg-indigo-800'>
          <p className='text-3xl font-bold text-slate-400 text-center'>Password Manager</p>
        </div>
        <div className='w-full h-full p-8 flex flex-col justify-center items-center'>
          <p className='sm:flex'>This portion will holf image</p>
        </div>
      </section>

      <div className='absolute bottom-0 w-screen flex flex-row justify-center items-center bg-slate-200 text-center'>
        <p className='text-grey-600 font-bold text-md'>Made with Django React and Love</p>
      </div>
    </div>
    </>
  )
}

export default App
