// import ChapterListItem from './ChapterListItem'
// import { useNavigation } from '@react-navigation/native'
// import {useState, useEffect } from "react";
// import { View } from 'react-native';

// export default function ChapterListIem() {

//   const navigation = useNavigation()
//   // const chapters = ChapterService.getChapters()
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   // console.log(data);

//   useEffect(() => {
//     fetch('https://raw.githubusercontent.com/AbdullahHalari/Quran_api/master/quranapi2.json')
//       .then((response) => response.json())
//       .then((json) => setData(json))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <View
//     style={{
//       flex: 1,
//       // remove width and height to override fixed static size
//       width: null,
//       height: null,
//       backgroundColor:'white'
//   }}
//     >
//       { data.map((chapter) => (
//         <ChapterListItem chapter={ chapter } navigation={ navigation } key={ chapter.id }/>)) }
//     </View>
//   )
// }