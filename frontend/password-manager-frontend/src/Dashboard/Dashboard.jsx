import { React, useState, useContext, useEffect, Suspense, lazy } from 'react'
import { Link, useNavigate } from 'react-router'
import NavBar from './components/NavBar'
import ProfileCard from './components/ProfileCard'
import Tab from './components/Tab'
import Screen from './components/Screen'
import { GlobalContext } from '../../store'
const LazyDataList = lazy(() => import('./components/DataList'))
import { get_user_settings } from '../../store/actions/actions'
import DashBoardLockScreen from './components/DashBoardLockScreen'
import { Loader2 } from 'lucide-react'


function Dashboard() {
  const { screenState, screenDispatch } = useContext(GlobalContext)
  const { authState, authDispatch } = useContext(GlobalContext)
  const { lockScreenState, lockScreenDispatch } = useContext(GlobalContext)

  return (
    <>
      <div className='flex flex-col w-screen h-screen bg-stone-100 dark:bg-gray-950'>
        <div id='NavBar' className='w-full flex flex-col justify-center'>
          <NavBar lock={lockScreenState.lock} setLock={lockScreenDispatch} />
        </div>
        <section className='w-100/100 flex-1 flex flex-row items-stretch justify-around p-3 gap-3'>
          <div id='left-panel' className='w-1/4 h-full flex flex-col gap-3'>
            <ProfileCard />
            <Suspense fallback={<div className='flex items-center justify-center p-8 text-slate-500'><Loader2 className='w-5 h-5 animate-spin' /></div>}>
              <LazyDataList />
            </Suspense>
          </div>
          <div id='right-panel' className='w-3/4 h-full flex justify-center items-center'>
            <Tab />
          </div>
        </section>
        {screenState.show ? (<Screen />) : (<></>)}
      </div>
    </>
  )
}

export default Dashboard
