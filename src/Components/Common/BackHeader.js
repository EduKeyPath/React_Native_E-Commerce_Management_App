import React from 'react';
import { StyleSheet } from 'react-native';
import {Header, Left, Body, Right, Title, Button, Icon} from 'native-base';

export default function BackHeaderComponent(props) {
    return (   
        <Header style={[styles.hfBar, styles.header, styles.blueHeader]}>
            <Left>{/* */}
                <Button transparent onPress={() => props.navigation.goBack()}>
                    <Icon style={[styles.hfTextIcon, styles.blueHeader]} name='return-up-back-outline' />
                </Button>
            </Left>
            <Body>
                <Title style={[styles.hfTextIcon, styles.hdrTxt, styles.blueHeader]}>{props.title}</Title>
            </Body>
            <Right>
            </Right>
        </Header>
    )
}

const styles = StyleSheet.create({
    blueHeader : {backgroundColor:'#2e86c9', color:'#fff'},
    hfBar : {backgroundColor:'#fff'},
    header : {/* borderBottomWidth:1, borderBottomColor:'#f7f7f7' */},
    footer : {borderTopWidth:1, borderTopColor:'#f1f1f1'},
    hdrTxt : {fontFamily: "AvenirBook",fontSize:18},
    hfTextIcon : {color:'#000', opacity:0.5},
    hfTextIconActive : {color:'#d60022', opacity:1},
    footerText : {fontFamily: "AvenirBook",textTransform:'capitalize'},
    headerBadge : {padding:0,position:'absolute', right:8, top:5, zIndex:2, width:17,maxWidth:'auto', height:17},
    headerBadgeText : {padding:0,margin:0,left:-3,fontSize:11, lineHeight:11,minWidth:12,maxWidth:20, height:10}
})