import {dashboard} from '../../constants/dashboard';
import {callApi} from '../../../Helper/api';
import {error as notifyError, success as notifySuccess} from '../../../Utils/notify'
//Login
export function getDashboardData(data) {
    return async (dispatch) => {
        try {
            dispatch({ type: dashboard.GET_DASHBOARD });
            const res = await callApi('GET', `act=${data.type}&section=dashboard`);
            if (res.data.error) {
                console.log(res.data.error);
                dispatch({ type: dashboard.GET_DASHBOARD_ERROR });
                notifyError(res.data.error);
            }
            else {
                let result = res.data.result || {};
                dispatch({ type: dashboard.GET_DASHBOARD_SUCCESS, data: result.details || {} });
                /* setTimeout(() => {
                    dispatch({ type: TYPE.SIGNIN_SUCCESS, data: res.data.result });
                }, 3000); */
            }
        } catch (e) {
            console.log(e);
            //dispatch({ type: TYPE.GET_BANNER_ERROR });
        }
    }
}
