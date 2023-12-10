import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    ActivityIndicator,
    ScrollView
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useEffect, useState } from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  import Logo from '../assets/logo.jpg';
import { Image } from "react-native";
import { Colors } from "../data/Colors";
  const LoginScreen = () => {
    const [email, setEmail]       = useState("");
    const [loading,setLoading]    = useState(false);
    const [logingIn,setlogingIn]  = useState(false);
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
  
    useEffect(() => {
      setLoading(true);
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(!authUser){
          setLoading(false);
        }
        if(authUser){
          navigation.replace("Home");
        }
      });
  
      return unsubscribe;
    },[])
    
    const login = () => {
      setlogingIn(true);
      signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
        console.log("user credential",userCredential);
        const user = userCredential.user; 
        if( user ){
          setlogingIn(false);
        }
        console.log("user details",user)
      })
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
          
        {loading ? (
          <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
            <Text style={{marginRight:10}}>Loading</Text>
            <ActivityIndicator size="large" color={"red"}/>
          </View>
        ) : (
          <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Image source={Logo} style={{ width:150, height:150, resizeMode:'contain'}}/>
            <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
              Sign In
            </Text> 
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
              Sign In to your account
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
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
              <Ionicons name="key-outline" size={24} color={ Colors.primary } />
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
  
            <Pressable
              onPress={login}
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
                  {logingIn ? <ActivityIndicator color={Colors.white} /> : "Login"}
              </Text>
            </Pressable>
  
            <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                Don't have a account? <Text style={{ color: Colors.primary}}>Sign Up</Text>
                
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        )}
      </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});