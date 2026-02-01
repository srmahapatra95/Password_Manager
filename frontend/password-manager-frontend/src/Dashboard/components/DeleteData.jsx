import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";
import { bulk_delete } from "../../../store/actions/actions";
import { useToast } from "../../../hooks/useToast";
import { Trash2, Search, KeyRound, CheckSquare } from 'lucide-react'

function DeleteData(){

    const {listViewState, listViewDispatch} = useContext(GlobalContext);
    const {deleteItemsState, deleteItemsDispatch} = useContext(GlobalContext);
    const [filterText, setFilterText] = useState('');
    const toast = useToast();



    function DeleteDataComponent(){

        const initialCheckState = {};
        listViewState.itemslist.forEach(item => {
            initialCheckState[item.id] = false;
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
                    <div className="p-1">
                        <label className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all ${checkState[data.id] ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800 ring-1 ring-rose-200 dark:ring-rose-800/50' : 'bg-stone-50 dark:bg-gray-800 border-stone-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-gray-600 hover:bg-stone-100 dark:hover:bg-gray-700/60'}`}>
                            <input
                                id={`checkbox-${data.id}`}
                                type="checkbox"
                                checked={checkState[data.id]}
                                onChange={() => handleItemCheck(data.id)}
                                className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-rose-500 accent-rose-500"
                            />
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                <KeyRound className="w-4 h-4 text-indigo-500" />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{data.details_for}</h5>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{data.username}</p>
                            </div>
                        </label>
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
                <div className="w-full p-2 grid grid-cols-4 gap-1">
                    {listViewState.itemslist.length !== 0 ?
                        (<>{viewitems}</>) :
                        (
                            <div className="col-span-4 text-gray-400 dark:text-gray-500 flex flex-col items-center justify-center py-12 gap-2">
                                <Trash2 className='w-8 h-8 opacity-50' />
                                <p className='text-sm'>No items to display</p>
                            </div>
                        )
                    }
                </div>
                </>
            )
        }
        return(<>
        <div className="flex flex-row items-center gap-3 px-4 py-3 mx-2 bg-stone-50 dark:bg-gray-800 rounded-xl border border-stone-200 dark:border-gray-700">
            <CheckSquare className='w-4 h-4 text-rose-500' />
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex-1">Select All</label>
            <input id="default-checkbox" type="checkbox" value={deleteAllValue} onChange={() => handleSelectAllToDelete()} className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-rose-500 accent-rose-500"/>
        </div>
        <div className='w-full p-2 overflow-y-auto no-scrollbar flex-1'>
            <FilteredListItem/>
        </div>
        <div className="flex-shrink-0 flex justify-end px-4 py-3 border-t border-stone-200 dark:border-gray-700">
            <button onClick={handleDeleteData} className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40">
                <Trash2 className='w-4 h-4' />
                <span>Delete Selected</span>
            </button>
        </div>
        </>)
    }

    return (
        <>
    <div className="w-7/10 h-9/10 flex flex-col bg-stone-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-5 pt-5 pb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-rose-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Delete Entries</h2>
        </div>
        <div className="px-4 pb-3">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className='w-4 h-4 text-gray-400' />
                </div>
                <input type="text" value={filterText} onChange={(e) => setFilterText(e.target.value)} className="block w-full pl-10 py-2.5 text-sm text-gray-900 dark:text-gray-100 bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" placeholder="Search to filter..." />
            </div>
        </div>
        <DeleteDataComponent/>
    </div>
        </>
    )

}

export default DeleteData;
