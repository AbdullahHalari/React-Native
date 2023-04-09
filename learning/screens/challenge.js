import React from "react";
import { Text,StyleSheet,View } from "react-native";

const Challenge = ()=>{
   var Name = "Abdullah";
        return( 
        <View>
            <Text style={styles.textStyle}>how are you!{Name}</Text>
     </View>
        );
};
const styles= StyleSheet.create(
    {
        textStyle: {
            fontSize:40,
            color:"red"
        
        }
    }
);

export default Challenge
