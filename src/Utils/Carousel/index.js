import React, {useRef} from 'react'
import {StyleSheet } from 'react-native';
import { View, ScrollView } from 'react-native'
import { CategoryCarousel } from './category-slider'
import { ProductCarousel } from './product-slider';
import { PartnerCarousel } from './partner-slider';
import { BrandCarousel } from './brand-slider';

export const Carousel = (props) => {
  const scrollRef = useRef();
  const { items, style, type } = props;
  const itemsPerInterval = props.itemsPerInterval === undefined
    ? 1
    : props.itemsPerInterval;

  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  }

  const handleClick = number => {
    scrollRef.current.ScrollTo({
      y: (100 * number),
      animated: true
    })
  }
  
  return (
    <View style={styles.container}>
      <ScrollView  ref={scrollRef} 
        horizontal={true}
        contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
        autoplay={true}
      >
        {items.map((item, index) => {
              return (
                <ProductCarousel
                  key={index}
                  index={index}
                  id={item.id}
                  label={item.label}
                  value={item.value}
                  image={item.image}
                  style={item.style}
                  subtitle={item.subtitle}
                  price={item.price}
                  cutprice={item.cutprice}
                  navigation={props.navigation}
                />
              );
        })}
      </ScrollView>
    </View>
  )
}

export default Carousel;

const styles = StyleSheet.create({    
    container: {
      width: '100%'
    },
    scrollView: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
    }
  });