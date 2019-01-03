/*
* define action name
*/

/*
* define async action name
*/
export const GET_PG_LICENSE_REQ = "license/GET_PG_LICENSE_REQ";
export const GET_PG_LICENSE_SUCCESS = "license/GET_PG_LICENSE_SUCCESS";
export const GET_PG_LICENSE_FAIL = "license/GET_PG_LICENSE_FAIL";


/*
* state init (scheduledPrice in redux)
*/
const initialState = {
  isLoading: true,
  errMsg: false,  
  rule:{}
}

/*
* reducer
*/
export default (state = initialState, action) => {
  switch(action.type){
    case GET_PG_LICENSE_REQ:
      return {
        ...state,
        isLoading: true,
        errMsg: "",
        rule: {
          ...state.rule
        }
      }
    case GET_PG_LICENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: "",
        rule: action.rule,
      }
    case GET_PG_LICENSE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: "Error",
        rule: {
          ...state.rule
        }
      }      
  }
  return state;  
}

/*
* export sync packaged dispatch
*/


/*
* export async packaged dispatch
*/
export const asyncGetLicenseRule = () => dispatch => {
  dispatch({
    type: GET_PG_LICENSE_REQ
  })  

  return fetch("https://pg-api-staging.herokuapp.com/api/bigcommerce/guest")
    .then(response => {
      if (response.ok){
        return response.json()
      }
      return Promise.reject(new Error('error'))
    })    
    .then(json => {
      dispatch({
        type: GET_PG_LICENSE_SUCCESS,
        rule: json.rule
      });
      return json.rule               
    })
    .catch((error) => {
      dispatch({
        type: GET_PG_LICENSE_FAIL
      });
      return Promise.reject(new Error(error.message))                
    })
}