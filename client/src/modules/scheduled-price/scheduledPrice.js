import { arrayMove } from 'react-sortable-hoc';
import scheduledPriceAPI from '../../api/pg/scheduledPrice';
import { initialState as authInitialState } from '../auth/auth';
import { promotionAPIHelper } from './helper';
/*
* define action name
*/
export const LOAD_PROMOTION = "promotion/LOAD_PROMOTION";
export const SORT_PROMOTION = "promotion/SORT_PROMOTION";
export const REMOVE_PROMOTION = "promotion/REMOVE_PROMOTION";

/*
* define async action name
*/
export const GET_PROMOTION_SUCCESS = "promotion/GET_PROMOTION_SUCCESS";
export const GET_PROMOTION_FAIL = "promotion/GET_PROMOTION_FAIL";

export const POST_PROMOTION_SUCCESS = "promotion/POST_PROMOTION_SUCCESS";
export const POST_PROMOTION_FAIL = "promotion/POST_PROMOTION_FAIL";

export const ADD_PROMOTION_IN_QUEUE = "promotion/ADD_PROMOTION_IN_QUEUE";
export const APPLY_PROMOTION_ONLIVE = "promotion/APPLY_PROMOTION_ONLIVE";


/*
* state init (scheduledPrice in redux)
*/
const initialState = {
  isLoading: true,
  errMsg: false,
  postLoading: true,
  postResponse: "",
  priceSet: {
    active: "",
    items: {}
  },
  promotion: {
    active: "",
    onLive: "",
    order: [],
    queue: {} 
  }
}

/*
* reducer
*/
export default (state = initialState, action) => {
  switch(action.type){
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
    case POST_PROMOTION_SUCCESS:
      return {
        ...state,
        postLoading: false,
        postResponse: action.postResponse,        
      } 
    case POST_PROMOTION_FAIL:
      return {
        ...state,
        postLoading: false,
        postResponse: action.postResponse, 
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
          order: action.order,
          queue: action.queue,          
          onLive: action.stashPromotionId
        },
        priceSet:{
          ...state.priceSet,
          items: action.items
        }        
      }                
    default:
      return state;      
  }
}

/*
* export sync packaged dispatch
*/

export const loadDefaultPromotion = () => dispatch => {
  dispatch({
    type: LOAD_PROMOTION,
    promotionId: ''
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

/*
* export async packaged dispatch
*/

export const asyncGetPromotion = () => dispatch => {

  return scheduledPriceAPI.fetchList()
    .then(json => {
      const { promotion, priceSet } = promotionAPIHelper(json)
      dispatch({
        type: GET_PROMOTION_SUCCESS,
        promotion: promotion,
        priceSet: priceSet
      });
      return json   
      // dispatch({
      //   type: GET_PROMOTION_SUCCESS,
      //   promotion: json.promotion,
      //   priceSet: json.priceSet
      // });         
    })
    .catch((error) => {
      dispatch({
        type: GET_PROMOTION_FAIL
      });
      return Promise.reject(new Error(error.message))      
    })
}


export const applyPromotion = ({order, queue, items, stashPromotionId, param}) => dispatch => {
  let postBody = {
    name: queue[stashPromotionId].name,
    start_date: queue[stashPromotionId].startDate,
    end_date: queue[stashPromotionId].endDate,
    items:[
      items[stashPromotionId]
    ],
    apply_now: param === 'onLive'
  }
  // console.log('postBody', postBody);
  // return scheduledPriceAPI.create(authInitialState.user.token, postBody)
  //   .then(json => {
  //     // TO DO test if 200
  //     console.log('res', json)
  //     if (param === 'onLive'){
  //       dispatch({
  //         type: APPLY_PROMOTION_ONLIVE,
  //         order,
  //         queue,
  //         items,
  //         stashPromotionId 
  //       })         
  //     } else {
  //       dispatch({
  //         type: ADD_PROMOTION_IN_QUEUE,
  //         order,
  //         queue,
  //         items
  //       })
  //     }
  //     dispatch({
  //       type: POST_PROMOTION_SUCCESS,
  //       postResponse: 200
  //     })
  //   })
  //   .catch((error) => {
  //     dispatch({
  //       type: POST_PROMOTION_FAIL
  //     });
  //     return Promise.reject(new Error(error.message))         
  //   })  

  if (param === 'queue'){
    dispatch({
      type: ADD_PROMOTION_IN_QUEUE,
      order,
      queue,
      items
    })   
    dispatch({
      type: POST_PROMOTION_SUCCESS,
      postResponse: 200
    })   
  } else {
    dispatch({
      type: APPLY_PROMOTION_ONLIVE,
      order,
      queue,
      items,
      stashPromotionId
    })
    dispatch({
      type: POST_PROMOTION_SUCCESS,
      postResponse: 200
    })      
  }

  // return fetch("", {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({})    
  //   }).then(response => {
  //     if (response.ok){
  //       dispatch({
  //         type: POST_PROMOTION_SUCCESS,
  //         postResponse: response
  //       })               
  //       return response.json()
  //     }
  //     dispatch({
  //       type: POST_PROMOTION_FAIL,
  //       postResponse: response
  //     })      
  //     return Promise.reject(new Error('error'))
  //   }).then(json => {
  //     dispatch({
  //       type: ADD_PROMOTION_IN_QUEUE,
  //       order,
  //       queue,
  //       items
  //     })   
  //     return json
  //   }).catch((error) => {
  //     dispatch({
  //       type: POST_PROMOTION_FAIL,
  //       postResponse: error
  //     })
  //     return Promise.reject(new Error(error.message))      
  //   }) 
}