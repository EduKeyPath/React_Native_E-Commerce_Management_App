import React from 'react';
import {Spinner, View} from 'native-base';

export default function InLoading() {
    return (
        <View style={{height:30, position:'absolute', top:0, width:30}}>
            <Spinner color='#2e86c9' style={{top:-20, transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]}} />
        </View>
    )
}