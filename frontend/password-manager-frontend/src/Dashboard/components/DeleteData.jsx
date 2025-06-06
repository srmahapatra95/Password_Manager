import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";
function DeleteData(){

    const {listViewState, listViewDispatch} = useContext(GlobalContext);
    const [filterText, setFilterText] = useState('')

    function handleDeleteData(){
        // delete multiple entries if present
    }

    function ListItem({data}){
        return(
            <div className="w-4/10 p-2 flex flex-row items-center border-2 border-slate-600 rounded-md">
                <div class="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                </div>
                <div onClick={() => handleOpenTab(data)} className="p-1 cursor-pointer">
                    <div className=" bg-indigo-500 p-1">
                        <p className="">{data.details_for}</p>
                    </div>
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
            <div className="w-full p-2 grid grid-cols-5 gap-4">
                {listViewState.itemslist.length !== 0 ? 
                    (<>{viewitems}</>) : 
                    (
                        <div className="text-black text-lg">
                            <p>No items to display</p>
                        </div>
                    )
                }
            </div>
            </>
        )
    }

    return (
        <> 
    <div class="w-8/10 my-1 bg-green-200 h-8/10 flex flex-col relative">   
        <div class="relative m-1">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" value={filterText} onChange={(e) => setFilterText(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type to Search..." />
        </div>
        <div className="flex flex-row items-center p-2 m-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            <label className="text-center p-1">Delete all</label>
            <div class="flex items-center">
                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </div>
        </div>
        <div className='w-full p-2 overflow-y-auto no-scrollbar bg-slate-300'>
            <FilteredListItem/>
        </div>
        <div className="absolute right-5 bottom-2"> 
            <div  onClick={handleDeleteData} className="w-full flex flex-row items-center p-3 w-20 border-2 border-white mx-1 rounded-md  hover:bg-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>         
                <button className="ml-3"> 
                    Delete
                </button>
            </div> 
        </div>
    </div>
        </>
    )

}

export default DeleteData;