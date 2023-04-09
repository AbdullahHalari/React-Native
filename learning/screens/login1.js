
import {Text, StyleSheet, View ,TextInput,TouchableOpacity} from "react-native";
import   React, {useState}   from 'react';




const Login = ()=>{

    const [agree, setAgree] = React.useState(false)
    return (
  <View style={styles.mainContainer} >
        <Text style={styles.mainHeader} >Login Form</Text>
        
  
      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your name </Text>
  <TextInput 
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
         />
      </View>
  <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your password </Text>
        <TextInput 
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
         />
  </View>
      {/* <View style={styles.wrapper}>
        <CheckBox
        color='#4630EB'
        status={agree ? 'checked' : 'unchecked'}
        onPress={ ()=> {
          setAgree(!agree);
        }}
        />
  <Text style={styles.wrapperText} > I have read and agreed with the TC </Text>
      </View> */}
      <TouchableOpacity style={[
        styles.buttonStyle,
        {
          backgroundColor : agree ? '#4630EB' : 'grey' ,
        },
      ]}
  disabled={!agree}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </View>
    );
    };
    const styles = StyleSheet.create({
        mainContainer: {
          height: '100%',
          paddingHorizontal: 30,
          paddingTop: 30,
          backgroundColor: '#fff'
        },
        mainHeader: {
          fontSize: 25,
          color: '#344055',
          fontWeight: '500',
          paddingTop: 20,
          paddingBottom: 15,
          textTransform: 'capitalize',
        },
      description: {
          fontSize: 20,
          color: '#7d7d7d',
          paddingBottom: 20,
          lineHeight: 25,
          fontFamily: 'regular',
        },
        inputContainer: {
          marginTop: 20,
        },
      labels: {
          fontSize: 18,
          color: '#7d7d7d',
          marginTop: 10,
          marginBottom: 5,
          lineHeight: 25,
          fontFamily: 'regular',
        },
        inputStyle: {
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.3)',
          paddingHorizontal: 15,
          paddingVertical: 7,
          borderRadius: 1,
          fontFamily: 'regular',
          fontSize: 18
        },
      wrapper: {
          // paddingHorizontal: 10,
          // paddingVertical: 15,
          // paddingBottom: 30
          flexDirection:"row",
          // justifyContent:'center',
          alignItems:"center",
          marginTop: 15,
          marginBottom: 360
          // alignContent:"center"
      
        },
        wrapperText: {
          // paddingLeft: 30
          marginTop: 0,
        },
      buttonStyle: {
          borderRadius: 40,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center'
      
        },
        buttonText: {
          color: '#fff',
          fontSize: 20,
          justifyContent: 'center',
          alignContent: 'center',
          fontWeight: '600'
        },
      });
      

export default Login    