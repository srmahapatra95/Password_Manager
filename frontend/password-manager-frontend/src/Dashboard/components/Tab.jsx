import {React ,useState ,useContext, useEffect} from 'react'
import { GlobalContext } from '../../../store';
import TabContent from './TabContent';

function Tab() {
    const { tabState, tabDispatch } = useContext(GlobalContext);
    const { authState, authDispatch } = useContext(GlobalContext);
    const {screenState,screenDispatch} = useContext(GlobalContext)

    const {
        id, setId,
        user, setUser,
        details_for, setDetails_for,
        username, setUsername,
        email, setEmail,
        mobile, setMobile,
        password, setPassword,
        info, setInfo
    } = useContext(GlobalContext);

    useEffect(()=>{

    },[tabState.buttonList])


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

    function TabButton({ data }) {
        const isActiveTab = tabState.activeTab.length > 0 && tabState.activeTab[tabState.activeTab.length - 1].id === data.id;
        
        function handleTabClick(e) {
            e.preventDefault();
            


            if (!isActiveTab) {
                // Perform state updates synchronously
                tabDispatch({ type: 'UPDATE_ACTIVE_TAB', payload: data });
                updateTabData(data);
                screenDispatch({ type: 'DISABLE', payload: false });
                screenDispatch({type: 'DISABLE_TAB_SCREEN', payload: false})

            }
        }

        function handleCloseTab(e) {
            const currentTabIndex = tabState.activeTab.findIndex(tab => tab.id === data.id);
            const last_index = tabState.activeTab.length-1;

            screenDispatch({ type: 'DISABLE', payload: false });
            screenDispatch({type: 'DISABLE_TAB_SCREEN', payload: false})
            
            if (isActiveTab && currentTabIndex > 0) {
                const prevTab = tabState.activeTab[currentTabIndex - 1];
                tabDispatch({ type: 'UPDATE_ACTIVE_TAB', payload: prevTab });
                updateTabData(prevTab);
            }

            // Then remove the tab
            tabDispatch({ type: "REMOVE_TAB", payload: data });

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
        }

        return (
            <div className={`w-20/100 h-98/100 p-2 border-b-3 flex flex-row justify-between items-center cursor-pointer ${isActiveTab ? 'bg-slate-300 dark:bg-slate-600 border-t-3 rounded-t-md text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-400 dark:border-slate-600 border-slate-300'}`}>
                <div onClick={handleTabClick} className="w-full h-full p-1 flex flex-row items-center" title={data.name}>
                    <p className='mx-2'>{data.details_for.length > 8 ? data.details_for.slice(0,6)+'...': data.details_for}</p>
                </div>
                <button onClick={handleCloseTab} className="hover:bg-rose-50 hover:text-black rounded-full cursor-pointer" title="Close tab">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
        );
    }

    const buttonList = tabState.tabButtonList.map((item, index) => (
        <TabButton key={item.id} data={item} index={index} />
    ));

  return (
    <>
    <div className='flex flex-col justify-center items-center w-98/100 h-98/100'>
        {buttonList.length !== 0?(<>

            <div id='tab-buttons' className='w-full h-1/10 flex-flex-row'>
                {buttonList.length > 0 && (
                    <div className="flex flex-row h-full items-center overflow-x-auto no-scrollbar">{buttonList}</div>
                )}
            </div>
            <div id='tab-content' className='w-full h-9/10 bg-gray-200 dark:bg-gray-900'>
                {tabState.tabContentList.length > 0 && (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800">
                        <TabContent />
                    </div>
                )}   
            </div>

        </>):(<>
            <div className='w-full h-full flex flex-col items-center justify-center border-4 border-slate-300 dark:border-slate-800 rounded-md'>
                <p className='text-xl text-bold text-slate-900 dark:text-slate-300 font-mono'>
                    Your Data Will Be Displayed Here.
                </p>
            </div>
        </>)}
        
    </div>
    </>
  )
}

export default Tab;
