import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductsComponent from './manage-products';
import { signin } from '../../../redux/actions/auth';

const Products    =   ({signin, navigation, isProcessing, isSuccess})    =>  {
    return (
        <ProductsComponent
            signin={signin}
            navigation={navigation}
            isProcessing={isProcessing}
            isSuccess={isSuccess}
            params={navigation.state.params || {}}
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);