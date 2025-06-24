import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";
import { add_data } from "../../../store/actions/actions";

function AddData({chooseTabContentScreen, setChooseTabContentScreen}){
    const {screenState, screenDispatch} = useContext(GlobalContext)
    const {authState, authDispatch} = useContext(GlobalContext)
    const {listViewState, listViewDispatch} = useContext(GlobalContext);
    const [details_for, setDetails_for] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [info, setInfo] = useState('')

    console.log("The auth state is : ", authState)

    function handleAddDataSubmit(){
        console.log("clicked submit")
        if(password !== '' && password2 !== ''){
            if(password == password2){
                let data = {
                        user:authState.id,
                        details_for:details_for,
                        username:username,
                        email:email,
                        mobile:mobile,
                        password:password,
                        info:info,
                }
                const token = localStorage.getItem('token')
                const addDataAction = add_data(listViewDispatch)
                addDataAction(data, token)
            }else{
                alert('Password didnot match')
            }
        }
        setDetails_for('')
        setUsername('')
        setEmail('')
        setMobile('')
        setPassword('')
        setPassword2('')
        setInfo('')
        document.getElementById('close-screen-btn').click();

    }

    return (
        <div className="w-6/10 flex flex-col p-3">

            <div class="mb-3">
                <label for="details-for" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detail For </label>
                <input value={details_for} onChange={(e)=>setDetails_for(e.target.value)} id="details-for" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div> 
            <div class="mb-3">
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div> 
                <div class="mb-3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div> 
            <div class="mb-3">
                <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                <input value={mobile} onChange={(e)=>setMobile(e.target.value)} id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div> 
            <div class="mb-3">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div> 
            <div class="mb-3">
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input value={password2} onChange={(e)=>setPassword2(e.target.value)} id="confirm-password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div> 
            <div class="mb-3">
                <label for="info" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Info</label>
                <input value={info} onChange={(e)=>setInfo(e.target.value)} id="info" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
            </div> 

            <button onClick={handleAddDataSubmit} class="cursor-pointer text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>


        </div>
    )
}

export default AddData;