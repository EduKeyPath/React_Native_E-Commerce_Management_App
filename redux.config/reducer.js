const initialstate = {
    companyDetails: '',
    jobProfileDetails: '',
    navigationFlag: false,
}

export default stateValueManagement = (state=initialstate, action) => {
    switch (action.type) {
        case 'SAVE_COMPANY_DETAILS':
            return {
                ...state,
                companyDetails: action.companyDetails,
                navigationFlag: true
            };
        case 'SAVE_JOBPROFILE_DETAILS':
            return {
                ...state,
                jobProfileDetails: action.jobProfileDetails,
                navigationFlag: true
            };
        case 'CHANGE_NAVIGATION_STATUS':
            return {
                ...state,
                navigationFlag: action.navigationState
            };
    
        default:
            return state;
    }
}