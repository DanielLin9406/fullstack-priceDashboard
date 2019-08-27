import productPriceApi from '@app/api/internal/productPrice';

/*
 * define action name
 */

/*
 * define async action name
 */
export const GET_PRICE_SUCCESS = 'priceList/GET_PRICE_SUCCESS';
export const GET_PRICE_FAIL = 'priceList/GET_PRICE_FAIL';

/*
 * state init (scheduledPrice in redux)
 */
const initialState = {
  isLoading: true,
  errMsg: undefined,
  priceList: []
};

/*
 * reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: undefined,
        priceList: action.priceList
      };
    case GET_PRICE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: 'Error',
        priceList: {
          ...state.priceList
        }
      };
    default:
      break;
  }
  return state;
};

/*
 * export sync packaged dispatch
 */

/*
 * export async packaged dispatch
 */

export const asyncGetPrice = ({ user }) => async dispatch => {
  try {
    const res = await productPriceApi.get(user.token);
    const json = res.data;
    dispatch({
      type: GET_PRICE_SUCCESS,
      priceList: json
    });
  } catch (error) {
    dispatch({
      type: GET_PRICE_FAIL
    });
    return Promise.reject(new Error(error.message));
  }
};
