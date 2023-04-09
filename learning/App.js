import React,{ useRef, useState } from "react";
import { Text,DrawerLayoutAndroid, StyleSheet,Image,View,Button,Icon } from "react-native";
import CounterApp from "./screens/counter";
// import Challenge from "./screens/challenge";
// import CustomApp from "./screens/CustomApp";
// import Flatlistdata from "./screens/flatlist";
// import ImageData from "./screens/image";
// import Mybuttons from "./screens/mybutton";
// import CardDetail from "./components/card";
// import NetflixCard from "./components/netflixcard";
// import Demo from "./screens/DemoStyle";
// import Counter from "./screens/counter";
// import ColorGenerator from "./screens/color";
// import Hook from "./screens/hook";
import Login from "./screens/login";
import Drawerdesign from "./screens/drawer";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from "react-native-web";


const App = ()=>{
  // const myName= "Abdullah";
  // const myelement = <Text>hell world</Text>;
  // const getname = (first,last)=>{ 
  //   return `${first} ${last}`;
  // };
  const Stack = createNativeStackNavigator();
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <TouchableOpacity
              
              onPress={() => alert("ff")}
            >
              <Icon
            style={styles.icon}
            name="circle-thin"
            color="#31C283"
            size={20}
          />
            </TouchableOpacity>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );
  return(
    // <View>
    //   {/* <Text style={styles.textStyle}>hello {myName}</Text>
    //   {myelement}
    //   <CustomApp />
    //   <Challenge />
    //     <Flatlistdata /> 
    //     <ImageData />
    //   <Text>My full name{getname("Abdullah","Halari")}</Text>
    // <Mybuttons /> */}
    // {/* <CardDetail imgsrc={require("../learning/assets/1.jpg")}/> 
    // <CardDetail imgsrc={require("../learning/assets/2.jpg")}/>
    // <CardDetail imgsrc={require("../learning/assets/3.jpg")}/> */}
    // {/* <Demo /> */}
    // {/* <CounterApp /> */}
    // {/* <Hook /> */}
    // <Login />
    // </View>
  //   <NavigationContainer>
  //   <Stack.Navigator initialRouteName="Login">
  //       <Stack.Screen name="Login" component={Login} 
          
  //       />
  //       <Stack.Screen name="HOME" component={CounterApp} 
  //       options={{
  //         headerTitleStyle: {
  //           fontSize: 25,
  //           fontFamily: "Nunito_700Bold",
  //         },
  //         // headerTitle: "Courses",
  //         headerBackTitleVisible: false,
  //         headerTitleAlign: "center",
  //         // headerLeft: () => (
  //         //   <TouchableOpacity
            
  //         //   // onPress={() => navigation.navigate("Student")}
  //         //   >
  //         //   <Image
  //         //     style={styles.iconStytle}
  //         //     source={{
  //         //       uri: "https://img.icons8.com/stickers/100/000000/conference.png",
  //         //     }}
  //         //   />
  //         // </TouchableOpacity>
           
  //         // ),
         
  //       }}
  //       />
  //   </Stack.Navigator>
  // </NavigationContainer>
  <DrawerLayoutAndroid
  ref={drawer}
  drawerWidth={300}
  drawerPosition={drawerPosition}
  renderNavigationView={navigationView}
>
  <View style={styles.container}>
  
    <Text style={styles.paragraph}>
      Drawer on the {drawerPosition}!
    </Text>
    <Button
      title="Change Drawer Position"
      onPress={() => changeDrawerPosition()}
    />
    <Text style={styles.paragraph}>
      Swipe from the side or press button below to see it!
    </Text>
    <Button
      title="Open drawer"
      onPress={() => drawer.current.openDrawer()}
    />
  </View>
</DrawerLayoutAndroid>

  );
};

const styles =StyleSheet.create({
  textStyle: {
    color:"pink",
    margin: 30
  },
 
  iconStytle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});

export default App