import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";
import { add_data } from "../../../store/actions/actions";
import { useToast } from '../../../hooks/useToast';
import { PlusCircle, Tag, User, Mail, Phone, KeyRound, FileText } from 'lucide-react'
import KeyModal from './KeyModal'

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
    const [modalKey, setModalKey] = useState(null)
    const toast = useToast();


    function handleAddDataSubmit(){
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
                const addDataAction = add_data(listViewDispatch, toast, setModalKey)
                addDataAction(data, token)
            }else{
                toast.error('Passwords didnot match')
            }
        }
        setDetails_for('')
        setUsername('')
        setEmail('')
        setMobile('')
        setPassword('')
        setPassword2('')
        setInfo('')

    }

    const inputClass = "bg-transparent border-0 text-gray-900 text-base focus:ring-0 focus:outline-none block w-full py-1.5 dark:text-white placeholder-gray-400"
    const cardClass = "flex items-center gap-3 px-4 py-3.5 rounded-xl bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all"
    const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"

    return (
        <div className="w-7/10 flex flex-col p-6 bg-stone-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className='flex items-center gap-3 mb-5'>
                <div className='w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center'>
                    <PlusCircle className='w-5 h-5 text-indigo-500' />
                </div>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Add New Entry</h2>
            </div>

            <div className="flex flex-col gap-3">
                <div className={cardClass}>
                    <Tag className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <div className="flex-1">
                        <label className={labelClass}>Details For</label>
                        <input value={details_for} onChange={(e)=>setDetails_for(e.target.value)} className={inputClass} placeholder="e.g. GitHub, Gmail..." />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className={cardClass}>
                        <User className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <label className={labelClass}>Username</label>
                            <input value={username} onChange={(e)=>setUsername(e.target.value)} className={inputClass} placeholder="Enter username" />
                        </div>
                    </div>

                    <div className={cardClass}>
                        <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <label className={labelClass}>Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} className={inputClass} placeholder="Enter email" />
                        </div>
                    </div>
                </div>

                <div className={cardClass}>
                    <Phone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <div className="flex-1">
                        <label className={labelClass}>Mobile</label>
                        <input value={mobile} onChange={(e)=>setMobile(e.target.value)} className={inputClass} placeholder="Enter mobile" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className={cardClass}>
                        <KeyRound className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <label className={labelClass}>Password</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} className={inputClass} placeholder="Enter password" type="password" />
                        </div>
                    </div>

                    <div className={cardClass}>
                        <KeyRound className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <label className={labelClass}>Confirm Password</label>
                            <input value={password2} onChange={(e)=>setPassword2(e.target.value)} className={inputClass} placeholder="Confirm password" type="password" />
                        </div>
                    </div>
                </div>

                <div className={cardClass}>
                    <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <div className="flex-1">
                        <label className={labelClass}>Info</label>
                        <textarea value={info} onChange={(e)=>setInfo(e.target.value)} className="bg-transparent border-0 text-gray-900 text-base focus:ring-0 focus:outline-none block w-full py-1.5 dark:text-white placeholder-gray-400 resize-none" rows={2} placeholder="Additional notes..." />
                    </div>
                </div>
            </div>

            <button onClick={handleAddDataSubmit} className="mt-5 cursor-pointer flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl text-sm w-full py-3 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40">
                <PlusCircle className='w-4 h-4' />
                Add Entry
            </button>
            {modalKey && <KeyModal keyValue={modalKey} onClose={() => { setModalKey(null); document.getElementById('close-screen-btn').click(); }} />}
        </div>
    )
}

export default AddData;
