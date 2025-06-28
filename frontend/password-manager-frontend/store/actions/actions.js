const API_URL = 'http://localhost:8001'


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



export const login = (dispatch,navigate, toast) => async (credentials, csrftoken) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    const URL = `${API_URL}/api/login/`
    fetch(URL,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,

            },
            body: JSON.stringify(credentials)
    })
    .then(resposne => resposne.json())
    .then(data => {
      if(!data.token){
          dispatch({ type: 'LOGIN_FAILURE', payload: error.message});
          navigate('/')
      }
      else{
      toast.success('Login Success...')
      localStorage.setItem('token', data.token)
      dispatch({ type: 'LOGIN_SUCCESS'});
      navigate('/dashboard')
      }

    })
    .catch((error) => {
      toast.error('Login Failed...')
      //console.error(error)
    })    






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
  
export const add_data = (dispatch, toast) => async (data_obj,token) => {
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
      alert(data.key)
      delete data.key
      dispatch({ type: 'ADD_ITEM', payload: data.data});
    } else {
      console.log('Some Error...')
    }
  } catch (error) {
      console.log(error)

  }
};

export const patch_update_data = (setStateFunc, id, toast) => async (data_obj, token) => {
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
      alert(data.key)
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

export const decrypt_password = (toast) => async (data_obj, token) => {
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
      alert(data.key)
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

