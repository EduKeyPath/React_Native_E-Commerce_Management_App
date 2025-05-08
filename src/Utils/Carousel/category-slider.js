import React from 'react'
import {StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native';
import {isEmpty} from 'lodash';

export const CategoryCarousel = (props) => {
  const { label, image, style } = props;
  let user =   props.userData || {};

  return (
    <View>
      {
        (!isEmpty(user))?
        (user.type === 'Employee') ?
        <TouchableOpacity onPress={() => props.navigation.navigate('FindManger')}>
          <View style={styles.categoryCarousel}>
            <View style={[style, {paddingRight:20, paddingLeft:15}]}>
              <Image source = {image} style={styles.catImg} />
              <Text style={styles.catText}>{label}</Text>
            </View>
          </View>
        </TouchableOpacity> :
        <TouchableOpacity onPress={() => props.navigation.navigate('FindEmployee')}>
          <View style={styles.categoryCarousel}>
            <View style={[style, {paddingRight:20, paddingLeft:15}]}>
              <Image source = {image} style={styles.catImg} />
              <Text style={styles.catText}>{label}</Text>
            </View>
          </View>
        </TouchableOpacity> :
        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
          <View style={styles.categoryCarousel}>
            <View style={[style, {paddingRight:20, paddingLeft:15}]}>
              <Image source = {image} style={styles.catImg} />
              <Text style={styles.catText}>{label}</Text>
            </View>
          </View>
        </TouchableOpacity>
      }      
    </View>
  );
}

export default CategoryCarousel;

const styles = StyleSheet.create({
    categoryCarousel: {
        /* flexBasis: '25%',
        flex: 1,
        maxWidth: '25%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center', */
    },
    catImg : {width:65, height:65, borderRadius:50, marginLeft:'auto', marginRight:'auto'},
    catText : {fontFamily: "AvenirBook",textAlign: 'center', fontSize:13, marginTop:3}
  });