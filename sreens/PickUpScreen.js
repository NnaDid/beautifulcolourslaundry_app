import {
    StyleSheet,
    Text,
    View, 
    TextInput,
    Pressable,
    ScrollView,
    Alert
  } from "react-native";
  import React, { useState } from "react";
  import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
  import { useSelector } from "react-redux";
  import { useNavigation } from "@react-navigation/native";
import { Colors } from "../data/Colors";

import { SafeAreaView } from 'react-native-safe-area-context'
  
  const PickUpScreen = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);

    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [deliveryLocation, setDeliveryLocation] = useState([]);
    const [address, setAddress] = useState("");
    

    const deliveryTime = [
      {
        id: "0",
        name: "2-3 Days",
      },
      {
        id: "1",
        name: "3-4 Days",
      },
      {
        id: "2",
        name: "4-5 Days",
      },
      {
        id: "3",
        name: "5-6 Days",
      },
      {
        id: "4",
        name: "Tommorrow",
      },
    ];
  
    const times = [
      {
        id: "0",
        time: "11:00 AM",
      },
      {
        id: "1",
        time: "12:00 PM",
      },
      {
        id: "2",
        time: "1:00 PM",
      },
      {
        id: "2",
        time: "2:00 PM",
      },
      {
        id: "4",
        time: "3:00 PM",
      },
      {
        id: "5",
        time: "4:00 PM",
      },
    ];

    const locationAxis = [
          {
            name:"Beverly Hills Axis",
            price:800,
          },
          {
            name:"Housing gate Axis",
            price:1000,
          },
          {
            name:"NTA Trans-Nkisi Axis",
            price:1500,
          },
          {
            name:"GRA Axis",
            price:800,
          },
          {
            name:"Limca Road Axis",
            price:1200,
          },
          {
            name:"Awka Road Axis",
            price:1000,
          },
          {
            name:"Nkpor Junction Axis",
            price:1500,
          },
          {
            name:"Afor Nkpor Axis",
            price:3000,
          },
          {
            name:"Eke Nkpor Axis",
            price:2000,
          },
          {
            name:"Oba Axis",
            price:6000,
          },
          {
            name:"Obosi Axis",
            price:4000,
          },
          {
            name:"Ogidi Axis",
            price:2000,
          },
          {
            name:"Awka",
            price:5000,
          },
          {
            name:"Asaba",
            price:5000,
          },
    ];


    const navigation = useNavigation();
    const proceedToCart = () => {
        if(!selectedDate || !selectedTime || !delivery || !deliveryLocation || !address){
          Alert.alert(
              "Empty or invalid",
              "Please select all the fields",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
        }
        if(selectedDate && selectedTime && delivery && deliveryLocation && address){
          console.log(selectedDate);
          navigation.replace("Cart",{
              pickUpDate:selectedDate,
              selectedTime:selectedTime,
              no_Of_days:delivery,
              locationAxis:deliveryLocation,
              address: address
  
          })
        }
    }


    const dateForm = ( days_toadd )=>{
      let formattedDate = ``;
      const today = new Date();
      if(days_toadd){ 
          // Add  {days_toadd} days to the current date
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + days_toadd); 
          // Format the future date in "year-month-day" format
          const year    = nextWeek.getFullYear();
          const month   = String(nextWeek.getMonth() + 1).padStart(2, '0');
          const day     = String(nextWeek.getDate()).padStart(2, '0');
          formattedDate = `${year}-${month}-${day}`;
      }else{ 
        const year    = today.getFullYear();
        const month   = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day     = String(today.getDate()).padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
      }

      return formattedDate;
      
    }

    
    const  formatWithCommas = (x)=> {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
    return (
      <>
        <SafeAreaView>
          <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10, marginTop:15 }}>
            Pickup / Delivery Address
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "gray",
              borderWidth: 0.7,
              paddingVertical: 10,
              borderRadius: 9,
              margin: 10,
            }}
            multiline={true} 
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
  
          <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Select pickup Date
          </Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={dateForm()}
            endDate={dateForm(14)}
            initialSelectedDate={dateForm(7)}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor= { Colors.primary }
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
  
          <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Select pickup Time
          </Text>
  
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedTime(item.time)}
                style={ selectedTime.includes(item.time) ? styles.selected : styles.normal }
              >
                <Text style={ selectedTime.includes(item.name) ? styles.normal_font : ''  }>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Delivery Date
          </Text>
  
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item, i) => (
              <Pressable
                style={  delivery.includes(item.name) ? styles.selected : styles.normal  }
                onPress={() => setDelivery(item.name)}
                key={i}
              > 
                <Text style={ delivery.includes(item.name) ? styles.normal_font  : ''  }>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
            Select your location
          </Text>
  
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {locationAxis.map((item, i) => (
              <Pressable
                style={ deliveryLocation.includes(item.name) ? styles.selected : styles.normal  }
                onPress={() => setDeliveryLocation(item)}
                key={i}
              > 
                <Text style={ deliveryLocation.includes(item.name) ? styles.normal_font  : '' }>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
  
        {total === 0 ? null : (
          <Pressable  style={styles.itemscard}  >
            <View>
              <Text style={[styles.normal_font,{ fontSize: 17, fontWeight: "600"}]}>
                {cart.length} items | &#x20A6; {formatWithCommas(total)}
              </Text>
              <Text
                style={styles.normal_font}
              >
                Extra charges might apply
              </Text>
            </View>
  
            <Pressable onPress={proceedToCart}>
              <Text style={[styles.normal_font,{ fontSize: 17, fontWeight: "600"}]}>
                Proceed to Cart
              </Text>
            </Pressable>
          </Pressable>
        )}
      </>
    );
  };
  
  export default PickUpScreen;
  
  const styles = StyleSheet.create({
    selected:{
      color: Colors.white,
      margin: 10,
      borderRadius: 7,
      padding: 15,
      borderColor: Colors.primary ,
      borderWidth: 0.7,
      backgroundColor: Colors.primary,
    },
    normal:{
      margin: 4,
      borderRadius: 7,
      padding: 10,
      borderColor: "gray",
      borderWidth: 0.7,
    },
    itemscard:{
      backgroundColor: Colors.primary,
      marginTop:"auto",
      padding: 10,
      marginBottom: 40,
      margin: 15,
      borderRadius: 7,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    normal_font: {
      fontSize: 15,
      fontWeight: "400",
      color: "white", 
    }
  });