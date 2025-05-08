import {home} from '../constants/home';
import {callApi} from '../../Helper/api';
import {error as notifyError, success as notifySuccess} from '../../Utils/notify'
//Login
export function getBanner() {
    return async (dispatch) => {
        try {
            dispatch({ type: home.GET_BANNER });
            const res = await callApi('GET', `act=content&section=homeSlider`);
            if (res.data.error) {
                console.log(res.data.error);
                dispatch({ type: home.GET_BANNER_ERROR });
                notifyError(res.data.error);
            }
            else {
                let result = res.data.result || {};
                dispatch({ type: home.GET_BANNER_SUCCESS, data: result.banner });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
