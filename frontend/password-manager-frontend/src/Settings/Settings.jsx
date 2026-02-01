import { React, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../store';
import Profile from './components/Profile';
import Theme from './components/Theme';
import LockScreen from './components/LockScreen';
import { get_user_settings } from '../../store/actions/actions'
import { ArrowLeft, User, Palette, Lock } from 'lucide-react'

function Settings() {
  const { authState, authDispatch } = useContext(GlobalContext)
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('profile')

  const rightPanelComponents = {
    'profile': <Profile username={authState.username} />,
    'theme': <Theme />,
    'lock-screen': <LockScreen />,
  }

  function handleTabChange(value) {
    setCurrentTab(value)
  }

  function UsernameHeader() {

    return (<>
      <div className="w-full bg-stone-50 dark:bg-gray-800 p-5 flex flex-row items-center gap-4 rounded-t-2xl border-b border-gray-200 dark:border-gray-700">
        <div className="w-14 h-14 flex items-center justify-center bg-indigo-500/10 rounded-full ring-2 ring-indigo-200 dark:ring-indigo-800">
          <p className='text-indigo-600 dark:text-indigo-400 text-xl font-bold'>{authState.username?.slice(0, 1).toUpperCase()}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className='text-gray-900 dark:text-gray-100 text-lg font-semibold'>{authState.username}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Account Settings</p>
        </div>
      </div>
    </>)
  }

  const navItems = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'theme', label: 'Theme', icon: Palette },
    { key: 'lock-screen', label: 'Lock Screen', icon: Lock },
  ]

  function LeftPanel() {

    return (<>
      <div className='w-3/10 py-4 h-full flex flex-col items-center gap-1 px-3 bg-stone-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700'>
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <div key={item.key} onClick={() => handleTabChange(item.key)} className={`w-full cursor-pointer px-4 py-3 rounded-xl flex flex-row items-center gap-3 transition-all ${currentTab === item.key ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-800' : 'text-gray-600 dark:text-gray-400 hover:bg-stone-50 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-gray-200'}`}>
              <Icon className='w-4 h-4' />
              <p className="text-sm font-medium">{item.label}</p>
            </div>
          )
        })}
      </div>
    </>)
  }
  function RightPanel() {

    return (<>
      <div className='w-7/10 h-full flex flex-col justify-center items-center'>
        {rightPanelComponents[currentTab]}
      </div>
    </>)
  }

  return (
    <>
      <div className='w-screen h-screen flex flex-col justify-center items-center relative bg-stone-100 dark:bg-gray-950'>
        <button onClick={() => navigate('/dashboard')} className="absolute top-5 left-5 flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-stone-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-all">
          <ArrowLeft className='w-4 h-4' />
          <span className='text-sm font-medium'>Back to Dashboard</span>
        </button>
        <div className='w-7/10 h-8/10 flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-none overflow-hidden'>
          <UsernameHeader />
          <div className='w-full h-full flex flex-row bg-stone-50 dark:bg-gray-900'>
            <LeftPanel />
            <RightPanel />
          </div>
        </div>
      </div>
    </>
  )

}

export default Settings;
