import {React ,useState } from 'react'

import { Link } from 'react-router'
import Auth from './components/Auth'
import { ShieldCheck } from 'lucide-react'

function App() {

  return (
    <>
    <div className='w-screen h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <div className='rounded-2xl w-7/10 h-8/10 flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:items-center'>
        <div className='rounded-2xl hidden sm:h-full sm:w-5/10 p-8 sm:flex flex-col justify-center items-center'>
          <div className='flex flex-col items-center gap-6'>
            <div className='w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center'>
              <ShieldCheck className='w-14 h-14 text-indigo-400' />
            </div>
            <h1 className='text-4xl font-bold text-white text-center leading-tight'>Password<br/>Manager</h1>
            <p className='text-gray-400 text-center text-lg max-w-xs'>Securely store and manage all your passwords in one place.</p>
          </div>
        </div>
        <div className='rounded-2xl w-full h-full sm:h-full sm:w-5/10 p-4 flex flex-col justify-center items-center'>
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
