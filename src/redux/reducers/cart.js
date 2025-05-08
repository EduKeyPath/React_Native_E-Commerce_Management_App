import {cart} from '../constants/cart';
const initialstate = {
    cartList: []
}

export default cartReducer = (state=initialstate, action) => {
    switch (action.type) {
        case cart.GET_CART:
            return {
                ...state,
                //cartList: []
            };
        case cart.GET_CART_SUCCESS:
            return {
                ...state,
                cartList: action.data || []
            };
        case cart.GET_CART_ERROR:
            return {
                ...state,
                cartList: []
            };
    
        default:
            return state;
    }
}