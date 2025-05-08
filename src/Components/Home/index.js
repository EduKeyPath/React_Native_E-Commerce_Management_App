import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeComponent from './home';
import { setUserData } from '../../redux/actions/auth';

const Home    =   ({navigation, userData, setUserData})    =>  {
    return (
        <HomeComponent
            userData={userData}
            navigation={navigation}
            setUserData={setUserData}
        />
    )
}

function mapStateToProps({authReducer}, ownProps) {
    return {
        navigation: ownProps.navigation,
        userData: authReducer.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserData:setUserData
      }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);