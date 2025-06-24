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



export const login = (dispatch,navigate) => async (credentials, csrftoken) => {
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
      localStorage.setItem('token', data.token)
      dispatch({ type: 'LOGIN_SUCCESS'});
      navigate('/dashboard')
      }

    })
    .catch(error => {
      console.error(error)
    })    






};
  

export const register = (dispatch) => async (signUpData) => {
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
      dispatch({ type: 'REGSITER_SUCCESS', payload: data });
    } else {
      dispatch({ type: 'REGSITER_FAILURE', payload: response.error });
    }
  } catch (error) {
    dispatch({ type: 'REGSITER_FAILURE', payload: error.message });

  }
};

export const logout = () => async (token) => {
  try{
        const URL = `${API_URL}/api/logout/`
        const response = await fetch(URL,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
    let data = await response.status
    localStorage.removeItem("token")
  }catch(error){
    console.error(error)
  }
}
  
export const fetchdatalist = (dispatch) => async (token) => {
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
      alert(data.message)
    }
  } catch (error) {
      console.error(error)

  }
};
  
export const add_data = (dispatch) => async (data_obj,token) => {
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

export const patch_update_data = (setStateFunc, id) => async (data_obj, token) => {
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
      for(let [keyval, value] of Object.entries(setStateFunc)){
        setStateFunc[keyval](data.data[keyval])
      }
    }

  })
  .catch(error => console.error('Error in request...', error))

}

export const delete_data = (removeFromView, id) => async (token) => {
  const URL = `${API_URL}/api/data-detail/${id}/`
  fetch(URL,{
            method: 'DELETE',
            headers: {
              'Authorization': `Token ${token}`,
            },
  })
  .then(response => {

    if(response.status === 204){
      removeFromView()
    }
  })
  .catch(error => console.error('Error in request...', error))

}

export const decrypt_password = () => async (data_obj, token) => {
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
    console.log(data)
  })
  .catch(error => console.error('Error in request...', error))

}

export const is_authenticated = (dispatch, closeScreen) => async (data_obj) => {
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
    })
    .catch(error => {
      console.log("The error is : ", error)
    })
}

