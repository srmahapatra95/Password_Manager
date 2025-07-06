import {React ,useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../store';
import Profile from './components/Profile';
import Theme from './components/Theme';
import LockScreen from './components/LockScreen';
import Security from './components/Security';
import { get_user_settings } from '../../store/actions/actions'

function Settings() {
  const {authState, authDispatch} = useContext(GlobalContext)
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('lock-screen')

  const rightPanelComponents = {
    'profile':<Profile username={authState.username}/>,
    'theme':<Theme/>,
    'lock-screen':<LockScreen/>,
    'security':<Security/>
  }

  function handleTabChange(value){
    setCurrentTab(value)
  }

  function UsernameHeader(){

    return(<>
      <div className="w-full bg-slate-300 dark:bg-slate-800 p-2 sm:flex flex-row justify-start items-center rounded-t-lg">
          <div className="w-15 h-15 m-2 flex items-center justify-center bg-gray-500 rounded-full">
            <p className='text-slate-900 dark:text-slate-100 text-2xl font-bold text-mono'>{authState.username?.slice(0,1).toUpperCase()}</p>
          </div>
          <div className="m-2 flex flex-col items-start justify-start dark:text-white">
              <p className='text-slate-900 dark:text-slate-100 text-xl text-center'>{authState.username}</p>
              <p className='text-sm text-slate-900 dark:text-slate-100'>Your Personal Profile</p>
          </div>
      </div>
    </>)
  }

  function LeftPanel(){

    return(<>
      <div className='w-3/10 pt-1 h-full flex flex-col items-center border-0 border-white mx-1'>
          <div onClick={()=> handleTabChange('profile')} className= {`w-full cursor-pointer mb-2 p-1 border-l-1 border-slate-100  ${currentTab === 'profile'?'bg-gray-300 dark:bg-gray-800 dark:border-slate-500':''}`}>
              <div className="ml-2 flex flex-row justify-start items-center text-slate-900 dark:text-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <p className="ml-2 text-slate-900 dark:text-slate-100">Profile</p>
              </div>
          </div>
            <div onClick={()=> handleTabChange('theme')} className={`w-full cursor-pointer mb-2 p-1 border-l-1 border-slate-100 ${currentTab === 'theme'?'bg-gray-300 dark:bg-gray-800 dark:border-slate-500':''} `}>
                <div className="ml-2 flex flex-row justify-start items-center text-slate-900 dark:text-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
                  <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                  <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7"/>
                </svg>
                <p className="ml-2 text-slate-900 dark:text-slate-100">Theme</p>
              </div>
            </div>
            <div onClick={()=> handleTabChange('lock-screen')} className={`w-full cursor-pointer mb-2 p-1 border-l-1 border-slate-100 ${currentTab === 'lock-screen'?'bg-gray-300 dark:bg-gray-800 dark:border-slate-500':''} `}>
              <div className="ml-2 flex flex-row justify-start items-center text-slate-900 dark:text-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                </svg>
                <p className="ml-2 text-slate-900 dark:text-slate-100">Lock Screen</p>
              </div>
            </div>
            <div onClick={()=> handleTabChange('security')} className={`w-full cursor-pointer mb-2 p-1 border-l-1 border-slate-100 ${currentTab === 'security'?'bg-gray-300 dark:bg-gray-800 dark:border-slate-500':''} `}>
              <div className="ml-2 flex flex-row justify-start items-center text-slate-900 dark:text-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fingerprint" viewBox="0 0 16 16">
                  <path d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z"/>
                  <path d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332q0 .613-.066 1.221A.5.5 0 0 1 6 8.447q.06-.555.06-1.115zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8m-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329"/>
                  <path d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334m.3 1.67a.5.5 0 0 1 .449.546 10.7 10.7 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.7 9.7 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z"/>
                  <path d="M3.902 4.222a5 5 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 4 4 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556m6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705M3.68 5.842a.5.5 0 0 1 .422.568q-.044.289-.044.59c0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.5 6.5 0 0 0 3.058 7q0-.375.054-.736a.5.5 0 0 1 .568-.422m8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.5 10.5 0 0 0 .584-2.678.5.5 0 0 1 .54-.456"/>
                  <path d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865m-.89 1.257a.5.5 0 0 1 .04.706A5.48 5.48 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346m12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49"/>
                </svg>
                <p className="ml-2 text-slate-900 dark:text-slate-100">Security</p>
              </div>    
            </div>
      </div>
    </>)
  }
  function RightPanel(){
    
    return(<>
      <div className='w-7/10 h-full flex flex-col justify-center items-center border-l-2 border-slate-500 ml-1'>
        {rightPanelComponents[currentTab]}
      </div>
    </>)
  }

  return (
    <>
    <div className='w-screen h-screen flex flex-col justify-center items-center relative bg-slate-200 dark:bg-gray-900'>
      <svg onClick={()=> navigate('/dashboard')} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left absolute top-5 left-5 text-slate-900 dark:text-slate-300 text-xl font-extrabold cursor-pointer" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg>
      <div className='w-7/10 h-8/10  flex flex-col border-2 rounded-lg border-slate-300 shadow-md dark:shadow-none dark:border-slate-800'>
        <UsernameHeader/>
        <div className='w-full h-full flex flex-row justify-between items-center bg-slate-200 dark:bg-gray-900 rounded-md'>
          <LeftPanel/>
          <RightPanel/>
        </div>
      </div>
      <div className='absolute bottom-0 w-screen flex flex-row justify-center items-center text-center'>
      </div>
    </div>
    </>
  )

}

export default Settings;






