/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
  PointPropType,
  TouchableOpacity,
  ScrollView, 
  SafeAreaView,
} from 'react-native';
import { Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-react-native-sdk";
import ProgressCircle from 'react-native-progress-circle'


export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          name: '',
          count: '',
          goal: '',
          color: '',
          logs: [],
          percentage: 0,
          description: '',
          date: '',
          
      
        }}
 componentDidMount(){
        this.getDay()
      }
  getDay(){
    const Cdate = this.props.navigation.getParam('CDate');
    this.setState({date: Cdate})
  }
    render() {
      
 
    return (
      
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View>
        <Text style={{fontFamily: 'monospace', fontWeight: 'bold', padding: 10, fontSize: 20, color: '#5c5a5a'}}>
        This page is in development come back for LifeLog V1.9</Text>
        
    </View>

    </ScrollView>
  </SafeAreaView>
        
        
      

      
      
    );
  }
}
const styles = StyleSheet.create({
  label:{
      padding: 5,
      fontSize: 20,
      color: '#5c5a5a',
      fontWeight: 'bold',
      paddingLeft: 30,
      fontFamily: 'monospace',
      opacity: 0.7
  },
  container: {
      //padding: 20,
      width: '100%',
      //apsectRatio: 2/1,
      height: '100%',
  },
  buttoncontain: {
      //flexDirection: 'row',
  },  
  trackerText: {
      padding: 10,
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold'
  },  

  header: {
      alignSelf: 'center',
      fontSize: 40,
      color: 'white'
  },

  elementContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 100,
      alignContent: 'flex-end',
  },

  button: {
      backgroundColor: 'red',
      paddingLeft: 50,
  },

  numbers: {
      fontSize: 30,
      backgroundColor: '#acafb5',
      paddingLeft: 30,
      paddingRight: 30,
  },

  textinput: {
      paddingRight: 50,
      fontSize: 22,
  },

  tracker: {
      borderWidth: 1,
      padding: 5,

      backgroundColor: global.trackerColor,
      borderRadius: 100,
      margin: 5,
      borderColor: '#05878a',
      
  },
  button2: {
      fontSize: 30, 
      color: 'white', 
      margin: 5, 
      padding: 5, 
      alignSelf: 'center', 
      fontWeight: 'bold'
  },
  touch: {
      padding: 10, 
      width: 450, 
      margin: 20, 
      marginTop: 350, 
      borderWidth: 2, 
      borderColor: '#05878a', 
      backgroundColor: '#074e67',  
      alignSelf: 'center'
  },
  modalContent: {
      flex: 2,
  }

});