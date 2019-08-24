import { arrayMove } from 'react-sortable-hoc';
import scheduledPriceAPI from '@app/api/pg/scheduledPrice';
import { loadPayloadAPIHelper, sendPayloadAPIHelper } from './helper';
/*
 * define action name
 */
export const LOAD_PROMOTION = 'promotion/LOAD_PROMOTION';
export const SORT_PROMOTION = 'promotion/SORT_PROMOTION';

/*
 * define async action name
 */
export const GET_PROMOTION_SUCCESS = 'promotion/GET_PROMOTION_SUCCESS';
export const GET_PROMOTION_FAIL = 'promotion/GET_PROMOTION_FAIL';

export const FETCH_PROMOTION_REQ = 'promotion/FETCH_PROMOTION_REQ';
export const FETCH_PROMOTION_SUCCESS = 'promotion/FETCH_PROMOTION_SUCCESS';
export const FETCH_PROMOTION_FAIL = 'promotion/FETCH_PROMOTION_FAIL';

export const DELETE_PROMOTION = 'promotion/DELETE_PROMOTION';
export const PATCH_PROMOTION = 'promotion/PATCH_PROMOTION';
export const POST_PROMOTION_IN_QUEUE = 'promotion/POST_PROMOTION_IN_QUEUE';
export const POST_PROMOTION_ONLIVE = 'promotion/POST_PROMOTION_ONLIVE';

/*
 * state init (scheduledPrice in redux)
 */
const initialState = {
  isLoading: true,
  errMsg: undefined,
  postLoading: true,
  statusCode: '',
  priceSet: {
    active: '',
    items: {}
  },
  promotion: {
    active: '',
    onLive: '',
    onEdit: '',
    order: [],
    queue: {}
  }
};

/*
 * reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROMOTION:
      return {
        ...state,
        promotion: {
          ...state.promotion,
          active: action.promotionId
        },
        priceSet: {
          ...state.priceSet,
          active: action.promotionId
        }
      };
    case SORT_PROMOTION:
      return {
        ...state,
        promotion: {
          ...state.promotion,
          order: arrayMove(
            state.promotion.order,
            action.oldIndex,
            action.newIndex
          )
        }
      };
    case FETCH_PROMOTION_REQ:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statusCode: action.statusCode
      };
    case FETCH_PROMOTION_FAIL:
      return {
        ...state,
        isLoading: false,
        statusCode: action.statusCode
      };
    case GET_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: undefined,
        promotion: action.promotion,
        priceSet: action.priceSet
      };
    case GET_PROMOTION_FAIL:
      return {
        ...state,
        removedPromoId: '',
        isLoading: false,
        errMsg: 'Error',
        promotion: {
          ...state.promotion
        },
        priceSet: {
          ...state.priceSet
        }
      };
    case POST_PROMOTION_IN_QUEUE:
    case POST_PROMOTION_ONLIVE:
    case PATCH_PROMOTION:
    case DELETE_PROMOTION:
      return {
        ...state,
        isLoading: true,
        promotion: action.promotion,
        priceSet: action.priceSet
      };
    // case POST_PROMOTION_ONLIVE:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     promotion: {
    //       ...state.promotion,
    //       order: action.order,
    //       queue: action.queue,
    //       onLive: action.currentPromotionId
    //     },
    //     priceSet: {
    //       ...state.priceSet,
    //       items: action.items
    //     }
    //   };
    default:
      return state;
  }
};

/*
 * export sync packaged dispatch
 */

export const loadDefaultPromotion = () => dispatch => {
  dispatch({
    type: LOAD_PROMOTION,
    promotionId: ''
  });
};

export const loadPromotion = promotionId => dispatch => {
  dispatch({
    type: LOAD_PROMOTION,
    promotionId
  });
};

export const sortPromotion = (oldIndex, newIndex) => dispatch => {
  dispatch({
    type: SORT_PROMOTION,
    oldIndex,
    newIndex
  });
};

/*
 * export async packaged dispatch
 */

export const asyncGetPromotion = ({ user }) => async dispatch => {
  try {
    const res = await scheduledPriceAPI.get(user.token);
    const { data, status } = res;
    const { promotion, priceSet } = loadPayloadAPIHelper({ data });
    dispatch({
      type: GET_PROMOTION_SUCCESS,
      promotion,
      priceSet
    });
  } catch (error) {
    dispatch({
      type: GET_PROMOTION_FAIL,
      statusCode: error.response.status
    });
    return Promise.reject(new Error(error.message));
  }
};

export const asyncApplyPromotion = ({
  // order,
  queue,
  items,
  currentPromotionId,
  param,
  user
}) => async dispatch => {
  try {
    dispatch({
      type: FETCH_PROMOTION_REQ
    });
    const postBody = sendPayloadAPIHelper({
      queue,
      items,
      currentPromotionId,
      param
    });
    const res = await scheduledPriceAPI.post(user.token, postBody);
    const { data, status } = res;
    const { promotion, priceSet } = loadPayloadAPIHelper({ data });
    switch (param) {
      case 'onLive':
        // dispatch({
        //   type: POST_PROMOTION_ONLIVE,
        //   order,
        //   queue: updatedQueue,
        //   items: updatedItems,
        //   currentPromotionId
        // });
        break;
      case 'queue':
        dispatch({
          type: POST_PROMOTION_IN_QUEUE,
          promotion,
          priceSet
        });
        break;
      default:
        break;
    }
    dispatch({
      type: FETCH_PROMOTION_SUCCESS,
      statusCode: status
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROMOTION_FAIL,
      statusCode: error.response.status
    });
    return Promise.reject(new Error(error.message));
  }
};

export const asyncEditPromotion = ({
  queue,
  items,
  currentPromotionId,
  user
}) => async dispatch => {
  const _id = queue[currentPromotionId]._id;
  const putBody = sendPayloadAPIHelper({
    queue,
    items,
    currentPromotionId
  });
  try {
    dispatch({
      type: FETCH_PROMOTION_REQ
    });
    const res = await scheduledPriceAPI.put(user.token, _id, putBody);
    const { data, status } = res;
    const { promotion, priceSet } = loadPayloadAPIHelper({ data });
    dispatch({
      type: PATCH_PROMOTION,
      promotion,
      priceSet
    });
    dispatch({
      type: FETCH_PROMOTION_SUCCESS,
      statusCode: status
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROMOTION_FAIL,
      statusCode: error.response.status
    });
    return Promise.reject(new Error(error.message));
  }
};

export const asyncRemovePromotion = ({
  promotionId,
  _id,
  user
}) => async dispatch => {
  try {
    dispatch({
      type: FETCH_PROMOTION_REQ
    });
    const res = await scheduledPriceAPI.delete(user.token, _id);
    const { data, status } = res;
    const { promotion, priceSet } = loadPayloadAPIHelper({ data });
    dispatch({
      type: DELETE_PROMOTION,
      promotion,
      priceSet
    });
    dispatch({
      type: FETCH_PROMOTION_SUCCESS,
      statusCode: status
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROMOTION_FAIL,
      statusCode: error.response.status
    });
    return Promise.reject(new Error(error.message));
  }
};
