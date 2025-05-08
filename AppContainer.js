import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import {StyleSheet, Image } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import Home from './src/Components/Home';
import { SignIn } from './src/Components/Auth/';
import { Profile, EditProfile, Products,ProductDetails, GroupProducts,GroupProductDetails, Orders, OrderDetails, ChangePassword } from './src/Components/Content/';

const MainNavigator = createStackNavigator({
  Home: { screen: Home, navigationOptions: { headerShown: false, gestureEnabled: false,
              ...TransitionPresets.SlideFromLeftIOS,
              gestureDirection: 'horizontal-inverted'
    } },
  Profile: { screen: Profile, navigationOptions: {headerShown: false, gestureEnabled: false} },
  EditProfile: { screen: EditProfile, navigationOptions: {headerShown: false, gestureEnabled: false} },
  Products: { screen: Products, navigationOptions: {headerShown: false, gestureEnabled: false} },
  ProductDetails: { screen: ProductDetails, navigationOptions: {headerShown: false, gestureEnabled: false} },
  GroupProducts: { screen: GroupProducts, navigationOptions: {headerShown: false, gestureEnabled: false} },
  GroupProductDetails: { screen: GroupProductDetails, navigationOptions: {headerShown: false, gestureEnabled: false} },
  Orders: { screen: Orders, navigationOptions: {headerShown: false, gestureEnabled: false} },
  OrderDetails: { screen: OrderDetails, navigationOptions: {headerShown: false, gestureEnabled: false} },
  ChangePassword: { screen: ChangePassword, navigationOptions: {headerShown: false, gestureEnabled: false} },
  SignIn: { screen: SignIn, navigationOptions: { headerShown: false, gestureEnabled: false } },
  },
	{
		initialRouteName: 'SignIn',
		defaultNavigationOptions: {
			...TransitionPresets.SlideFromRightIOS
		},
  }
);

export const MainContainer = createAppContainer(MainNavigator);