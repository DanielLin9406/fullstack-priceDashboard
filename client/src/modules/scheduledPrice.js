import { arrayMove} from 'react-sortable-hoc';

/*
* define action name
*/
export const LOAD_PROMOTION = "promotion/LOAD_PROMOTION";
export const SORT_PROMOTION = "promotion/SORT_PROMOTION";
export const REMOVE_PROMOTION = "promotion/REMOVE_PROMOTION";

/*
* define async action name
*/
export const GET_PROMOTION_REQ = "promotion/GET_PROMOTION_REQ";
export const GET_PROMOTION_SUCCESS = "promotion/GET_PROMOTION_SUCCESS";
export const GET_PROMOTION_FAIL = "promotion/GET_PROMOTION_FAIL";

export const ADD_PROMOTION_IN_QUEUE = "promotion/ADD_PROMOTION_IN_QUEUE";
export const APPLY_PROMOTION_ONLIVE = "promotion/APPLY_PROMOTION_ONLIVE";


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
      let nextOrder = prevOrder;
      if (itemIndex > -1){
        nextOrder.splice(itemIndex)
      }
      return {
        ...state,
        promotion:{
          ...state.promotion,
          order: nextOrder
        }
      }     
    case ADD_PROMOTION_IN_QUEUE:
      return {
        ...state,
        promotion:{
          ...state.promotion,
          order: action.order,
          queue: action.queue,
        },
        priceSet:{
          ...state.priceSet,
          items: action.items
        }
      } 
    case APPLY_PROMOTION_ONLIVE:
      return {
        ...state,
        promotion:{
          ...state.promotion,
          onLive: action.promotionId
        }
      }                
    default:
      return state;      
  }
}

/*
* export sync packaged dispatch
*/

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

/*
* export async packaged dispatch
*/
export const asyncGetPromotion = () => dispatch => {
  dispatch({
    type: GET_PROMOTION_REQ
  })
  return fetch("/promo6")
    .then(response => {
      if (response.ok){
        return response.json()
      }
      return Promise.reject(new Error('error'))
    })
    .then(json => {
      dispatch({
        type: GET_PROMOTION_SUCCESS,
        promotion: json.promotion,
        priceSet: json.priceSet
      });   
      return json
    })
    .catch((error) => {
      dispatch({
        type: GET_PROMOTION_FAIL
      });
      return Promise.reject(new Error(error.message))      
    })
}

export const addPromotionInQueue = (order, queue, items, stashPromotionId) => dispatch => {
  dispatch({
    type: ADD_PROMOTION_IN_QUEUE,
    order,
    queue,
    items
  })

  // return fetch("http://intrapi.positivegrid.com/v2/promotions")
  //   .then(response => response.json())
  //   .then(json => {
  //     dispatch({
  //       type: GET_PROMOTION_SUCCESS,
  //       promotion: json.promotion,
  //       priceSet: json.priceSet
  //     });              
  //   })
  //   .catch(() => {
  //     dispatch({
  //       type: GET_PROMOTION_FAIL
  //     });      
  //   })  
}

export const applyPromotionNow = () => dispatch => {
  dispatch({
    type: APPLY_PROMOTION_ONLIVE
  })
}