import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

import { Colors } from '../data/Colors';
const Carousel = () => {
    const Images = [ 
        require('../assets/3.jpg'),
        require('../assets/2.jpg'),
        require('../assets/1.jpg'),
    ];
  return (
    <View>
      <SliderBox 
        images ={Images}
        autoPlay
        circleLoop
        dotColor={Colors.primary}
        inActiveDotColor={Colors.pink}
        ImagesComponentStyle={{
            borderRadius: 10,
            width: 8, 
        }}
      />
    </View>
  )
}

export default Carousel



const styles = StyleSheet.create({
     
})