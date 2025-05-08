import React from 'react';
import {Text, View, Icon} from 'native-base';

export default function NoData() {
    return (
        <View style={{height:200, alignItems:'center', justifyContent:'center', width:'100%', backgroundColor:'#f6fafd', borderRadius:10}}>
            <Icon name="document-text-outline" style={{fontSize:80, opacity:0.7}} />
            <Text style={{fontSize:20, opacity:0.7}}>No Data</Text>
        </View>
    )
}