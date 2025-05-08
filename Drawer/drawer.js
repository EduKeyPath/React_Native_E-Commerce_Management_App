import React from "react";
import { AppRegistry, Image, StatusBar, StyleSheet } from "react-native";
import { Container, View, Content, Text, List, ListItem, Button, Icon, Left, Body, Right, Switch, Thumbnail } from "native-base";
import {isEmpty} from 'lodash';
import AsyncStorage from '@react-native-community/async-storage'

const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  

  gotopage(pagename, params) {
    this.props.closeDrawer();
    if(!!params)
      this.props.navigation.navigate(pagename, params);
    else
      this.props.navigation.navigate(pagename);
  }
  
  logout = () => {
    AsyncStorage.removeItem('user');
    this.props.logout();
    this.props.navigation.navigate('SignIn')
  }

  toggleLoginMenu() {
      let user        =   this.props.userData || {};
      let state       =   this.props.navigation.state;
      let routeName   =   state.routeName;
      if(!isEmpty(user)) {
        return (
          <>
            <ListItem icon onPress={() => this.gotopage('Profile')}>
              <Body style={styles.menuRow}>
                  <Icon name="person-outline" style={[styles.menuIcon, (routeName === 'Profile') ? styles.menuSeleted : '']} />
                  <Text style={[styles.menuName, (routeName === 'Profile') ? styles.menuSeleted : '']}>Profile</Text>
              </Body>
              <Right>
                <Icon name="chevron-forward-outline" />
              </Right>
            </ListItem>
            <ListItem icon onPress={() => this.gotopage('EditProfile')}>
              <Body style={styles.menuRow}>
                  <Icon name="person-outline" style={[styles.menuIcon, (routeName === 'EditProfile') ? styles.menuSeleted : '']} />
                  <Text style={[styles.menuName, (routeName === 'EditProfile') ? styles.menuSeleted : '']}>Edit Profile</Text>
              </Body>
              <Right>
                <Icon name="chevron-forward-outline" />
              </Right>
            </ListItem>
            <ListItem onPress={this.logout} icon>
              <Body style={styles.menuRow}>
                <Icon name="log-out-outline" style={[styles.menuIcon, (routeName === 'Logout') ? styles.menuSeleted : '']} />
                <Text style={[styles.menuName, (routeName === 'Logout') ? styles.menuSeleted : '']}>Logout</Text>
              </Body>
              <Right>
                <Icon name="chevron-forward-outline" />
              </Right>
            </ListItem>
          </>
        )
    } else {
      return (
          <>
            <ListItem onPress={() => this.props.navigation.push('SignIn')} icon>
              <Body style={styles.menuRow}>
                <Icon name="lock-closed-outline" style={[styles.menuIcon, (routeName === 'SignIn') ? styles.menuSeleted : '']} />
                <Text style={[styles.menuName, (routeName === 'SignIn') ? styles.menuSeleted : '']}>Login</Text>
              </Body>
              <Right>
                <Icon name="chevron-forward-outline" />
              </Right>
            </ListItem>
          </>
      )
    }
  }

  render() {
    let state       =   this.props.navigation.state;
    let routeName   =   state.routeName;
    let user        =   this.props.userData || {};
    let picture     =   require('../src/assets/img/no-profile-img.jpg');
    if(!!user && !!user.picture)
        picture     =   {uri : user.picture};

    return (
      <Container>
        <Content>
          <View style={styles.headerProfileBar}>
            <View style={styles.headerProfileBarLeft}>
              <Text style={styles.hi}>Hi,</Text>
              {
                (!!user.name)? 
                  <Text style={styles.userName}>{user.name}</Text>
                :<Text style={styles.userName}>Guest User</Text>
              }
              <Text style={styles.subTitle}>Welcome to Ecommerce</Text>
            </View>
          </View>
          <ListItem icon onPress={() => this.gotopage('Home')}>
            <Body style={styles.menuRow}>
                <Icon name="home" style={[styles.menuIcon, (routeName === 'Home') ? styles.menuSeleted : '']}/>
                <Text style={[styles.menuName, (routeName === 'Home') ? styles.menuSeleted : '']}>Dashboard</Text>
            </Body>
            <Right>
              <Icon style={[styles.menuSeleted]} name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this.gotopage('ChangePassword')}>
            <Body style={styles.menuRow}>
                <Icon name="lock-closed-outline" style={[styles.menuIcon, (routeName === 'ChangePassword') ? styles.menuSeleted : '']} />
                <Text style={[styles.menuName, (routeName === 'ChangePassword') ? styles.menuSeleted : '']}>Change Password</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>          
          <ListItem icon onPress={() => this.gotopage('Products')}>
            <Body style={styles.menuRow}>
                <Icon name="cube-outline" style={[styles.menuIcon, (routeName === 'Products') ? styles.menuSeleted : '']} />
                <Text style={[styles.menuName, (routeName === 'Products') ? styles.menuSeleted : '']}>Manage Products</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this.gotopage('Orders')}>
            <Body style={styles.menuRow}>
                <Icon name="ios-clipboard-outline" style={[styles.menuIcon, (routeName === 'Orders') ? styles.menuSeleted : '']} />
              <Text style={[styles.menuName, (routeName === 'Orders') ? styles.menuSeleted : '']}>Manage Orders</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          {this.toggleLoginMenu()}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headerProfileImg : {width:75, height:75, borderRadius:50},
  headerProfileBar : {padding:10,flexDirection: "row", justifyContent: 'space-between'},
  hi : {fontFamily: "AvenirBook",fontSize:15,marginTop:5, fontWeight:'100', color:'#ccc'},
  userName : {fontFamily: "OpensansSemiBold",fontSize:22, color:'#0085c8'},
  subTitle : {fontFamily: "AvenirBook",fontSize:13, marginTop:3, fontWeight:'500', color:'#d60022'},
  menuRow : {flexDirection:'row', justifyContent:'flex-start', alignItems:'center'},
  menuIcon : {fontSize:18, marginRight:10 },
  menuName : {fontFamily: "AvenirBook",fontSize:14},
  menuSeleted : {color:'#0085c8'},
})