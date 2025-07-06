export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false};
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, username: null, loading: false, error: null};
    case 'AUTHENTICATION_SUCCESS':
      return { ...state, username: action.payload.username, id:action.payload.id };
    default:
      return state;
  }
}

export function registerReducer(state,action){
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, success: true, message: action.payload.message };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: true, success: false, message: null };
    default:
      return state;
  }
}

export function screenReducer(state, action){

  switch(action.type){
    case 'SHOW_SCREEN':
      return {
        ...state,show: true, content:action.payload
      }
    case 'HIDE_SCREEN':
      return {
        ...state,show: false, content:null
    }
    case 'ENABLE':
      return { ...state, enablePasswordChange: true};
    case 'DISABLE':
      return { ...state, enablePasswordChange: false};
    case 'ENABLE_TAB_SCREEN':
      return { ...state,showTabContentScreen: true};
    case 'DISABLE_TAB_SCREEN':
      return { ...state,showTabContentScreen: false};
    case 'LOGOUT':
      return {
        ...state, show: false, content:null, enablePasswordChange:false, showTabContentScreen: false
      }
  }
}
export function tabReducer(state, action){
  switch(action.type){
    case 'REINITIALIZE_TAB':
      return {
        ...state, activeTab:action.payload,tabButtonList:action.payload,tabContentList:action.payload
      }
    case 'ADD_TAB':
      return {
        ...state,tabButtonList:[...state.tabButtonList, action.payload],tabContentList:[...state.tabContentList, action.payload],activeTab:[...state.activeTab, action.payload]

      }

    case 'UPDATE_ACTIVE_TAB':
        let filterTabs = [...state.activeTab.filter((elem) =>elem.id != action.payload.id)]
      return {
          ...state, activeTab: [...filterTabs, action.payload]
      }
    case 'UPDATE_CONTENT':
        let filterTab = [...state.activeTab.filter((elem) =>elem.id != action.payload.id)]
        let filterButtonList = [...state.tabButtonList.filter((elem) =>elem.id != action.payload.id)]
      return {
          ...state, activeTab: [...filterTab, action.payload], tabButtonList: [...filterTab, action.payload], 
      }

    case 'REMOVE_TAB':
      let filteredOutButtons = [...state.tabButtonList.filter((elem) =>elem.id != action.payload.id)]
      let filteredOutContents = [...state.tabContentList.filter((elem) =>elem.id != action.payload.id)]
      let filteredActiveTab = [...state.activeTab.filter((elem) =>elem.id != action.payload.id)]

      return {
        ...state,tabButtonList:[...filteredOutButtons],tabContentList:[...filteredOutButtons],activeTab:[...filteredActiveTab]
      }
    case 'LOGOUT':
      return{
        ...state, activeTab:[],tabButtonList: [],tabContentList:[]
      }
  }
  
}
export function listViewReducer(state, action){

  switch(action.type){
    case "LOADING_DATA":
      return{
        ...state,loading: true,
      }
    case 'LOAD_ITEM':
      return {
        ...state,itemslist: action.payload,loading:false
      }
    case 'ADD_ITEM':
      return {
        ...state,itemslist: [...state.itemslist, action.payload]
      }
    case 'UPDATE_ITEM':
      let filterTab = [...state.itemslist.filter((elem) =>elem.id != action.payload.id)]
      return {
        ...state,itemslist:[action.payload, ...filterTab]
      }
    case 'REMOVE_ITEM':
      let filteredOut = [...state.itemslist.filter((elem) =>elem.id != action.payload.id)]
      return {
        ...state,itemslist: [...filteredOut]
    }
    case 'SET_ITEMS':
      return {
        ...state,itemslist: action.payload
    }
    case 'LOGOUT':
      return{
        ...state,loading: false,itemslist: []
      }
  }
}

export function deleteItemsReducer(state, action){

  switch(action.type){
    case "ADD_DATA":
      return{
        ...state,loading: true,
      }
  }
}

export function lockScreenStateReducer(state, action){
    switch(action.type){
      case "ENABLE_LOCKSCREEN":
        return{
          ...state,enableLockScreen: true,
        }
      case "DISABLE_LOCKSCREEN":
        return{
          ...state,enableLockScreen: false,
        }
      case 'LOCKSCREEN_ON':
          return{
          ...state,lockScreen_On_Off: action.payload,
        }
      case 'LOCKSCREEN_OFF':
          return{
          ...state,lockScreen_On_Off: action.payload,
        }
  }
}