import {home} from '../constants/home';
const initialstate = {
    banner: []
}

export default homeReducer = (state=initialstate, action) => {
    switch (action.type) {
        case home.GET_BANNER:
            return {
                ...state,
                banner: []
            };
        case home.GET_BANNER_SUCCESS:
            return {
                ...state,
                banner: action.data || []
            };
        case home.GET_BANNER_ERROR:
            return {
                ...state,
                banner: []
            };
    
        default:
            return state;
    }
}