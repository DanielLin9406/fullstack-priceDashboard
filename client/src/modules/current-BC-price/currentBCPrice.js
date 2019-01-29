import currentBCPriceApi from '../../api/pg/currentBCPrice'

/*
* define action name
*/

/*
* define async action name
*/
export const GET_BC_PRICE_SUCCESS = "priceList/GET_BC_PRICE_SUCCESS";
export const GET_BC_PRICE_FAIL = "priceList/GET_BC_PRICE_FAIL";


/*
* state init (scheduledPrice in redux)
*/
const initialState = {
  isLoading: true,
  errMsg: false,
  priceList:{}
}


/*
* reducer
*/
export default (state = initialState, action) => {
  switch(action.type){
    case GET_BC_PRICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: "",
        priceList: action.priceList,
      }
    case GET_BC_PRICE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: "Error",
        priceList: {
          ...state.priceList
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

export const asyncGetBCPrice = ({user}) => dispatch => {
  return currentBCPriceApi.fetchList(user.token) 
    .then(json => {
      dispatch({
        type: GET_BC_PRICE_SUCCESS,
        priceList: json.data
      });
      return json.data    
    })
    .catch((error) => {
      dispatch({
        type: GET_BC_PRICE_FAIL
      });
      return Promise.reject(new Error(error.message))      
    })
}