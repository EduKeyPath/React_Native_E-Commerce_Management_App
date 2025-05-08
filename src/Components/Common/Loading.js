import React from 'react';
import {Spinner, View} from 'native-base';

export default function Loading() {
    return (
        <View style={{height:150, alignItems:'center', justifyContent:'center', width:'100%'}}>
            <Spinner color='#2e86c9' />
        </View>
    )
}