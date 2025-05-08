import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInComponent from './signin';
import { signin } from '../../../redux/actions/auth';

const SignIn    =   ({signin, navigation, params, isProcessing, isSuccess, userData, pagename})    =>  {
    return (
        <SignInComponent
            signin={signin}
            navigation={navigation}
            params={params}
            isProcessing={isProcessing}
            isSuccess={isSuccess}
            userData={userData}
            pagename={pagename}
        />
    )
}

function mapStateToProps({authReducer}, ownProps) {
    return {
        navigation: ownProps.navigation,
        params: (!!ownProps.navigation && !!ownProps.navigation.state) ? ownProps.navigation.state.params : {},
        isProcessing: authReducer.isLoginProcessing,
        isSuccess: authReducer.isSuccess,        
        userData: authReducer.userData,        
        pagename: authReducer.pagename
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signin:signin
      }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);