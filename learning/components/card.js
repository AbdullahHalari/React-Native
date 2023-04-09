import React from "react";
import { StyleSheet,View,Image } from "react-native";


// const CardDetail = (props) => {
const CardDetail = ({imgsrc}) => {

        return (
        <View style={styles.listStyle}>
           
            <Image
            style={styles.imagestyle}
                // source={props.imgsrc}  //parameter.name
                source={imgsrc} //directly
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
        width:100,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        marginTop:20
        
    }

}
);

export default CardDetail