import {cart} from '../../constants/cart';
import {callApi} from '../../../Helper/api';
import {error as notifyError, success as notifySuccess} from '../../../Utils/notify'
//Login
export function getCartList(data) {
    return async (dispatch) => {
        try {
            dispatch({ type: cart.GET_CART });
            const res = await callApi('GET', `act=store&section=myCart`);
            if (res.data.error) {
                console.log(res.data.error);
                dispatch({ type: cart.GET_CART_ERROR });
                notifyError(res.data.error);
            }
            else {
                let result = res.data.result || [];
                dispatch({ type: cart.GET_CART_SUCCESS, data: result.items || [] });
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
