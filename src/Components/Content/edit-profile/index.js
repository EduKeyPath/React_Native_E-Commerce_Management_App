import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditProfileComponent from './edit-profile';
import { signin } from '../../../redux/actions/auth';

const EditProfile    =   ({signin, navigation, isProcessing, isSuccess})    =>  {
    return (
        <EditProfileComponent
            signin={signin}
            navigation={navigation}
            isProcessing={isProcessing}
            isSuccess={isSuccess}
        />
    )
}

function mapStateToProps({authReducer}, ownProps) {
    return {
        navigation: ownProps.navigation,        
        isProcessing: authReducer.isLoginProcessing,        
        isSuccess: authReducer.isSuccess
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signin:signin
      }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);