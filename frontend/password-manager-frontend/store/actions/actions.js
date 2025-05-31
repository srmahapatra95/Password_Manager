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
    console.log(data)

    if (data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
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
    console.log(data)
    //const response = await fakeLoginAPI(credentials);

    if (data) {
      dispatch({ type: 'REGSITER_SUCCESS', payload: data });
    } else {
      dispatch({ type: 'REGSITER_FAILURE', payload: response.error });
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: 'REGSITER_FAILURE', payload: error.message });

  }
};
  