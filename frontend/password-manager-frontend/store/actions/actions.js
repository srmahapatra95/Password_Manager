import { data } from "react-router"

const API_URL = `${import.meta.env.VITE_API_HOST || 'http://localhost'}:${import.meta.env.VITE_API_PORT || 8001}`


export const is_authenticated_user = (dispatch) => async (token) => {
    const URL = `${API_URL}/api/is-authenticated-user/`
    const response  = await fetch(URL,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${token}`, 
      },
    })
    .then(response => response.json())
    .then(data => {
      if(data.username){
        dispatch({type: 'AUTHENTICATION_SUCCESS', payload: data})
      }
    })
    .catch(error => {
      console.error(error)
    })
}



export const login = (dispatch,navigate, toast) => async (credentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
      const URL = `${API_URL}/api/login/`
      const response = await fetch(URL,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials)
      })
      const data = await response.json()
      if(!data.token){
          dispatch({ type: 'LOGIN_FAILURE', payload: data.error || 'Login failed'});
      }
      else{
        localStorage.setItem('token', data.token)
        dispatch({ type: 'LOGIN_SUCCESS'});
        toast.success('Login Success...')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('Login Failed...')
    }






};
  

export const register = (dispatch, toast) => async (signUpData) => {
  try {
    dispatch({ type: 'REGISTER_REQUEST' });

    const URL = `${API_URL}/api/register/`
    const response = await fetch(URL,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData)
          });
    let data = await response.json()

    if (data) {
      toast.success('Registration Successful...')
      dispatch({ type: 'REGSITER_SUCCESS', payload: data });
    } else {
      toast.error('Registration Failed...')
      dispatch({ type: 'REGSITER_FAILURE', payload: response.error });
    }
  } catch (error) {
    toast.error('Registration Failed...')
    dispatch({ type: 'REGSITER_FAILURE', payload: error.message });

  }
};

export const logout = (toast) => async (token) => {
    const URL = `${API_URL}/api/logout/`
    const response = await fetch(URL,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
      },
    })
    .then(response => {
      if(response.status === 200){
    localStorage.removeItem("token");
    toast.success('Successfully Logged Out....')
      }
    })
    .catch(error => console.error(error))


}
  
export const fetchdatalist = (dispatch, toast) => async (token) => {
  try {
    dispatch({ type: 'LOADING_DATA' });

    const URL = `${API_URL}/api/datalist/`
    const response = await fetch(URL,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
    let data = await response.json()
    if (Array.isArray(data)) {
      dispatch({ type: 'LOAD_ITEM', payload: data });
    } else {
    }
  } catch (error) {
      console.error(error)

  }
};
  
export const add_data = (dispatch, toast, showKey) => async (data_obj,token) => {
  try {

    const URL = `${API_URL}/api/add-data/`
    const response = await fetch(URL,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(data_obj)
          });
    let data = await response.json()
    if (data !== null) {
      toast.success('Data Added Successfully...')
      if (showKey) showKey(data.key)
      delete data.key
      dispatch({ type: 'ADD_ITEM', payload: data.data});
    } else {
      console.log('Some Error...')
    }
  } catch (error) {
      console.log(error)

  }
};

export const patch_update_data = (setStateFunc, id, toast, showKey) => async (data_obj, token) => {
  const URL = `${API_URL}/api/data-detail/${id}/`
  fetch(URL,{
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(data_obj)
  })
  .then(response => response.json())
  .then(data => {
    if (!data.key){
      for(let [keyval, value] of Object.entries(setStateFunc)){
        setStateFunc[keyval](data[keyval])
      }
    }else{
      if (showKey) showKey(data.key)
      for(let [keyval, value] of Object.entries(setStateFunc)){
        setStateFunc[keyval](data.data[keyval])
      }
    }

  })
  .catch(error => console.error('Error in request...', error))

}

export const delete_data = (removeFromView, id, toast) => async (token) => {
  const URL = `${API_URL}/api/data-detail/${id}/`
  fetch(URL,{
            method: 'DELETE',
            headers: {
              'Authorization': `Token ${token}`,
            },
  })
  .then(response => {

    if(response.status === 204){
      toast.success('Successfully Delete...')
      removeFromView()
    }
    else{
      toast.error('Could not delete data')
    }
  })
  .catch(error => console.error('Error in request...', error))

}

export const decrypt_password = (toast, showKey) => async (data_obj, token) => {
  const URL = `${API_URL}/api/show-password/`
  fetch(URL,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(data_obj)
  })
  .then(response => response.json())
  .then(data => {
    if(data.key){
      if (showKey) showKey(data.key)
    }
    else{
      for(let [key, val] of Object.entries(data)){
        toast.error(val)
      }
    }
  })
  .catch(error => {
    console.error('Error in request...', error)
    toast.error('Error decrypting password...')
  })

}

export const is_authenticated = (dispatch,toast ,closeScreen) => async (data_obj) => {
    const URL = `${API_URL}/api/update-password-data/`
    const response  = await fetch(URL,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
      if(data.is_authenticated){
        dispatch({type: 'ENABLE', payload: true})
        closeScreen()
      }
      else{
        toast.error('Wrong Credentials...')
      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

export const bulk_delete = (toast, updateUiAfterDelete) => async (data_obj) => {
    const URL = `${API_URL}/api/bulk-delete/`
    const response  = await fetch(URL,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => {
      if(response.status === 204){
        toast.success('Delete Successful...')
        updateUiAfterDelete()
      }else{
        return response.json()
      }
    })
    .then(data => {
      if(data){
        console.log(data)
      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

export const change_account_password = (toast) => async (data_obj, methodType, setStateFunc1 = null, closeScreenFunc =null) => {
    const URL = `${API_URL}/api/check-password/`
    const response  = await fetch(URL,{
      method: methodType,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
      if(data.message){
        toast.success(data.message)
        if(methodType === 'POST'){
          setStateFunc1(true)
        }
        else{
          setStateFunc1(false)
          closeScreenFunc(false)
        }
      }
      else{
        toast.error(data.error)
      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

export const get_user_settings = (dispatch) => async () => {
  const URL = `${API_URL}/api/get-user-settings/`
    const response  = await fetch(URL,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("The user setting is : ",data)
      if(data){
        if(data.lock_screen){
          dispatch({type:'LOCKSCREEN_ON', payload: data.lock_screen})
        }
        else{
          dispatch({type:'LOCKSCREEN_OFF', payload: data.lock_screen})
        }
        if(data.lock_screen_status){
          dispatch({type:'LOCK', payload: data.lock_screen_status})
        }else{
          dispatch({type:'UNLOCK', payload: data.lock_screen_status})
        }
        dispatch({type:'SET_HAS_PIN', payload: !!data.has_pin})
        if(data.theme === 'Dark'){
          localStorage.setItem('theme','dark')
          document.body.setAttribute("data-theme", "dark");
        }else{
          localStorage.setItem('theme','light')
          document.body.setAttribute("data-theme", "light");
        }
      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

export const set_lock_screen = (dispatch, type, payload) => async (data_obj) => {
  const URL = `${API_URL}/api/set-user-settings/`
    const response  = await fetch(URL,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data){
        if(data.lock_screen){
              dispatch({type: 'LOCKSCREEN_ON', payload: true})

        }else{
              dispatch({type: 'LOCKSCREEN_OFF', payload: false})
          }

      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}


export const set_theme = () => async (data_obj) => {
  const URL = `${API_URL}/api/set-user-settings/`
    const response  = await fetch(URL,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data){
        if(data.theme === 'Dark'){
          localStorage.setItem('theme','dark')
          document.body.setAttribute("data-theme", "dark");
        }else{
          localStorage.setItem('theme','light')
          document.body.setAttribute("data-theme", "light");
        }   

      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

export const set_lock_screen_PIN = (toast) => async (data_obj) => {
  const URL = `${API_URL}/api/set-user-settings/`
    const response  = await fetch(URL,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
      if(data){
          toast.success('PIN Set Successfully...')
      }
      else{
          toast.error(data.error)
      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

export const discard_lock_screen_PIN = (toast) => async (data_obj) => {
  const URL = `${API_URL}/api/set-user-settings/`
    const response  = await fetch(URL,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
      if(data){
          toast.success('PIN Discarded Successfully...')
      }
      else{
          toast.error(data.error)
      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

export const lock_unlock = () => async (data_obj) => {
  const URL = `${API_URL}/api/set-user-settings/`
    const response  = await fetch(URL,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}



export const check_lock_screen_PIN = (setErrorMsg, errorMsg, setPin, lock, setLock, func_lock_unlock) => async (data_obj) => {
  const URL = `${API_URL}/api/check-pin/`
    const response  = await fetch(URL,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(data_obj)
    })
    .then(response => response.json())
    .then(data => {
      if(data.msg === 'Valid'){
          setLock({type:'UNLOCK'})
          setErrorMsg({...errorMsg, show: false, msg: ""})
          setPin('')
          func_lock_unlock()
      }
      if(data.error === 'Invalid'){
            setErrorMsg({...errorMsg, show: true, msg: "Invalid PIN. Try Again..."})
            setPin('')
      }
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

