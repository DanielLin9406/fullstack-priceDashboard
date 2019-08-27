import licenseRuleAPI from '@app/api/internal/licenseRule';

/*
 * define action name
 */

/*
 * define async action name
 */
export const GET_PG_LICENSE_SUCCESS = 'license/GET_PG_LICENSE_SUCCESS';
export const GET_PG_LICENSE_FAIL = 'license/GET_PG_LICENSE_FAIL';

/*
 * state init (scheduledPrice in redux)
 *
 */
const initialState = {
  isLoading: true,
  errMsg: undefined,
  rule: {}
};

/*
 * reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PG_LICENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: undefined,
        rule: action.rule
      };
    case GET_PG_LICENSE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: 'Error',
        rule: {
          ...state.rule
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
export const asyncGetLicenseRule = ({ user }) => async dispatch => {
  try {
    const res = await licenseRuleAPI.get(user.token);
    const json = res.data;
    dispatch({
      type: GET_PG_LICENSE_SUCCESS,
      rule: json
    });
  } catch (error) {
    dispatch({
      type: GET_PG_LICENSE_FAIL
    });
    return Promise.reject(new Error(error.message));
  }

  // return licenseRuleAPI
  //   .fetchList(user.token)
  //   .then(json => {
  //     dispatch({
  //       type: GET_PG_LICENSE_SUCCESS,
  //       rule: json.data.rule
  //     });
  //     return json.data.rule;
  //     // dispatch({
  //     //   type: GET_PG_LICENSE_SUCCESS,
  //     //   rule: json.rule
  //     // });
  //   })
  //   .catch(error => {
  //     dispatch({
  //       type: GET_PG_LICENSE_FAIL
  //     });
  //     return Promise.reject(new Error(error.message));
  //   });
};
