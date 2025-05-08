/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Image, ImageBackground } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
//import AppIntroSlider from 'react-native-app-intro-slider';
//import 'react-native-gesture-handler';
import store from './redux.config/store';
import { Provider } from 'react-redux';
import {View, Drawer, Container, Header, Left, Body, Right, Title, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import {MainContainer} from './AppContainer';
import FilterDrawer from './Drawer';
import AsyncStorage from '@react-native-community/async-storage';
//import {decode, encode} from'base-64';
import {Storage} from './src/Helper/storage';


export default class App extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
      // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render(){
    return (
      <Provider store={store}>
            <MainContainer />
        </Provider>
      )
  }
};
const drawerStyles = {
  drawer: { width:'100%',shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3}
}
const styles = StyleSheet.create({
    introSlide : {backgroundColor:'#0085c8'},
    introSlideWrap : {width: '100%', height: '100%', padding:25, justifyContent:'center'},
    introIcon : {width:100, height:100, marginTop:-60},
    heading : { fontSize:40, lineHeight:42, paddingTop:15, fontFamily: "ArchitectsDaughterRegular", color:'#fff'},
    subheading : { marginTop:5, fontFamily: "AvenirBook", color:'#fff'},
    hfBar : {backgroundColor:'#fff'},
    header : {borderBottomWidth:1, borderBottomColor:'#f7f7f7'},
    footer : {borderTopWidth:1, borderTopColor:'#f1f1f1'},
    hdrTxt : {fontFamily: "AvenirBook",fontSize:18},
    hfTextIcon : {color:'#000', opacity:0.5},
    hfTextIconActive : {color:'#d60022', opacity:1},
    footerText : {fontFamily: "AvenirBook",textTransform:'capitalize'},
    headerBadge : {padding:0,position:'absolute', right:8, top:5, zIndex:2, width:17,maxWidth:'auto', height:17},
    headerBadgeText : {padding:0,margin:0,left:-3,fontSize:11, lineHeight:11,minWidth:10,maxWidth:20, height:10}
})