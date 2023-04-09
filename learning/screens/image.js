import React from "react";
import { StyleSheet,View,Image } from "react-native";


const ImageData = () => {
    

        return (
        <View style={styles.listStyle}>
           
            <Image
            style={styles.imagestyle}
                source={require("../assets/1.jpg")}
            />
        </View>);
       }
     
   

    


const styles = StyleSheet.create({
   listStyle:{
        // height:500,
        alignItems:"center",
        justifyContent:"center",
        display:"flex"
   },
    imagestyle:{
        width:80,
        height:80,
        alignItems:"center",
        justifyContent:"center",
        display:"flex"
        
    }

}
);

export default ImageData