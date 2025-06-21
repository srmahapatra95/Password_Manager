import {React ,useState, useContext, useEffect } from 'react'

import { Link, useNavigate } from 'react-router'
import { GlobalContext } from '../../../store';
import { register ,login} from '../../../store/actions/actions';
import getCookie from '../../../utils/utils'

function Auth() {

    const {authState, authDispatch} = useContext(GlobalContext);
    const {registerState, registerDispatch} = useContext(GlobalContext);
    const navigate = useNavigate();
    const [authChooser, setAuthChooser] = useState('login');

    useEffect(()=>{

        let ct = null
        async function get_csrf_token(){
            let data;
            const response = await fetch('http://localhost:8001/api/get-csrf/',{
            method:'GET',
            })
            data = await response.json()


            return data
        }
        get_csrf_token()

    },[])

    function handleChooseAuth(e, choice){
        setAuthChooser(choice)
    }


    function Login(){
        
        useEffect(() => {
            const token = localStorage.getItem('token')
            if(token != null){
                navigate('/dashboard')
            }
        }, [])

        const [loginForm, setLoginForm] = useState({
            username: '',
            password: ''
        })

        function handleFormChange(e, login_or_register, property){
            switch(login_or_register){
                case 'login':
                    setLoginForm((prevData) => ({
                        ...prevData, [property]: e.target.value
                    }))
                    break
                case 'register':
                    setRegisterForm((prevData) => ({
                        ...prevData, [property]: e.target.value
                    }))
                    break
            }
        }

        function handleLogin(e){
            const csrftoken = getCookie('csrftoken')
            const loginAction = login(authDispatch)
            loginAction(loginForm, csrftoken)

        }


        return (<>
        <div className='w-xs sm:w-full flex flex-col justify-center items-start p-2 rounded-md'>
            <h5 className='text-white font-bold text-3xl mb-6'>Log In</h5>
            <p className='text-white mb-2'>Create an Account, <button onClick={(e) => handleChooseAuth(e, 'register')} className='pointer my-1 border-0 text-indigo-500 hover:text-indigo-300 cursor-pointer'>Register</button> </p>
            <div class="relative z-0 w-full mb-5 group">
                <input value={loginForm.username} onChange={(e) => handleFormChange(e,'login', 'username')} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input value={loginForm.password} onChange={(e) => handleFormChange(e,'login', 'password')} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
            </div>
            <button onClick={(e) => handleLogin(e)} className="w-full text-white bg-violet-900 hover:bg-violet-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            <hr className=" w-full my-2 h-1 text-slate-400 rounded-sm dark:bg-gray-700"/>
        </div>
        </>)
    }
    function Register(){
        const [registerForm, setRegisterForm] = useState({
            username: '',
            password: '',
        })
        const [password2, setPassword2] = useState('')

        function handleFormChange(e, login_or_register, property){
            switch(login_or_register){
                case 'login':
                    setLoginForm((prevData) => ({
                        ...prevData, [property]: e.target.value
                    }))
                    break
                case 'register':
                    setRegisterForm((prevData) => ({
                        ...prevData, [property]: e.target.value
                    }))
                    break
            }
        }

        function handleRegister(e){
            if(registerForm.password == password2){
                const registerAction = register(registerDispatch)
                registerAction(registerForm)
            }else{
                alert('Not the same password')
            }
        }


        return(<>
        <div className='w-xs sm:w-full flex flex-col justify-center items-start p-2 rounded-md'>
            <h5 className='text-white font-bold text-3xl mb-6'>Register</h5>
            I<p className='text-white mb-2'>Have an Account,<button onClick={(e) => handleChooseAuth(e, 'login')} className='pointer my-1 border-0 text-indigo-500 hover:text-indigo-300 cursor-pointer'>Log In</button> </p>
            <div class="relative z-0 w-full mb-5 group">
                <input value={registerForm.username} onChange={(e) => handleFormChange(e,'register', 'username')} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input value={registerForm.password1} onChange={(e) => handleFormChange(e,'register', 'password')} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
            </div>
            <button onClick={(e) => handleRegister(e)} className="w-full text-white bg-violet-900 hover:bg-violet-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            <hr className=" w-full my-2 h-1 text-slate-400 rounded-sm dark:bg-gray-700"/>
        </div>
        </>)
    }


  return (
    <>
        {authChooser == 'login'?(<><Login/></>):(<><Register/></>)}
    </>
  )
}

export default Auth
