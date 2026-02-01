import React, {useContext, useEffect, useState} from "react";
import TabContentScreen from "./TabContentScreen";
import { GlobalContext } from "../../../store";
import { delete_data, patch_update_data } from "../../../store/actions/actions";
import { useToast } from "../../../hooks/useToast";
import { Save, Trash2, Eye, Pencil, User, Mail, Phone, KeyRound, FileText, Tag } from 'lucide-react'
import KeyModal from './KeyModal'

function TabContent(){
    const [chooseTabContentScreen, setChooseTabContentScreen] = useState('show')
    const [showPassword, setShowPassword] = useState(false);
    const [modalKey, setModalKey] = useState(null)
    const {tabState, tabDispatch} = useContext(GlobalContext)
    const {screenState, screenDispatch} = useContext(GlobalContext)
    const {authState, authDispatch} = useContext(GlobalContext)
    const {listViewState, listViewDispatch} = useContext(GlobalContext);
    const {id, setId, user, setUser, details_for, setDetails_for, username, setUsername, email, setEmail, mobile, setMobile ,password, setPassword, info, setInfo} = useContext(GlobalContext)
    const toast = useToast();

    const [currentData, setCurrentData] = useState({
        details_for: details_for,
        username:username,
        email: email,
        mobile: mobile,
        password: password,
        info:info
    })
    let last = tabState.activeTab.length - 1


    function handleDecryptPassword(){
        setChooseTabContentScreen('show')
        screenDispatch({type:'ENABLE_TAB_SCREEN', payload: true})
    }

    function handleEnablePasswordChange(){
        setChooseTabContentScreen('change')
        screenDispatch({type:'ENABLE_TAB_SCREEN', payload: true})
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    const updateTabData = (data) => {
        setId(data.id)
        setUser(data.user)
        setDetails_for(data.details_for)
        setUsername(data.username)
        setEmail(data.email)
        setMobile(data.mobile)
        setPassword(data.password)
        setInfo(data.info)
};

    function handleSave(){
        setId(id)
        setUser(user)

        const token = localStorage.getItem('token');
        let data = {}
        let setStateFunc = {}


        if(currentData.details_for !== details_for){
            data['details_for']=details_for
            setStateFunc['details_for']=setDetails_for


        }
        if(currentData.username !== username){
                data['username']=username
                setStateFunc['username']=setUsername

        }
        if(currentData.email !== email){

            data['email']=email
            setStateFunc['email']=setEmail

        }
        if(currentData.mobile !== mobile){
            data['mobile']=mobile
            setStateFunc['mobile']=setMobile

        }
        if(currentData.password !== password){
            data['password'] = password
            setStateFunc['password'] = setPassword
        }
        if(currentData.info !== info){
            data['info']=info
            setStateFunc['info']=setInfo

        }
        const updateAction = patch_update_data(setStateFunc,id, null, setModalKey);
        updateAction(data, token)

        tabDispatch({type: 'UPDATE_CONTENT', payload: {id:id,user:user, details_for:details_for, username:username, email:email, mobile:mobile ,password:password, info:info}})
        listViewDispatch({type: 'UPDATE_ITEM', payload: {id:id,user:user, details_for:details_for, username:username, email:email, mobile:mobile ,password:password, info:info}})
    }
    function handleUpdatesAfterSuccessfulDelete(){
        const isActiveTab = tabState.activeTab.length > 0 && tabState.activeTab[tabState.activeTab.length - 1].id === id;

        const currentTabIndex = tabState.activeTab.findIndex(tab => tab.id === id);
        const last_index = tabState.activeTab.length-1;


        if (isActiveTab && currentTabIndex > 0) {
            const prevTab = tabState.activeTab[currentTabIndex - 1];
            tabDispatch({ type: 'UPDATE_ACTIVE_TAB', payload: prevTab });
            updateTabData(prevTab);
        }


        if (tabState.activeTab.length <= 1) {
        setId("")
        setUser("")
        setDetails_for("")
        setUsername("")
        setEmail("")
        setMobile("")
        setPassword("")
        setInfo("")
        }
        tabDispatch({type: 'REMOVE_TAB', payload: {id:id,user:user, details_for:details_for, username:username, email:email, mobile:mobile ,password:password, info:info}})
        listViewDispatch({type: 'REMOVE_ITEM', payload: {id:id,user:user, details_for:details_for, username:username, email:email, mobile:mobile ,password:password, info:info}})
    }
    function handleDelete(){
        const token = localStorage.getItem('token');
        const deleteAction = delete_data(handleUpdatesAfterSuccessfulDelete, id, toast)
        deleteAction(token)

    }

    const inputClass = "bg-transparent border-0 text-gray-900 text-base focus:ring-0 focus:outline-none block w-full py-1.5 dark:text-white placeholder-gray-400"
    const cardClass = "flex items-center gap-3 px-4 py-4 rounded-xl bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all"

    return (
        <>
        <div className="w-full h-full flex flex-col relative">
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 flex flex-col">

                <div className="flex flex-col gap-4 flex-1">
                    <div className={cardClass}>
                        <Tag className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details For</label>
                            <input type="text" value={details_for} onChange={(e) => setDetails_for(e.target.value)} className={inputClass}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={cardClass}>
                            <User className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass}/>
                            </div>
                        </div>

                        <div className={cardClass}>
                            <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass}/>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={cardClass}>
                            <Phone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mobile</label>
                                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className={inputClass}/>
                            </div>
                        </div>

                        <div className={cardClass}>
                            <KeyRound className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Password</label>
                                <div className="flex items-center">
                                    {screenState.enablePasswordChange ? (
                                        <input
                                            className={inputClass}
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            className={`${inputClass} text-gray-400 dark:text-gray-500`}
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            disabled
                                        />
                                    )}
                                    <div className="flex flex-shrink-0 gap-0.5">
                                        <button onClick={handleDecryptPassword} className="flex items-center justify-center cursor-pointer p-1 text-gray-400 dark:text-gray-500 rounded hover:text-indigo-500 transition-colors" title="Decrypt password">
                                            <Eye className='w-3.5 h-3.5' />
                                        </button>
                                        <button onClick={handleEnablePasswordChange} className="flex items-center justify-center cursor-pointer p-1 text-gray-400 dark:text-gray-500 rounded hover:text-indigo-500 transition-colors" title="Change password">
                                            <Pencil className='w-3.5 h-3.5' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 px-4 py-4 rounded-xl bg-stone-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all flex-1">
                        <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1.5" />
                        <div className="flex-1 h-full flex flex-col">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Info</label>
                            <textarea value={info} onChange={(e) => setInfo(e.target.value)} className="bg-transparent border-0 text-gray-900 text-base focus:ring-0 focus:outline-none block w-full py-1.5 dark:text-white placeholder-gray-400 resize-none flex-1" placeholder="Additional notes..."/>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex-shrink-0 flex flex-row justify-end items-center gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <button onClick={handleDelete} className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                    <Trash2 className='w-4 h-4' />
                    <span>Delete</span>
                </button>
                <button onClick={handleSave} className="cursor-pointer flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all shadow-sm shadow-indigo-500/20 hover:shadow-indigo-500/40">
                    <Save className='w-4 h-4' />
                    <span>Save</span>
                </button>
            </div>
             {screenState.showTabContentScreen ? (
                <TabContentScreen
                    chooseTabContentScreen={chooseTabContentScreen}
                    setChooseTabContentScreen={setChooseTabContentScreen}
                    setShowPassword={setShowPassword}
                />
            ) : (<></>)}
            {modalKey && <KeyModal keyValue={modalKey} onClose={() => setModalKey(null)} />}

        </div>
        </>
    )
}

export default TabContent;
