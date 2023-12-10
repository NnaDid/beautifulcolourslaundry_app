import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
    ActivityIndicator
  } from "react-native";
  import { Feather } from '@expo/vector-icons';
  import { Ionicons } from "@expo/vector-icons";
  import React, { useState } from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth, db } from "../firebase";
  import { doc, setDoc } from "firebase/firestore";
  import Logo from '../assets/logo.jpg';
import { Image } from "react-native";
import { Colors } from "../data/Colors";

  const RegisterScreen = () => {
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [phone,setPhone] = useState("");

      const [registering,setRegistering] = useState(false);
      const navigation = useNavigation();

      const register = () => {
        setRegistering(true);
        if(email === "" || password === "" || phone === ""){
          Alert.alert(
            "Invalid Details",
            "Please fill all the details",
            [
              {
                text: "Cancel",
                onPress: () => setRegistering(false),
                style: "cancel"
              },
              { text: "OK", onPress: () => setRegistering(false) }
            ],
            { cancelable: false }
          );
        }else{
            createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
              console.log("user credential",userCredential);
              const user = userCredential._tokenResponse.email;
              const myUserUid = auth.currentUser.uid;
              console.log(myUserUid);
      
              setDoc(doc(db,"users",`${myUserUid}`),{
                email:user,
                phone:phone
              }).then( (result) =>{
                setRegistering(false);
                  console.log(result);
              })
              .catch( (error)=>{
                Alert.alert(
                  "Error",
                  error.message,
                  [
                    {
                      text: "Cancel", onPress: () => console.log("Cancel Pressed",error.message), 
                    },
                    { text: "OK", onPress: () => setRegistering(false) }
                  ],
                  { cancelable: false }
                );
              });
            }).catch( (error)=>{
              Alert.alert(
                "Error",
                error.message,
                [
                  {
                    text: "Cancel", onPress: () => console.log("Cancel Pressed",error.message), 
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed! But cannot proceed") }
                ],
                { cancelable: false }
              );
            });
        }

      }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          padding: 10,
        }}
      >
        <ScrollView>
          <KeyboardAvoidingView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Image source={Logo} style={{ width:150, height:150, resizeMode:'contain'}}/>
              <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
                Register
              </Text>
    
              <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
                Create a new Account
              </Text>
            </View>
    
            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color={ Colors.primary}
                />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  style={{
                    fontSize: email ? 18 : 18,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    width: 300,
                    marginVertical: 10,
                  }}
                />
              </View>
    
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="key-outline" size={24}  color={ Colors.primary }/>
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="black" 
                  style={{
                    fontSize: password ? 18 : 18,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    width: 300,
                    marginVertical: 20,
                  }}
                />
              </View>
    
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="phone" size={24}  color={ Colors.primary } />
                <TextInput
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  placeholder="Phone No"
                  placeholderTextColor="black"
                  keyboardType="phone-pad"
                  style={{
                    fontSize: password ? 18 : 18,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    width: 300,
                    marginVertical: 10,
                  }}
                />
              </View>
    
              <Pressable
                onPress={register}
                style={{
                  width: 200,
                  backgroundColor: Colors.primary,
                  padding: 15,
                  borderRadius: 7,
                  marginTop: 50,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                {registering ? <ActivityIndicator color={Colors.white} /> : "Register"}
                </Text>
              </Pressable>
    
              <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    color: "gray",
                    fontWeight: "500",
                  }}
                >
                  Already have a account?  <Text style={{ color: Colors.primary }}>Sign in</Text>
                 
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  
  const styles = StyleSheet.create({});