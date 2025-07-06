import React, {useContext, useEffect, useState} from "react";
import TabContentScreen from "./TabContentScreen";
import { GlobalContext } from "../../../store";
import { delete_data, patch_update_data } from "../../../store/actions/actions";
import { useToast } from "../../../hooks/useToast";

function TabContent(){
    const [chooseTabContentScreen, setChooseTabContentScreen] = useState('show')
    const [showPassword, setShowPassword] = useState(false);
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
        // Add update logic here
        const updateAction = patch_update_data(setStateFunc,id);
        updateAction(data, token)

        tabDispatch({type: 'UPDATE_CONTENT', payload: {id:id,user:user, details_for:details_for, username:username, email:email, mobile:mobile ,password:password, info:info}})
        listViewDispatch({type: 'UPDATE_ITEM', payload: {id:id,user:user, details_for:details_for, username:username, email:email, mobile:mobile ,password:password, info:info}})

        //setDetails_for(details_for)
        //setUsername(username)
        //setEmail(email)
        //setMobile(mobile)
        //setPassword(password)
        //setInfo(info)
    }
    function handleUpdatesAfterSuccessfulDelete(){
        const isActiveTab = tabState.activeTab.length > 0 && tabState.activeTab[tabState.activeTab.length - 1].id === id;

        const currentTabIndex = tabState.activeTab.findIndex(tab => tab.id === id);
        const last_index = tabState.activeTab.length-1;

        
        // If we're closing the active tab, switch to the previous tab first
        if (isActiveTab && currentTabIndex > 0) {
            const prevTab = tabState.activeTab[currentTabIndex - 1];
            tabDispatch({ type: 'UPDATE_ACTIVE_TAB', payload: prevTab });
            updateTabData(prevTab);
        }


        // If this was the last tab, clear the form
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

    return (
        <> 
        <div className="w-full p-2 h-full flex flex-col relative">
            <div className="w-full h-9/10 flex flex-col justify-center p-2">

                <div className="">
                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-white">Details For</label>
                    <input type="text" value={details_for} onChange={(e) => setDetails_for(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                
                <div className="">
                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                </div>
                
                <div className="">
                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                
                
                <div className="">
                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                

                <div className="">
                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <div className="relative">
                        {screenState.enablePasswordChange ? (
                            <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        ) : (
                            <input 
                                className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                disabled
                            />
                        )}
                    <div className="flex flex-row absolute top-0 right-0">
                        <button onClick={handleDecryptPassword} className="flex flex-row items-center justify-start cursor-pointer p-2 mx-1 text-slate-900 dark:text-slate-100 rounded-md hover:bg-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                            
                        </button>
                        <button onClick={handleEnablePasswordChange} 
                        className=" cursor-pointer p-2 text-slate-900 dark:text-slate-100 rounded-md  hover:bg-slate-500">
                            Change
                        </button>
                    </div>

                    </div>
                </div>
                
                <div className="">
                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-white">Info</label>
                    <input type="text" value={info} onChange={(e) => setInfo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
            </div>
            
            <div className="w-full h-1/10 flex flex-row justify-end p-2">
                <button onClick={handleSave} className="cursor-pointer flex flex-row justify-between items-center p-2 border-2 border-gray-900 dark:border-white mx-1 text-slate-900 dark:text-slate-100 rounded-md hover:bg-slate-500 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy mx-1" viewBox="0 0 16 16">
                    <path d="M11 2H9v3h2z"/>
                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                    </svg>
                  <p>Save</p>
                </button>
                <button onClick={handleDelete} className="cursor-pointer flex flex-row justify-between items-center p-2 border-2 border-red-800 mx-1 text-rose-500 hover:text-slate-100 rounded-md hover:bg-rose-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                  <p>Delete</p>
                </button>
            </div>
             {screenState.showTabContentScreen ? (
                <TabContentScreen 
                    chooseTabContentScreen={chooseTabContentScreen} 
                    setChooseTabContentScreen={setChooseTabContentScreen}
                    setShowPassword={setShowPassword}
                />
            ) : (<></>)}    

        </div>
        </>
    )
}

export default TabContent;
