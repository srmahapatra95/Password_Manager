  import {React ,useState,useContext, useEffect } from 'react'
  import { GlobalContext } from '../../../store';
  import { fetchdatalist } from '../../../store/actions/actions';
  import { useToast } from '../../../hooks/useToast';

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
            <div className="p-1 cursor-pointer">
                <div onClick={() => handleOpenTab(data)} className=" w-full p-2 border-l-3 border-gray-900 hover:border-gray-800 bg-slate-200 hover:bg-slate-300 dark:border-slate-100 dark:hover:border-slate-500 dark:bg-gray-900  dark:hover:bg-gray-800">
                    <p className="ml-2 text-gray-900 dark:text-slate-100">{data.details_for}</p>
                </div>
            </div>
        )
    }

    function FilteredListItem(){
        

        let filteredItems = listViewState.itemslist.filter((item) => {
           if(item.details_for.toLowerCase().includes(filterText.toLowerCase())){
            return item
           }
        })
        
        let viewitems = filteredItems.map((value, index) => {
            return <ListItem key={index} data={value}/>
        })

        return(
            <>
                {listViewState.itemslist.length !== 0 ? 
                    (<>{viewitems}</>) : 
                    (
                        <div className="text-slate-700 dark:text-slate-300 text-bold flex items-center justify-center text-lg">
                            <p>No items to display</p>
                        </div>
                    )
                }
            </>
        )
    }

    return(<>
    <div class="w-full my-1 h-7/10 flex flex-col border-b-4 border-slate-300 dark:border-slate-800">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-100 dark:text-gray-900 sr-only">Search</label>
        <div class="relative m-1">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" value={filterText} onChange={(e) => setFilterText(e.target.value)} class="w-full p-4 ps-10 text-sm text-slate-900 dark:text-slate-100 border border-gray-700 dark:border-gray-300 rounded-lg bg-slate-200 dark:bg-slate-800 focus:ring-blue-500 focus:border-blue-500" placeholder="Type to Search..." />
        </div>
        <div className='p-2 overflow-y-auto no-scrollbar'>
            <FilteredListItem/>
        </div>
    </div>


    </>)
  }
  export default DataList;