import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, ImageBackground,Image,TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Quranapi from '../assets/quranapi2.json'
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../assets/theme/Color';
import { useNavigation } from "@react-navigation/native";

export default ({ }) => {
  const navigation = useNavigation();
    const listTile =({item}) =>{
        return (
        <ScrollView>
          <TouchableOpacity style={ styles.listItem } onPress={ () => {
          navigation.navigate('Surah',item.content.trim().split(/\s*[[0-9]]\s*/))
          }
          }>
          <ImageBackground source={require('../assets/star.png') } resizeMode="cover" style={ styles.chapterNumber }>
            <Text style={ styles.chapterNumberText }>{ item.id }</Text>
          </ImageBackground>
        <View style={ { flexGrow: 1 } }>
          <Text style={ styles.name }>{ item.name_pron_en }</Text>
          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <Text style={ styles.class }>
              { item.class}
            </Text>
            <Text style={ styles.bullet }>•</Text>
            <Text style={ styles.class }>{item.verses_number} Ayat</Text>
           
          </View>
        </View>
        <Text style={ styles.nameAr }>{ item.name_ar }</Text>
        <TouchableOpacity onPress={()=> alert('volume')}>
          <Icon name='volume-up' color={Color.Brown} size={20}/>
          </TouchableOpacity>    
      </TouchableOpacity>
      </ScrollView>
           
        )
    } 
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // console.log(data);
  
    useEffect(() => {
      fetch('https://raw.githubusercontent.com/AbdullahHalari/Quran_api/master/quranapi2.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    

  return (
    <View  style={{
      
        flex: 1, 
        backgroundColor: 'white'
      }}>
    {isLoading ? <Text>Loading...</Text> : 
    ( 
       
        <FlatList
          data={data}
          keyExtractor= {(item) => item.id}
          renderItem= {listTile}/>
     
    )}
  </View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  chapterNumber: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  chapterNumberText: {
    fontWeight: 'bold',
    color: Color.Brown
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.Brown
  },
  nameAr: {
    fontSize: 18,
    fontWeight:'bold',
    // marginTop: -6,
    fontFamily: 'AlQalamQuran',
    color: Color.Brown,
    marginRight:15
    
  },
  bullet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AFFF',
    paddingHorizontal: 5
  },
  class: {
    fontSize: 12,
    color: '#9CA3AFFF'
  },
  
})
