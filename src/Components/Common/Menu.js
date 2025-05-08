import React from "react";
import { AppRegistry, Image, StatusBar, StyleSheet } from "react-native";
import { Container, View, Content, Text, List, ListItem, Button, Icon, Left, Body, Right, Switch, Thumbnail } from "native-base";
const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.headerProfileBar}>
            <View style={styles.headerProfileBarLeft}>
              <Text style={styles.hi}>Hi,</Text>
              <Text style={styles.userName}>Abinash</Text>
              <Text style={styles.subTitle}>Welcome to Ecommerce</Text>
            </View>
            <View style={styles.headerProfileBarRight}>
              <Image source = {require('../no-profile-img.jpg')}
                 style={styles.headerProfileImg} />
            </View>
          </View>
          <ListItem icon>
            <Body style={styles.menuRow}>
                <Icon name="home" style={[styles.menuIcon, styles.menuSeleted]}/>
                <Text style={[styles.menuName, styles.menuSeleted]}>Home</Text>
            </Body>
            <Right>
              <Icon style={[styles.menuSeleted]} name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this.props.navigation.navigate('SignIn', {from: 'menu'})}>
            <Body style={styles.menuRow}>
                <Icon name="business-outline" style={styles.menuIcon} />
                <Text style={styles.menuName}>Who we are</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Body style={styles.menuRow}>
                <Icon name="ios-help-circle-outline" style={styles.menuIcon} />
                <Text style={styles.menuName}>FAQ</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Body style={styles.menuRow}>
                <Icon name="headset-outline" style={styles.menuIcon} />
                <Text style={styles.menuName}>Contact</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Body style={styles.menuRow}>
                <Icon name="information-circle-outline" style={styles.menuIcon} />
              <Text style={styles.menuName}>Privacy Policy</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Body style={styles.menuRow}>
              <Icon name="information-circle-outline" style={styles.menuIcon} />
              <Text style={styles.menuName}>Terms and Conditions</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Body style={styles.menuRow}>
              <Icon name="lock-closed-outline" style={styles.menuIcon} />
              <Text style={styles.menuName}>Login</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Body style={styles.menuRow}>
              <Icon name="people-outline" style={styles.menuIcon} />
              <Text style={styles.menuName}>Register</Text>
            </Body>
            <Right>
              <Icon name="chevron-forward-outline" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headerProfileImg : {width:75, height:75, borderRadius:50},
  headerProfileBar : {padding:10,flexDirection: "row", justifyContent: 'space-between'},
  hi : {fontFamily: "AvenirBook",fontSize:15,marginTop:5, fontWeight:'100', color:'#ccc'},
  userName : {fontFamily: "OpensansSemiBold",fontSize:22, color:'#2e86c9'},
  subTitle : {fontFamily: "AvenirBook",fontSize:13, marginTop:3, fontWeight:'500', color:'#d60022'},
  menuRow : {flexDirection:'row', justifyContent:'flex-start', alignItems:'center'},
  menuIcon : {fontSize:18, marginRight:10 },
  menuName : {fontFamily: "AvenirBook",fontSize:14},
  menuSeleted : {color:'#2e86c9'},
})