import {React ,useState, useContext } from 'react'

import { Link, useNavigate } from 'react-router'
import { GlobalContext } from '../../../store';
import { register ,login} from '../../../store/actions/actions';
import { useToast } from '../../../hooks/useToast';
import { LogIn, UserPlus, User, Lock, Mail } from 'lucide-react'

function Auth() {

    const {authState, authDispatch} = useContext(GlobalContext);
    const {registerState, registerDispatch} = useContext(GlobalContext);
    const navigate = useNavigate();
    const [authChooser, setAuthChooser] = useState('login');
    const toast = useToast();

    function handleChooseAuth(e, choice){
        setAuthChooser(choice)
    }


    function Login(){


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
            const loginAction = login(authDispatch, navigate,toast)
            loginAction(loginForm)

        }


        return (<>
        <div className='w-xs sm:w-full flex flex-col justify-center items-start p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'>
            <div className='flex items-center gap-3 mb-8'>
                <div className='w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center'>
                    <LogIn className='w-5 h-5 text-indigo-400' />
                </div>
                <h5 className='text-white font-bold text-2xl'>Log In</h5>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-4 h-4 text-gray-500" />
                </div>
                <input value={loginForm.username} onChange={(e) => handleFormChange(e,'login', 'username')} type="email" name="floating_email" id="floating_email" className="block w-full pl-10 py-3 text-sm text-white bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" placeholder="Username" required />
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <input value={loginForm.password} onChange={(e) => handleFormChange(e,'login', 'password')} type="password" name="floating_password" id="floating_password" className="block w-full pl-10 py-3 text-sm text-white bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" placeholder="Password" required />
            </div>
            <button onClick={(e) => handleLogin(e)} className="w-full flex items-center justify-center gap-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm px-5 py-3 text-center cursor-pointer transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40">
                <LogIn className='w-4 h-4' />
                Sign In
            </button>
            <div className='w-full flex items-center gap-3 my-5'>
                <div className='flex-1 h-px bg-gray-700'></div>
                <span className='text-gray-500 text-xs uppercase tracking-wider'>or</span>
                <div className='flex-1 h-px bg-gray-700'></div>
            </div>
            <p className='text-gray-400 text-sm'>Don't have an account? <button onClick={(e) => handleChooseAuth(e, 'register')} className='text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium transition-colors'>Register</button></p>
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
                const registerAction = register(registerDispatch, toast)
                registerAction(registerForm)
            }else{
                toast.error('The two passwords didnot match...')
            }
        }


        return(<>
        <div className='w-xs sm:w-full flex flex-col justify-center items-start p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'>
            <div className='flex items-center gap-3 mb-8'>
                <div className='w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center'>
                    <UserPlus className='w-5 h-5 text-emerald-400' />
                </div>
                <h5 className='text-white font-bold text-2xl'>Register</h5>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-4 h-4 text-gray-500" />
                </div>
                <input value={registerForm.username} onChange={(e) => handleFormChange(e,'register', 'username')} type="email" className="block w-full pl-10 py-3 text-sm text-white bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 transition-all" placeholder="Username" required />
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <input value={registerForm.password1} onChange={(e) => handleFormChange(e,'register', 'password')} type="password" className="block w-full pl-10 py-3 text-sm text-white bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 transition-all" placeholder="Password" required />
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" className="block w-full pl-10 py-3 text-sm text-white bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 transition-all" placeholder="Confirm Password" required />
            </div>
            <button onClick={(e) => handleRegister(e)} className="w-full flex items-center justify-center gap-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm px-5 py-3 text-center cursor-pointer transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40">
                <UserPlus className='w-4 h-4' />
                Create Account
            </button>
            <div className='w-full flex items-center gap-3 my-5'>
                <div className='flex-1 h-px bg-gray-700'></div>
                <span className='text-gray-500 text-xs uppercase tracking-wider'>or</span>
                <div className='flex-1 h-px bg-gray-700'></div>
            </div>
            <p className='text-gray-400 text-sm'>Already have an account? <button onClick={(e) => handleChooseAuth(e, 'login')} className='text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium transition-colors'>Log In</button></p>
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
