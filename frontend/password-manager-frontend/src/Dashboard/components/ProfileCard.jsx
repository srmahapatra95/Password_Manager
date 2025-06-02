import {React ,useState } from 'react'
function ProfileCard(){
    return(<>
      <div className="h-3/10  bg-black p-3 sm:flex flex-col justify-center items-center rounded-md">
          <img className="w-20 h-20 m-2 rounded-full" src="" alt=""/>
          <div className="hidden sm:block m-2 font-medium dark:text-white">
              <p className='text-slate-300'>Username</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last Logged In 19:00 pm</div>
          </div>
      </div>
    </>)
}
export default ProfileCard;