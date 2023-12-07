import { StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native'
import React from 'react'
import { Colors } from '../data/Colors';

const Services = () => {
const services = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
    name: "Washing",
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
    name: "Laundry",
  },
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
    name: "Wash & Iron",
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
    name: "Cleaning",
  },
];


  return (
    <View style={styles.intro}>
        <Text style={styles.heading}> Services Available </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { services.map((item, idx) => (
                <Pressable
                style={{
                    margin:10,
                    backgroundColor:Colors.primary,
                    padding:20,
                    borderRadius:10,
                }} 
                key={idx}
                >
                    <Image
                      source={{
                        uri:item.image
                      }}
                      style ={{
                        width:70, 
                        height:70, 
                        resizeMode:'contain'
                      }} 
                     />
                     <Text style={{ textAlign:'center',color: Colors.white,marginTop:10, }}> 
                      {item.name} 
                     </Text>
                </Pressable>
          )) }
      </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({
    intro:{
        padding:10,
    },
    heading:{
        fontSize:18,
        fontWeight:'bold',
        color: Colors.black,
    },
})