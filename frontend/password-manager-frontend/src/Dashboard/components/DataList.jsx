  import {React ,useState,useContext, useEffect } from 'react'
  import { GlobalContext } from '../../../store';
  import { fetchdatalist } from '../../../store/actions/actions';
  import { useToast } from '../../../hooks/useToast';
  import { Search, KeyRound } from 'lucide-react'

  function DataList(){

    const {listViewState, listViewDispatch} = useContext(GlobalContext);
    const {authState,authDispatch} = useContext(GlobalContext)
    const {tabState, tabDispatch} = useContext(GlobalContext)
    const {screenState,screenDispatch} = useContext(GlobalContext)
    const [filterText, setFilterText] = useState('')
    const toast = useToast();

    const {id, setId, user, setUser, details_for, setDetails_for, username, setUsername,email,setEmail, mobile,setMobile, password, setPassword, info, setInfo} = useContext(GlobalContext)

    useEffect(() => {

        const token = localStorage.getItem('token')
        const fetchData = fetchdatalist(listViewDispatch, toast);
        fetchData(token)
    },[])


    function handleOpenTab(data){
        screenDispatch({type: 'DISABLE_TAB_SCREEN', payload: false})
        let isPresent = tabState.tabButtonList.filter((item) => item.id == data.id)
        if(isPresent.length > 0){

        }else{
            setId(data.id)
            setUser(data.user)
            setDetails_for(data.details_for)
            setUsername(data.username)
            setEmail(data.email)
            setMobile(data.mobile)
            setPassword(data.password)
            setInfo(data.info)
                screenDispatch({ type: 'DISABLE', payload: false });
                screenDispatch({type: 'DISABLE_TAB_SCREEN', payload: false})
            tabDispatch({type:'ADD_TAB', payload: data})
        }
    }

    function ListItem({data}){
        return(
            <div className="p-0.5 cursor-pointer">
                <div onClick={() => handleOpenTab(data)} className="w-full p-3 flex items-center gap-3 rounded-xl bg-stone-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-gray-800 border border-transparent hover:border-indigo-200 dark:hover:border-gray-700 transition-all group">
                    <div className='w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0'>
                        <KeyRound className='w-4 h-4 text-indigo-500' />
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{data.details_for}</p>
                </div>
            </div>
        )
    }

    function FilteredListItem(){


        const items = listViewState.itemslist || [];
        let filteredItems = items.filter((item) => {
           if(item.details_for.toLowerCase().includes(filterText.toLowerCase())){
            return item
           }
        })

        let viewitems = filteredItems.map((value, index) => {
            return <ListItem key={index} data={value}/>
        })

        return(
            <>
                {items.length !== 0 ?
                    (<>{viewitems}</>) :
                    (
                        <div className="text-gray-400 dark:text-gray-500 flex flex-col items-center justify-center py-8 gap-2">
                            <KeyRound className='w-8 h-8 opacity-50' />
                            <p className='text-sm'>No items to display</p>
                        </div>
                    )
                }
            </>
        )
    }

    return(<>
    <div className="w-full my-0 h-7/10 flex flex-col bg-stone-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none overflow-hidden">
        <div className="relative p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
                <Search className='w-4 h-4 text-gray-400' />
            </div>
            <input type="text" value={filterText} onChange={(e) => setFilterText(e.target.value)} className="w-full pl-10 py-2.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" placeholder="Search passwords..." />
        </div>
        <div className='p-2 overflow-y-auto no-scrollbar flex flex-col gap-1'>
            <FilteredListItem/>
        </div>
    </div>


    </>)
  }
  export default DataList;
