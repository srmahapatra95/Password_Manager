import React, {useContext, useState} from "react";
import TabContentScreen from "./TabContentScreen";
import { GlobalContext } from "../../../store";
import { delete_data, patch_update_data } from "../../../store/actions/actions";

function TabContent(){
    const [chooseTabContentScreen, setChooseTabContentScreen] = useState('show')
    const [showPassword, setShowPassword] = useState(false);
    const {tabState, tabDispatch} = useContext(GlobalContext)    
    const {screenState, screenDispatch} = useContext(GlobalContext)    
    const {authState, authDispatch} = useContext(GlobalContext)
    const {listViewState, listViewDispatch} = useContext(GlobalContext);
    const {id, setId, user, setUser, details_for, setDetails_for, username, setUsername, email, setEmail, mobile, setMobile ,password, setPassword, info, setInfo} = useContext(GlobalContext)

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
        const deleteAction = delete_data(handleUpdatesAfterSuccessfulDelete, id)
        deleteAction(token)
        
    }

    return (
        <> 
        <div className="w-98/100 p-2 h-full flex flex-col relative">
            <div className="w-full h-9/10 flex flex-col justify-center p-2">

                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details For</label>
                    <input type="text" value={details_for} onChange={(e) => setDetails_for(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                
                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                </div>
                
                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                
                
                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                

                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <div className="">
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
                    </div>
                    <div className="flex flex-row pt-2">
                        <button onClick={handleDecryptPassword} className="flex flex-row items-center justify-start cursor-pointer p-2 border-2 border-white mx-1 text-slate-100 rounded-md hover:bg-slate-500">
                            {!showPassword?(<>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                            </>):(<>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                </svg>
                            </>)}

                            
                        </button>
                        <button onClick={handleEnablePasswordChange} className=" cursor-pointer p-2 border-2 border-white mx-1 text-slate-100 rounded-md  hover:bg-slate-500">
                            Change
                        </button>
                    </div>
                </div>
                
                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Info</label>
                    <input type="text" value={info} onChange={(e) => setInfo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
            </div>
            
            <div className="w-full h-1/10 flex flex-row justify-end p-2">
                <button onClick={handleSave} className="cursor-pointer p-2 border-2 border-white mx-1 text-slate-100 rounded-md hover:bg-slate-500">
                  Save
                </button>
                <button onClick={handleDelete} className="cursor-pointer p-2 border-2 border-red-800 mx-1 text-rose-500 hover:text-slate-100 rounded-md hover:bg-rose-500">
                  Delete
                </button>
            </div>
             {screenState.showTabContentScreen ? (
                <TabContentScreen 
                    chooseTabContentScreen={chooseTabContentScreen} 
                    setChooseTabContentScreen={setChooseTabContentScreen}
                />
            ) : (<></>)}    

        </div>
        </>
    )
}

export default TabContent;
