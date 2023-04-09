import React from "react";
import { StyleSheet,View,Button,Alert, Text,Image,TouchableOpacity } from "react-native";




const Mybuttons = ()=>{
  
  return(
    <View>
      <Text style={styles.buttonstyle}>
        dkljdklsjdl
      </Text>
        <Button 
        
        // disabled
        title="click here"
        onPress={()=>
        {
            Alert.alert("kia haal hai");
        }}
        />
    <TouchableOpacity
      onPress={()=> {
        Alert.alert("kia haal hai");
      }}>
          <Text>
            click here
          </Text>
          <Image
            style={styles.imagestyle}
                source={require("../assets/1.jpg")}
            />
    </TouchableOpacity>

      </View>
  );
};

const styles =StyleSheet.create({
      buttonstyle:{
        marginTop:50
      },
      imagestyle:{
        width:80,
        height:80,
        alignItems:"center",
        justifyContent:"center",
        display:"flex"
        
    }
});

export default Mybuttons