import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";
import { bulk_delete } from "../../../store/actions/actions";
import { useToast } from "../../../hooks/useToast";
function DeleteData(){

    const {listViewState, listViewDispatch} = useContext(GlobalContext);
    const {deleteItemsState, deleteItemsDispatch} = useContext(GlobalContext);
    const [filterText, setFilterText] = useState('');
    const toast = useToast();


    

    function DeleteDataComponent(){

        const initialCheckState = {};
        listViewState.itemslist.forEach(item => {
            initialCheckState[item.id] = false; // assuming each item has a unique `id`
        });

        const [checkState, setCheckState] = useState(initialCheckState)
        const {tabState, tabDispatch} = useContext(GlobalContext)    

        const [deleteAllValue, setDeleteAllValue] = useState(false)

        function handleSelectAllToDelete(){
            const newValue = !deleteAllValue;
            setDeleteAllValue(newValue);

            const updatedCheckState = {};
            listViewState.itemslist.forEach(item => {
                updatedCheckState[item.id] = newValue;
            });

            setCheckState(updatedCheckState);
    }
    function updateUiAfterDelete(){
        const remainingItems = listViewState.itemslist.filter(item => !checkState[item.id]);
        console.log(remainingItems);
        
        listViewDispatch({ type: 'LOAD_ITEM', payload: remainingItems });
        tabDispatch({type:'REINITIALIZE_TAB', payload:[]})

        // Reset state
        const newCheckState = {};
        remainingItems.forEach(item => {
            newCheckState[item.id] = false;
        });
        setCheckState(newCheckState);
        setDeleteAllValue(false);
    }
    function handleDeleteData(){
        const selectedItems = listViewState.itemslist.filter(item => checkState[item.id]);
        const selectedItemsId = selectedItems.map(item => item.id)

        if(selectedItemsId.length > 0){
            const deleteAction = bulk_delete(toast, updateUiAfterDelete)
            deleteAction(selectedItemsId)
        }else{
            toast.error('Nothing to Delete...')
        }
    }


    function ListItem({data}){

        function handleItemCheck(itemId) {
            setCheckState(prevState => ({
                ...prevState,
                [itemId]: !prevState[itemId]
            }));
        }


                return(
                    <div className="w-50 text-wrap p-2 flex flex-row items-center justify-start rounded-md">

                        <input
                            id={`checkbox-${data.id}`}
                            type="checkbox"
                            checked={checkState[data.id]}
                            onChange={() => handleItemCheck(data.id)}
                            className="text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 mx-2"
                        />


                        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.details_for}</h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400">{data.username}</p>
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
                return <ListItem key={index} index={index} data={value}/>
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
        return(<>
        <div className="flex flex-row items-center p-2 m-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash text-slate-100" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            <label className="text-center text-slate-100 p-1">Delete all</label>
            <div class="flex items-center">
                <input id="default-checkbox" type="checkbox" value={deleteAllValue} onChange={() => handleSelectAllToDelete()} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </div>
        </div>
        <div className='w-full p-2 overflow-y-auto no-scrollbar'>
            <FilteredListItem/>
        </div>
            <div className="absolute right-5 rounded-md bottom-2 cursor-pointer text-slate-100 hover:bg-gray-700"> 
            <div  onClick={handleDeleteData} className="cursor-pointer w-full flex flex-row items-center p-3 w-20 border-2 border-rose-800 text-rose-500 hover:bg-rose-700 hover:text-slate-100 rounded-md hover:rounded-md hover:border-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>         
                <p className="ml-3 cursor-pointer"> 
                    Delete
                </p>
            </div> 
        </div>
        </>)
    }

    return (
        <> 
    <div class="w-8/10 my-1 h-8/10 flex flex-col relative">   
        <div class="relative m-1">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" value={filterText} onChange={(e) => setFilterText(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type to Search..." />
        </div>
        <DeleteDataComponent/>
    </div>
        </>
    )

}

export default DeleteData;