import React from "react";
import { Text, StyleSheet,View } from "react-native";


const Demo = ()=>{
  
  return(
    <View style={styles.parentview}>
     <Text style={[styles.childText,styles.common]}>Box 1</Text>
     <Text style={[styles.childText,styles.common]}>Box 2</Text>
     <Text style={[styles.childText,styles.common]}>Box 3</Text>
     <Text style={[styles.childText,styles.common]}>Box 4</Text>
     <Text style={[styles.childText,styles.common]}>Box 5</Text>
     <Text style={[styles.childText,styles.common]}>Box 6</Text>

   
    </View>
  );
};

const styles =StyleSheet.create({
 parentview:{
    width:"95%",
    height:500,
    marginTop:100,
    marginHorizontal:10,
    borderWidth:2,
    borderColor:"red",
    backgroundColor:"blue",
    flexDirection:"row",
    // justifyContent:"flex-end",
    justifyContent:'space-between'
    
 },
 childText:{
    backgroundColor:"grey",
    borderColor:"black",
    color:"yellow",
    // alignItems:"center"
    alignSelf:"stretch"
},
common:{
    // width:60,
    height:60,
    fontSize:20,
    borderWidth:1,
    // position:"absolute"
}



});

export default Demo