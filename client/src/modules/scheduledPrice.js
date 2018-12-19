import { arrayMove} from 'react-sortable-hoc';

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


/*
* state init (scheduledPrice in redux)
*/
const initialState = {
  isLoading: true,
  errMsg: false,
  priceSet: {
    active: "",
    items: {}
  },
  promotion: {
    active: "",
    onLive:"",
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
        },
        priceSet:{
          ...state.priceSet,
          active: action.promotionId
        }
      }
    case SORT_PROMOTION:
      return {
        ...state,
        promotion:{
          ...state.promotion,
          order: arrayMove(state.promotion.order, action.oldIndex, action.newIndex)
        }
      }
    case REMOVE_PROMOTION:
      const prevOrder = state.promotion.order;
      const itemIndex = prevOrder.indexOf(action.promotionId);
      let nextOrder;
      if (itemIndex > -1){
        nextOrder = prevOrder.splice(itemIndex)
      } else {
        nextOrder = prevOrder
      }
      return {
        ...state,
        promotion:{
          ...state.promotion,
          order: nextOrder
        }
      }     
    case ADD_PROMOTION:
      return {
        ...state,
        promotion:{
          ...state.promotion,
          queue: action.promotionQueue
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

export const sortPromotion = (oldIndex, newIndex) => dispatch => {
  dispatch({
    type: SORT_PROMOTION,
    oldIndex,
    newIndex
  });
}

export const removePromotion = (promotionId) => dispatch => {
  dispatch({
    type: REMOVE_PROMOTION,
    promotionId
  });
}

export const addPromotion = (promotionQueue) => dispatch => {
  dispatch({
    type: ADD_PROMOTION,
    promotionQueue
  });
}

/*
* export async packaged dispatch
*/
export const asyncGetPromotion = () => dispatch => {
  dispatch({
    type: GET_PROMOTION_REQ
  })
  return fetch("/promo6")
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

export const addPromotionInQueue = () => dispatch => {
  dispatch({
    type: ADD_PROMOTION
  })
}

export const applyPromotionNow = () => dispatch => {
  dispatch({
    type: APPLY_PROMOTION
  })
}