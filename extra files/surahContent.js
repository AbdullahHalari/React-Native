import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, ImageBackground,Image,TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Quranapi from '../assets/quranapi2.json'
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../assets/theme/Color';
import { useNavigation } from "@react-navigation/native";



export default ({route }) => {

    const  itemId = route.params;
    const navigations = useNavigation();
    
    return(
          <View
        style={{
            flex: 1,
            // remove width and height to override fixed static size
            width: null,
            height: null,
            backgroundColor:'white'
        }}
        >

       
       <View style={{margin:15, flexDirection:'row',}}>
        <TouchableOpacity 
         onPress={() => navigations.navigate("QuranHome")}
        >
        <Icon 
            name="angle-left"
            size={40}
            color={Color.Brown}
        />


        </TouchableOpacity >

        <Text style={styles.headertitle} >Surah List</Text>
       

    <TouchableOpacity onPress={()=>alert("setting")} >
        <Icon style={styles.headericon}
            name="cog"
            size={30}
            color={Color.Brown}
        />
        </TouchableOpacity>
       </View>

       <ScrollView>

      <View style={ styles.verses }>
      
          <View style={ styles.verseContainer }  >
            <Text style={ styles.verse }>
              <Image source={require('../assets/verse.png') } resizeMode="contain" style={ styles.verseBullet }></Image>
              <Text>
                {itemId}
              {/* {JSON.stringify(itemId)} */}
              </Text>
           </Text>
          </View>
          </View>
          </ScrollView>
          </View>
      
   
    //  </ScrollView>
    )

}
styles = StyleSheet.create({
    
      headericon:{
        marginLeft:50,
        marginTop:10
    },
    headertitle:{
        marginTop:10,
        fontSize:20,
        color:Color.Brown,
        marginLeft:30,
        marginRight:'45%'
    },
      verses: {
        padding: 20,
        paddingBottom: 10
      },
      verseContainer: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: '#f1f1f1'
      },
      verse: {
        flexShrink: 1,
        flexGrow: 1,
        fontSize: 34,
        fontFamily: 'PdmsIslamicFont',
        textAlign: 'right',
        lineHeight: 40,
        paddingHorizontal: 20
      },
      verseBullet: {
        width: 40,
        height: 20,
        marginLeft: 10,
        marginTop: 8
      }
});
