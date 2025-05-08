import React from 'react';
import HeaderIcon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import {View, Drawer, Container, Header, Left, Body, Right, Title, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TransparentHeaderComponent(props) {
    return (     
        <Header style={[styles.hfBar, styles.header, styles.hfBarTransparent]}>
            <Left>{/* */}
                <Button  onPress={() => props.navigation.goBack()} transparent >
                    <Icon style={styles.hfTextIcon} name='return-up-back-outline' />
                </Button>
            </Left>
            <Body>
                <Title style={[styles.hfTextIcon, styles.hdrTxt]}>{props.title}</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Icon style={styles.hfTextIcon} name='location-outline' />
                </Button>
                <Button transparent>
                    <Icon style={styles.hfTextIcon} name='search' />
                </Button>
                <Button transparent>
                    <Badge style={styles.headerBadge}><Text style={styles.headerBadgeText}>99</Text></Badge>
                    <Icon style={styles.hfTextIcon} name='notifications-outline' />
                </Button>
            </Right>
        </Header>
    )
}



const styles = StyleSheet.create({
    hfBar : {backgroundColor:'#fff'},
    header : {borderBottomWidth:1, borderBottomColor:'#f7f7f7'},
    hfBarTransparent : {backgroundColor:'transparent', borderBottomWidth:0},
    footer : {borderTopWidth:1, borderTopColor:'#f1f1f1'},
    hdrTxt : {fontFamily: "AvenirBook",fontSize:18},
    hfTextIcon : {color:'#000', opacity:0.5},
    hfTextIconActive : {color:'#d60022', opacity:1},
    footerText : {fontFamily: "AvenirBook",textTransform:'capitalize'},
    headerBadge : {padding:0,position:'absolute', right:8, top:5, zIndex:2, width:17,maxWidth:'auto', height:17},
    headerBadgeText : {padding:0,margin:0,left:-3,fontSize:11, lineHeight:11,minWidth:10,maxWidth:20, height:10}
})