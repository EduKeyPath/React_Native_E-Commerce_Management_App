import React from 'react';
import HeaderIcon from 'react-native-vector-icons/Ionicons';
import {Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { StyleSheet } from 'react-native';
import {isEmpty} from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function FooterComponent(props) {
    let state       =   props.navigation.state || {};
    let routeName   =   state.routeName;

    const gotoProfile   =   async ()  =>  {
        let user    =   props.userData || {};
        if(isEmpty(user)){
            if(routeName !== 'SignIn')
                props.navigation.push('SignIn', {from: 'footer'});
        }
    }
    let user = props.userData || {};

    return (   
        <Footer>
            <FooterTab style={[styles.hfBar, styles.footer]}>
                <Button onPress={() => props.navigation.navigate('Home')} vertical>
                    <Icon style={[styles.hfTextIcon, (routeName === 'Home') ? styles.hfTextIconActive : '']} name="home-outline" />
                    <Text style={[styles.footerText, styles.hfTextIcon, (routeName === 'Home') ? styles.hfTextIconActive: '']}>Home</Text>
                </Button>
                <Button onPress={gotoProfile} vertical>
                    <Icon style={[styles.hfTextIcon, (routeName === 'Profile') ? styles.hfTextIconActive : '']} name="person-outline" />
                    <Text style={[styles.footerText, styles.hfTextIcon, (routeName === 'Profile') ? styles.hfTextIconActive: '']}>Profile</Text>
                </Button>
            </FooterTab>
        </Footer>    
    )
}

const styles = StyleSheet.create({
    
    hfBar : {backgroundColor:'#fff'},
    header : {borderBottomWidth:1, borderBottomColor:'#f7f7f7'},
    footer : {borderTopWidth:1, borderTopColor:'#f1f1f1'},
    hdrTxt : {fontFamily: "AvenirBook",fontSize:18},
    hfTextIcon : {color:'#000', opacity:0.5},
    hfTextIconActive : {color:'#d60022', opacity:1},
    footerText : {fontFamily: "AvenirBook",textTransform:'capitalize'},
})

function mapStateToProps({authReducer}) {
    return {
        userData: authReducer.userData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent);