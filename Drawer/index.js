import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DrawerComponent from './drawer';
import { logout } from '../src/redux/actions/auth';
const SideBar    =   ({logout, navigation, closeDrawer, userData})    =>  {
  return (
      <DrawerComponent
        logout={logout}
          navigation={navigation}
          closeDrawer={closeDrawer}
          userData={userData}
      />
  )
}

function mapStateToProps({authReducer}, ownProps) {
  return {
      navigation: ownProps.navigation,
      closeDrawer: ownProps.closeDrawer,
      userData: authReducer.userData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      logout:logout
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);