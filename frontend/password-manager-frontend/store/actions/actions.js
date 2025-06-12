const API_URL = 'http://localhost:8001'
export const is_authenticated = (dispatch) => async () =>{
  try{
    const URL = `${API_URL}/api/is_authenticated/`
    const response  = await fetch(URL,{
      method: 'GET',
      withCredentials: true,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem('token')}`, 
      },
    });
    const data = await response.json()
    if(data.is_authenticated){
      dispatch({type:"LOGIN_SUCCESS", payload: data})
    }
  }catch(error){
    console.log(error)
  }
}

export const login = (dispatch) => async (credentials, csrftoken) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });

    // Simulate an API call (replace with actual API call)
    const URL = `${API_URL}/api/login/`
    const response = await fetch(URL,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,

            },
            body: JSON.stringify(credentials)
          });
    let data = await response.json()

    if (data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('token', data.token)

    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: response.error });

    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });

  }
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
    console.log(data)
    localStorage.removeItem("token")
  }catch(error){
    console.log(error)
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
    console.log("Actions:",data)
    if (Array.isArray(data)) {
      dispatch({ type: 'LOAD_ITEM', payload: data });
    } else {
      alert(data.msg)
    }
  } catch (error) {
      console.log(error)

  }
};
  
export const add_data = (dispatch) => async (data,token) => {
  try {

    const URL = `${API_URL}/api/add-data/`
    const response = await fetch(URL,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(data)
          });
    let data = await response.json()
    console.log("Actions:",data)
    if (Array.isArray(data)) {
      dispatch({ type: 'ADD_ITEM', payload: data });
    } else {
      alert(data.msg)
    }
  } catch (error) {
      console.log(error)

  }
};