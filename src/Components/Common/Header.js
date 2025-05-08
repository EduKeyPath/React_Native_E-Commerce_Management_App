import React from 'react';
import { StyleSheet } from 'react-native';
import {Header, Left, Body, Right, Title, Button, Icon } from 'native-base';

export default function HeaderComponent(props) {
    return (     
        <Header style={[styles.hfBar, styles.header]}>
            <Left>
                <Button  onPress={() => props.openDrawer()} transparent >
                    <Icon style={styles.hfTextIcon} name='menu' />
                </Button>
            </Left>
            <Body>
                <Title style={[styles.hfTextIcon, styles.hdrTxt]}>Ecommerce</Title>
            </Body>
            <Right>
            </Right>
        </Header>
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
    headerBadge : {padding:0,position:'absolute', right:8, top:5, zIndex:2, width:17,maxWidth:'auto', height:17},
    headerBadgeText : {padding:0,margin:0,left:-3,fontSize:11, lineHeight:11,minWidth:10,maxWidth:20, height:10}
})