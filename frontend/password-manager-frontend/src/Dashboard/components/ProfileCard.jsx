import {React ,useState, useContext } from 'react'
import { GlobalContext } from '../../../store';
import { Clock } from 'lucide-react'

function ProfileCard(){
    const {authState, authDispatch} = useContext(GlobalContext)
    return(<>
      <div className="h-3/10 w-full bg-stone-50 dark:bg-gray-900 p-4 sm:flex flex-col justify-center items-center rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none">
          <div className="w-16 h-16 m-2 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/20">
            <p className='text-white text-2xl font-bold'>{authState.username?.slice(0,1).toUpperCase()}</p>
          </div>
          <div className="hidden sm:block m-2 flex flex-col items-center justify-center">
              <p className='text-gray-900 dark:text-gray-100 text-lg font-semibold text-center'>{authState.username}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Clock className='w-3 h-3 text-gray-400' />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Last Logged In 19:00 pm</span>
              </div>
          </div>
      </div>
    </>)
}
export default ProfileCard;
