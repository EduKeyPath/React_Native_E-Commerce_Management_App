import { combineReducers } from 'redux';
import authReducer from './auth';
import cartReducer from './cart';
//import homeReducer from './home';
import dashboardReducer from './dashboard';
export default combineReducers({
	authReducer,
	dashboardReducer,
	cartReducer
	//homeReducer
})