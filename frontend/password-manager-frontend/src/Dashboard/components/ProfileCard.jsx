import {React ,useState, useContext } from 'react'
import { GlobalContext } from '../../../store';
function ProfileCard(){
    const {authState, authDispatch} = useContext(GlobalContext)
    return(<>
      <div className="h-3/10 w-full bg-gray-300 dark:bg-slate-800 p-3 sm:flex flex-col justify-center items-center rounded-lg">
          <div className="w-20 h-20 m-2 flex items-center justify-center bg-slate-400 dark:bg-gray-500 rounded-full">
            <p className='text-gray-900 dark:text-slate-300 text-2xl font-bold text-mono'>{authState.username?.slice(0,1).toUpperCase()}</p>
          </div>
          <div className="hidden sm:block m-2 flex flex-col items-center justify-center font-medium">
              <p className='text-slate-900 dark:text-slate-300 text-2xl text-center'>{authState.username}</p>
              <div className="text-sm text-gray-900 dark:text-gray-400">Last Logged In 19:00 pm</div>
          </div>
      </div>
    </>)
}
export default ProfileCard;