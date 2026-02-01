import {React ,useRef,useState, useEffect,useContext} from 'react'
import { GlobalContext } from '../../../store';
import { logout } from '../../../store/actions/actions';
import { useNavigate } from 'react-router-dom';
import { lock_unlock } from '../../../store/actions/actions';
import { MoreVertical, PlusSquare, Trash2, Settings, LogOut, Lock, ShieldCheck } from 'lucide-react'

function NavBar({lock, setLock}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleToggleDropDown = () => {
      setIsOpen(!isOpen)
  }
  const {lockScreenState, lockScreenDispatch} = useContext(GlobalContext)

  function DropDown(){
    const ref = useRef(null);
    const {screenState,screenDispatch} = useContext(GlobalContext)
    const {authState, authDispatch} = useContext(GlobalContext)
    const {tabState, tabDispatch} = useContext(GlobalContext)
    const {listViewState, listViewDispatch} = useContext(GlobalContext)

        useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);

    function handleAddData(){
      setIsOpen(false);
      screenDispatch({type:'SHOW_SCREEN', payload: 'add-data'})
    }

    function navigateToSettings(){
      navigate('/settings')
    }

    function handleDeleteData(){
      setIsOpen(false);
      screenDispatch({type:'SHOW_SCREEN', payload: 'delete-data'})
    }
    function handleLogout(){
      const token = localStorage.getItem('token')
      const logoutAction = logout();
      logoutAction(token)
      authDispatch({type:"LOGOUT"})
      tabDispatch({type:"LOGOUT"})
      screenDispatch({type:"LOGOUT"})
      listViewDispatch({type:"LOGOUT"})
      setIsOpen(false);
      localStorage.clear()
      window.location.reload()
    }


    return(<>
          <div ref={ref} id="dropdown" className="z-10 absolute right-1 top-full mt-2 bg-stone-50 dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-52 overflow-hidden">
              <ul className="py-1 flex flex-col text-sm text-gray-700 dark:text-gray-200">
                <li onClick={handleAddData} className='flex flex-row items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors'>
                    <PlusSquare className='w-4 h-4 text-indigo-500' />
                    <span className="font-medium">Add Data</span>
                </li>
                <li onClick={handleDeleteData} className='flex flex-row items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors'>
                    <Trash2 className='w-4 h-4 text-rose-500' />
                    <span className="font-medium">Delete Data</span>
                </li>
                <div className='mx-3 h-px bg-gray-200 dark:bg-gray-700'></div>
                <li onClick={navigateToSettings} className='flex flex-row items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors'>
                    <Settings className='w-4 h-4 text-gray-500' />
                    <span className="font-medium">Settings</span>
                </li>
                <li onClick={handleLogout} className='flex flex-row items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors'>
                    <LogOut className='w-4 h-4 text-gray-500' />
                    <span className="font-medium">Log Out</span>
                </li>
              </ul>
          </div>
    </>)
  }

  function handleSetLock(){
    const setLockAction = lock_unlock()
    const data = {
      lock_screen_status: !lock
    }
    setLockAction(data)
    setLock({type: 'LOCK'})
  }

  return (
    <>
    <div className='bg-stone-50 dark:bg-gray-900 shadow-sm dark:shadow-none border-b border-gray-200 dark:border-gray-800 px-6 py-2 flex flex-row justify-between items-center'>
        <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center'>
                <ShieldCheck className='w-5 h-5 text-indigo-500' />
            </div>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100 text-lg tracking-tight'>Password Manager</h3>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='flex flex-row items-center justify-center'>
            {lockScreenState.lockScreen_On_Off ? (<>
                <button onClick={handleSetLock} className='text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2.5 flex justify-center items-center rounded-xl cursor-pointer transition-colors'>
                  <Lock className='w-4 h-4' />
                </button>
            </>):(<>
                <div className='p-2.5'>
                  <Lock className='w-4 h-4 text-gray-400 dark:text-gray-600' />
                </div>
            </>)}
          </div>
          <div className='relative cursor-pointer flex flex-row'>
              <button onClick={handleToggleDropDown} type="button" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2.5 flex justify-center items-center rounded-xl cursor-pointer transition-colors">
                <MoreVertical className='w-4 h-4' />
              </button>
              {isOpen ? (<><DropDown/></>):(<></>)}
          </div>
        </div>
    </div>
    </>
  )
}

export default NavBar;
