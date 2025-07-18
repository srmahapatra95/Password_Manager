import {React ,useState, useContext , useEffect, Suspense, lazy} from 'react'
import { Link, useNavigate } from 'react-router'
import NavBar from './components/NavBar'
// import DataList from './components/DataList'
import ProfileCard from './components/ProfileCard'
import Tab from './components/Tab'
import Screen from './components/Screen'
import { GlobalContext } from '../../store'
const LazyDataList = lazy(() => import('./components/DataList'))
import { get_user_settings } from '../../store/actions/actions'
import DashBoardLockScreen from './components/DashBoardLockScreen'


function Dashboard() {
    const {screenState, screenDispatch} = useContext(GlobalContext)
    const {authState, authDispatch} = useContext(GlobalContext)
    const {lockScreenState, lockScreenDispatch} = useContext(GlobalContext)  

  return (
    <>
    <div className='flex flex-col w-screen h-screen bg-slate-200 dark:bg-gray-900'>
      <div id='NavBar' className='w-full h-1/10 flex flex-col justify-center'>
        <NavBar lock={lockScreenState.lock} setLock={lockScreenDispatch}/>
      </div>
      <section className='w-100/100 h-9/10 flex flex-row items-center justify-around'>
        <div id='left-panel' className='w-1/4 h-98/100 p-2'>
          <ProfileCard/>
          <Suspense fallback={<p>Loading...</p>}>
            <LazyDataList/>
          </Suspense>
        </div>
        <div id='right-panel' className='w-3/5 h-98/100 flex justify-center items-center'>
          <Tab/>
        </div>
      </section>
      {screenState.show ?(<Screen/>):(<></>)}
      {lockScreenState.lock ?(<DashBoardLockScreen lock={lockScreenState.lock} setLock={lockScreenDispatch} />):(<></>)}
    </div>
    </>
  )
}

export default Dashboard
