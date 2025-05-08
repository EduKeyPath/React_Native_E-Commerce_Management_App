import React from 'react'
import {StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProductCarousel = (props) => {
  const { id, label, image, subtitle, price, cutprice, style } = props;
  return (
    <View style={styles.productCarousel}>
      <View style={style}>
        <TouchableOpacity onPress={() => props.navigation.push('ProductDetails', {id: id})}>
            <View style={styles.productImgWrap}>
              <Image source = {image}
              style={styles.productImg} />
            </View>                                
            <Text style={styles.prosubTitle}>{subtitle}</Text>
            <Text style={styles.protitle}>{label}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.price}>{'\u20B9'}{price}</Text>
                <Text style={styles.cutPrice}>{'\u20B9'}{cutprice}</Text>    
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default ProductCarousel;

const styles = StyleSheet.create({
    productCarousel: {
      flexBasis: '33%',
      flex: 1,
      maxWidth: '33%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    productImgWrap : {width:'100%', alignItems:'center', padding:2, backgroundColor:'#f6fafd', borderRadius:5},
    productImg : {width:'100%', height:120},
    prosubTitle : {fontFamily: "AvenirBook",fontSize:10, color:'#b6b9c9'},
    protitle : {fontFamily: "AvenirBook",fontSize:12, color:'#484c5e', marginBottom:2},
    price : {fontFamily: "AvenirBook",fontSize:16, fontWeight:'500', color:'#008ad2'},
    cutPrice : {fontFamily: "AvenirBook",fontSize:12, color:'#b6b9c9', marginLeft:7, textDecorationLine: 'line-through'}
  });