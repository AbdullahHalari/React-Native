import React from "react";
import {Text, StyleSheet,View,Image,Button,Linking } from "react-native";
import { 
    AutourOne_400Regular 
  } from "@expo-google-fonts/autour-one";
  import { useFonts } from "expo-font";
  import AppLoading from "expo-app-loading";

// const CardDetail = (props) => {
const NetflixCard = ({imgsrc}) => {
    let [fontsLoad,error] = useFonts({
    AutourOne_400Regular 

    });
    if(!fontsLoad){
        return <AppLoading />
    }

        return (
        <View style={styles.listStyle}>
            <Text style={styles.listStyle}>
                
                NetflixCard
               
            </Text>
            <View style={styles.poster}>
            <Image 
            style={styles.imagestyle}
                source={{uri: "https://www.india.com/wp-content/uploads/2016/01/3-idiots-sequel-1.jpg"}}
            />
          
          <Text style={styles.postertitle}>
                The 3idiots
            </Text>
            <Text style={styles.posterdetails}>
            Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them "idiots".
            </Text>
            <Button 
           
                title="CLICK HERE"
                onPress={()=>Linking.openURL("https://abdullahhalariportfolio.web.app/")}
            />
           </View>
        </View>);
       }
     
   

    


const styles = StyleSheet.create({
   listStyle:{
        // height:500,
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        fontSize:60,
        fontFamily:"AutourOne_400Regular",
        fontVariant: ["small-caps"]
        
   },
    imagestyle:{
        width:"100%",
        height:undefined,
        aspectRatio:2,
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        // marginTop:20,
        marginBottom:20
        
    },
    poster:{
        width:250,
        borderWidth:1,
        alignItems:"center"
    },
    postertitle:{
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        fontSize:20,
        marginBottom:10,
        marginTop:10
    },
    posterdetails:{
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        color:"grey",
        fontSize:10,
        marginBottom:10,
        marginTop1:10,
        paddingHorizontal:10,
        fontFamily: "AutourOne_400Regular"
    }

}
);

export default NetflixCard