import React from "react";
import { Text,StyleSheet,View,FlatList } from "react-native";


const Flatlistdata = () => {
    const names = [
        {
            name: "abdullah",
            age:12  //= index
        },
        {
            name: "ahmed",
            age:14
        },
        {
            name: "ali",
            age:17
        },
        {
            name: "aslam",
            age:19
        },
    ];
    return (    
       <FlatList
       style={styles.listStyle}
       keyExtractor={(key)=> {
        return key.age;
       }
    }
    horizontal
    inverted
    // numColumns={2}
    showsHorizontalScrollIndicator={false}
       data={names}
       renderItem={({item}) => {

        return (<View>
            <Text style={styles.textStyle}>
                {item.name}
            </Text>

            <Text style={styles.textStyle}>
                {
                    item.age
                }
            </Text>
            {/* <Image
            style={styles.imagestyle}
                source={require("../assets/1.jpg")}
            /> */}
        </View>);
       }
     
    }
       />

    );
};

const styles = StyleSheet.create({
    textStyle: {
        color: "red",
        fontsize:20,
        padding:30,
        backgroundColor: "blue",
        margin:20,

    },
    listStyle: {
        textAlign:"center",
        margin:20,
        padding:10
    },
    imagestyle:{
        width:50,
        height:50
    }

}
);

export default Flatlistdata