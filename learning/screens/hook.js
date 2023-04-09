import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,FlatList, ActivityIndicator  } from "react-native";
// import { StatusBar } from 'expo-status-bar';




const Hook = ()=>{

const [myUserData,setMyUserData] = useState();
const [isLoaded,setIsloaded]=useState(true);
  const getUserData = async ()=>{
    try {
      const res = await fetch("https://raw.githubusercontent.com/AbdullahHalari/Quran_api/master/quran.json");
    
      const myData = await res.json();
      setMyUserData(myData);
      setIsloaded(false);
      // console.log(myData)
    } catch (error) {
      console.log(error);
      
    }

  }
   useEffect(()=>{
    getUserData();
   },[]);
  
  return(
    <View>
      {isLoaded ? ( <View style={styles.loader}> <ActivityIndicator/></View>
      ) :  (
      <View>
    
 
     <FlatList 
     data={myUserData}
     renderItem={({ item })=>{
      return(
        <View >
        <View style = {[styles.card]}>
        <Text style={[{ color: "blue", textAlign: "center" ,fontSize:25}]}> {item.name }</Text>
        <Text style={[{ color: "blue", textAlign: "right" ,fontSize:25}]}> {item.number < 10?`0${item.number}` : `#${item.number}`}</Text>
   
    <Text style={styles.textStyle}> {item.englishName} </Text>
    <Text style={styles.textStyle}>Page no: {item.page} </Text>
    <Text style={styles.textStyle}>revelationType: {item.revelationType } </Text>
    </View >
    </View >
      );
     }

  }/>
      
      </View>
    )
    }
    </View>
  );
};

const styles = StyleSheet.create({
 loader:{
  minHeight:"100%",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
 },
  textStyle: {
    fontSize: 20,
  color: "black",
  },
  card : {
    borderWidth : 6,
    borderColor :"red",
    padding : 10,
    margin : 15 ,
    borderRadius:15,
  }
  
    
    



});
export default Hook