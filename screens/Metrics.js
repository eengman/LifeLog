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
  TouchableOpacity
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
      
  
    }}

    componentDidMount(){
      this.getTracker()
    }

    getTracker = () => {
    this.setState({ refreshing: true });
    const id = this.props.navigation.getParam('tracker');
      
    
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
    );
    const db = mongoClient.db("LifeLog_DB");
    const trackers = db.collection("item");
    var current;
    trackers.findOne({_id: id})
    .then(item => {
    this.setState({name: item.name})
    this.setState({goal: item.goal})
    this.setState({count: item.count})
    this.setState({color: item.color})
    this.setState({logs: item.logs})
    this.setState({percentage: Math.floor((item.count/item.goal)*100)})
    })
    .catch(err => {
    console.error(err)
    })}
    

    
    

    render() {
      
 
    return (
      
      <View style={styles.container}>
        <View>
        
          <Text style={styles.label}>Name: {this.state.name}</Text>
          <Text style={styles.label}>Count: {this.state.count}</Text>
          <Text style={styles.label}>Goal: {this.state.goal}</Text>
          <Text style={styles.label}>Color:   <TouchableOpacity style={{padding: 10, margin: 10, height: 30, width: 30, borderRadius: 100, backgroundColor: this.state.color}} /></Text>
          <Text style={styles.label}>Percent: ({this.state.count}/{this.state.goal})</Text>
          <ProgressCircle
            percent={this.state.percentage}
            radius={70}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff" >
            <Text style={{ fontSize: 18 }}>{this.state.percentage + '%'}</Text>
           </ProgressCircle>
          <Text style={styles.label}>Logs: </Text>
        </View>
      <View style={{padding: 10, borderWidth: 0.5, width: '60%', margin: 10}}>


        
        </View>

      </View>
        
        
      

      
      
    );
  }
}
const styles = StyleSheet.create({
  label:{
      padding: 10,
      fontSize: 25,
      color: 'black',
      fontWeight: 'bold'
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