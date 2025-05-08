import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet  } from 'react-native';
import {View, Text, Icon, Button,  Form, Input, Item, Label} from 'native-base';
import { isEmpty } from 'lodash';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function CustomDropdown(props) {
    const drpRef = useRef(null);
    const [dropdownTxt, setDropdownTxt]     =   useState('');
    let [show, setShow]   = useState(false);

    useEffect(() => { 
        setDropdownTxt((!isEmpty(props.selected)) ? props.selected[props.label] : '');
    }, [props.selected]);
    
    const clearSrch =   ()  =>  {
        setDropdownTxt('');
        setShow(true);
    }

    const showDrpdwn  = (e)  =>  {
        e.stopPropagation();
        setShow(!show);
    }    

    const handleSelect = (e, selected) => {
        e.stopPropagation();
        setDropdownTxt(selected.value);
        setShow(false);
        props.onSelect(selected);
    }
    const onChangeHandle = (text) => {
        setDropdownTxt(text)
        setShow(true);
    }

    return (
        <View style={styles.optionWrap} ref={drpRef} className="uniqueClassName" onPress={showDrpdwn}>
            <TouchableWithoutFeedback onPress={() => {}}>
            <Item stackedLabel>
                <Input style={styles.txtInput} 
                    onFocus={clearSrch} 
                    placeholder={(!!props.placeholder) ? props.placeholder : 'Select'} 
                    onChangeText={text => onChangeHandle(text)}
                    name="dropdownTxt"
                    value={dropdownTxt}
                />
            </Item>
            {
                (!!show) ?
                <View style={styles.optionListRow}>
                    {
                        (!!props.options && props.options.length > 0) ?
                        (props.options || []).map((item, k) => {
                            let dpText = (!!dropdownTxt)?dropdownTxt:"";
                            return(
                                (!!item[props.label] && item[props.label].toLowerCase().includes(dpText.toLowerCase()))?
                                <View style={styles.optionRow}>
                                    <Text style={styles.subTxt} key={k} onClick={(e) => handleSelect(e, item)}>{item[props.label]}</Text>
                                </View>
                                :null
                            )
                        }) : <Text>No Option(s)</Text>                    
                    }
                </View> : null
            }
            </TouchableWithoutFeedback>
        </View>
    )
}


const styles = StyleSheet.create({
    optionWrap : { position:'relative',zIndex:999},
    optionListRow : {position:'absolute', minHeight:300, overflow:'scroll', zIndex:999999, backgroundColor:'red', width:'100%', top:78, elevation:1},
    optionRow : {backgroundColor:'red', width:'100%', flexDirection:'row', padding:8, alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#ddd'},
    subTxt : { fontFamily: "AvenirBook", color:'#2d2d2d', fontSize:14, lineHeight:20, opacity:0.6},
    txtRow : {marginBottom:0},
    txtLabel: {
        fontSize: 13,opacity:0.5,
        color: '#606060', marginLeft:-10
    },
    txtInput: {
        fontSize: 14, padding:0, color: '#000', marginLeft:-10
    }
})