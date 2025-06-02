import {React ,useState, useContext } from 'react'
import { Link } from 'react-router'
import NavBar from './components/NavBar'
import DataList from './components/DataList'
import ProfileCard from './components/ProfileCard'
import Tab from './components/Tab'
import Screen from './components/Screen'
import { GlobalContext } from '../../store'

function Dashboard() {
    const {screenState, screenDispatch} = useContext(GlobalContext)

  return (
    <>
    <div className='flex flex-col w-screen h-screen'>
      <div id='NavBar' className='w-100/100 h-1/10'>
        <NavBar/>
      </div>
      <section className='w-100/100 h-9/10 flex flex-row items-center bg-green-900'>
        <div id='left-panel' className='w-1/4 h-98/100 p-2 '>
          <ProfileCard/>
          <DataList/>
        </div>
        <div id='right-panel' className='w-3/4 h-98/100 flex justify-center items-center'>
          <Tab/>
        </div>
      </section>
      {screenState.show ?(<Screen/>):(<></>)}
    </div>
    </>
  )
}

export default Dashboard
