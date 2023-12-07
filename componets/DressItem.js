import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { Colors } from '../data/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity } from '../CartReducer'
import { decrementQty, incrementQty } from '../ProductReducer'

const DressItem = ({ item }) => {
    const dispatch = useDispatch();
    const Cart = useSelector( (state) => state.cart.cart);

    const addItemToCart = ()=>{
        dispatch(addToCart(item));    // added to cart
        dispatch(incrementQty(item))  // product
    }

    return (
        <View>
            <Pressable style={styles.main}>
                <View>
                    <Image source={{ uri: item.image }} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
                </View>

                <View>
                    <Text style={{ width: 83, fontSize: 17, fontWeight: '500', marginBottom: 7 }}> {item.name}</Text>
                    <Text style={{ width: 60, color: Colors.white, fontSize: 15 }}> NGN {item.price}</Text>
                </View>

        {Cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); // cart
                dispatch(decrementQty(item)); // product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQty(item)); // cart
                dispatch(incrementQty(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={styles.addbtnText} > Add  </Text>
          </Pressable>
        )}
            </Pressable>
        </View>
    )
}

export default DressItem

const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.pink,
        borderRadius: 8, padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 14,
        marginVertical:2
    },
    addbtnText: {
        borderColor: Colors.white, 
        borderWidth: 0.8, 
        margin: 10, 
        textAlign: 'center', 
        padding: 10, 
        borderRadius: 3,
        color: Colors.primary
    }
})