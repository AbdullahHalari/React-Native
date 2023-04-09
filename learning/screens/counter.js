import React, { useState } from "react";
import { Text, StyleSheet,View,TouchableOpacity,LogBox } from "react-native";


const CounterApp = ()=>{
  const[counter,setCounter] = useState(0);
  return(
    <View style={styles.center}>
     <Text style={styles.buttonstyle}>{counter}</Text>
     <View >
     <TouchableOpacity
     
      onPress={()=> {
        setCounter(counter + 1);

      }}>
          <Text style={styles.buttonstyle}>
            ++
          </Text>
         
    </TouchableOpacity>
     </View>
     <View >
     <TouchableOpacity
     
      onPress={()=> {
        setCounter(0);

      }}>
          <Text style={styles.buttonstyle}>
           RESET
          </Text>
         
    </TouchableOpacity>
     </View>
     <View >
     <TouchableOpacity
      onPress={()=> {
        if(counter>0)
        setCounter(counter - 1);

      }}>
          <Text style={styles.buttonstyle}>
            --
          </Text>
         
    </TouchableOpacity>
     </View>
    </View>
  );
};

const styles =StyleSheet.create({
 
    buttonstyle:{
        marginTop:50,
        fontSize:100
        
      },
      center:{
       
       
        alignItems:"center",
        justifyContent:"center",
        display:"flex"
      },

});

export default CounterApp