/*
* define async action name
*/
export const GET_PROMOTION_REQ = "promotion/GET_PROMOTION_REQ";
export const GET_PROMOTION_SUCCESS = "promotion/GET_PROMOTION_SUCCESS";
export const GET_PROMOTION_FAIL = "promotion/GET_PROMOTION_FAIL";

export const LOAD_PROMOTION = "promotion/LOAD_PROMOTION";
export const SORT_PROMOTION = "promotion/SORT_PROMOTION";
export const REMOVE_PROMOTION = "promotion/REMOVE_PROMOTION";
export const ADD_PROMOTION = "promotion/ADD_PROMOTION";
export const APPLY_PROMOTION = "promotion/APPLY_PROMOTION";

export const LOAD_CURRENT_PRICE = "priceSet/LOAD_CURRENT_PRICE";


/*
* state init (scheduledPrice in redux)
*/
const initialState = {
  isLoading: false,
  errMsg: false,
  priceSet: {
    active: "",
    items: {}
  },
  promotion: {
    active: "",
    order: [],
    queue: {} 
  }
}

/*
* reducer
*/
export default (state = initialState, action) => {
  switch(action.type){
    case GET_PROMOTION_REQ:
      return {
        ...state,
        isLoading: true,
        errMsg: "",
        promotion:{
          ...state.promotion,
        }, 
        priceSet: {
          ...state.priceSet,
        }
      }
    case GET_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: "",
        promotion: action.promotion, 
        priceSet: action.priceSet
      }
    case GET_PROMOTION_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: "Error",
        promotion:{
          ...state.promotion,
        }, 
        priceSet: {
          ...state.priceSet,
        }
      }    
    case APPLY_PROMOTION:
      return {
        ...state,
        promotion:{
          ...state.promotion,
          onLive: action.promotionId
        }
      }
    case LOAD_PROMOTION:
      return {
        ...state,
        promotion:{
          ...state.promotion,        
          active: action.promotionId
        }
      }
    case SORT_PROMOTION:
      return {
        ...state,
        promotion:{
          ...state.promotion,
          order: action.promotionOrder
        }
      }
    case REMOVE_PROMOTION:
    case ADD_PROMOTION:
      return {
        ...state,
        promotion:{
          ...state.promotion,
          queue: action.promotionQueue
        }
      }
    case LOAD_CURRENT_PRICE:
      return {
        ...state,
        priceSet:{
          ...state.priceSet,
          active: action.promotionId
        }
      }             
    default:
      return state;      
  }
}

/*
* export sync packaged dispatch
*/

export const applyPromotion = (promotionId) => dispatch => {
  dispatch({
    type: APPLY_PROMOTION,
    promotionId
  });
}

export const loadPromotion = (promotionId) => dispatch => {
  dispatch({
    type: LOAD_PROMOTION,
    promotionId
  });
}

export const sortPromotion = (promotionOrder) => dispatch => {
  dispatch({
    type: SORT_PROMOTION,
    promotionOrder
  });
}

export const removePromotion = (promotionQueue) => dispatch => {
  dispatch({
    type: REMOVE_PROMOTION,
    promotionQueue
  });
}

export const addPromotion = (promotionQueue) => dispatch => {
  dispatch({
    type: ADD_PROMOTION,
    promotionQueue
  });
}

export const loadCurrentPrice = (promotionId) => dispatch => {
  dispatch({
    type: LOAD_CURRENT_PRICE,
    promotionId
  })
}

/*
* export async packaged dispatch
*/
export const asyncGetPromotion = () => dispatch => {
  dispatch({
    type: GET_PROMOTION_REQ
  })
  return fetch("/promo")
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: GET_PROMOTION_SUCCESS,
        promotion: json.promotion,
        priceSet: json.priceSet
      });              
    })
    .catch(() => {
      dispatch({
        type: GET_PROMOTION_FAIL
      });      
    })
}