import {dashboard} from '../constants/dashboard';
const initialstate = {
    isLoading: false,
    details: {}
}

export default dashboardReducer = (state=initialstate, action) => {
    switch (action.type) {
        case dashboard.GET_DASHBOARD:
            return {
                ...state,
                isLoading: true,
                details: {}
            };
        case dashboard.GET_DASHBOARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                details: action.data || {}
            };
        case dashboard.GET_DASHBOARD_ERROR:
            return {
                ...state,
                isLoading: false,
                details: {}
            };
    
        default:
            return state;
    }
}