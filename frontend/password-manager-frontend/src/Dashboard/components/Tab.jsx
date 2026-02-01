import {React ,useState ,useContext, useEffect} from 'react'
import { GlobalContext } from '../../../store';
import TabContent from './TabContent';
import { X, Database, KeyRound } from 'lucide-react'

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

            tabDispatch({ type: "REMOVE_TAB", payload: data });

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
            <div className={`min-w-[140px] max-w-[200px] px-3 py-2.5 flex flex-row items-center cursor-pointer text-sm transition-all duration-200 rounded-t-xl ${isActiveTab ? 'bg-stone-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 ring-b-0' : 'bg-slate-200/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
                <div onClick={handleTabClick} className="flex flex-row items-center gap-2 flex-1 min-w-0" title={data.details_for}>
                    <KeyRound className={`w-3.5 h-3.5 flex-shrink-0 ${isActiveTab ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-600'}`} />
                    <p className='truncate font-bold text-sm text-gray-500 dark:text-gray-400 tracking-wider'>{data.details_for.length > 12 ? data.details_for.slice(0,10)+'...' : data.details_for}</p>
                </div>
                <button onClick={handleCloseTab} className="ml-1.5 p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-500 cursor-pointer transition-colors flex-shrink-0 opacity-60 hover:opacity-100" title="Close tab">
                    <X className='w-3 h-3' />
                </button>
            </div>
        );
    }

    const buttonList = tabState.tabButtonList.map((item, index) => (
        <TabButton key={item.id} data={item} index={index} />
    ));

  return (
    <>
    <div className='flex flex-col w-full h-full'>
        {buttonList.length !== 0?(<>

            <div id='tab-buttons' className='w-full bg-stone-100 dark:bg-gray-900 rounded-t-xl border border-b-0 border-gray-200 dark:border-gray-700 flex-shrink-0'>
                {buttonList.length > 0 && (
                    <div className="flex flex-row h-full items-end overflow-x-auto no-scrollbar gap-1 px-2 pt-2">{buttonList}</div>
                )}
            </div>
            <div id='tab-content' className='w-full flex-1 min-h-0 bg-stone-50 dark:bg-gray-800 rounded-b-xl border border-t-0 border-gray-200 dark:border-gray-700 shadow-sm'>
                {tabState.tabContentList.length > 0 && (
                    <div className="w-full h-full">
                        <TabContent />
                    </div>
                )}
            </div>

        </>):(<>
            <div className='w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50'>
                <Database className='w-12 h-12 text-gray-300 dark:text-gray-700 mb-3' />
                <p className='text-base text-gray-400 dark:text-gray-600 font-medium'>
                    Your Data Will Be Displayed Here
                </p>
                <p className='text-sm text-gray-300 dark:text-gray-700 mt-1'>
                    Select an item from the list to get started
                </p>
            </div>
        </>)}

    </div>
    </>
  )
}

export default Tab;
