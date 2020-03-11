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
    this.setState({description: item.description})
    })
    .catch(err => {
    console.error(err)
    })}
    
    /*
    <Text style={styles.label}>Name: {this.state.name}</Text>
          <Text style={styles.label}>Count: {this.state.count}</Text>
          <Text style={styles.label}>Goal: {this.state.goal}</Text>
          <Text style={styles.label}>Color:   <TouchableOpacity style={{padding: 10, margin: 10, height: 30, width: 30, borderRadius: 100, backgroundColor: this.state.color}} /></Text>
          <Text style={styles.label}>Percent: ({this.state.count}/{this.state.goal})</Text>
    */
    render() {
      
 
    return (
      
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={{margin: 20, padding: 10}}>
        
        <View style={{ width: '100%', marginBottom: 10}}>
        <View style={{flexDirection: 'row', backgroundColor: 'white', borderColor: this.state.color, margin: 10, borderRadius: 20}} elevation={10}>
            
            
            <View style={{ width: '100%', borderColor: this.state.color, backgroundColor: 'white', borderRadius: 20, flexDirection: 'column', maxWidth: '100%'}} elevation={5}>
                <TouchableOpacity 
                style={{ justifyContent: 'center', height: 70, backgroundColor: '#f2f3f4', width: '100%', borderRadius: 20}}
                
                >
                
                <View style={{flexDirection: 'row', width: '100%', backgroundColor: this.state.color, height: 70, borderRadius: 20, maxWidth: '100%', opacity: 0.7}}>
                    <Text style={{flexDirection: 'row', fontFamily: 'monospace', fontWeight: 'bold', padding: 20, fontSize: 25, alignSelf: 'center', letterSpacing: 2, maxWidth: '100%', color: '#5c5a5a' }}>
                        {this.state.name}
                      
                    </Text>

                </View>

                <Text style={{fontFamily: 'monospace', fontWeight: 'bold', padding: 20, fontSize: 25, alignSelf: 'flex-end', position: 'absolute', justifyContent: 'flex-end', color: '#5c5a5a', opacity: 0.7}}>
                        {this.state.count}
                </Text>
                    
                </TouchableOpacity>

            </View>
        
        </View>
        
    </View>
    
    <Text style={{fontFamily: 'monospace', fontSize: 15, margin: 15, marginBottom: 0, color: '#5c5a5a', fontWeight: 'bold', opacity: 0.7}} >Description: </Text>
    <View style={{borderWidth: 1, borderRadius: 20, margin: 15, borderColor: 'white', backgroundColor: 'white'}} elevation={5}>
      
      <Text style={styles.label}>
      {this.state.description}
      </Text>
    </View>

      <View style={{margin: 15, alignSelf: 'center', marginBottom: 0}}>        
          <ProgressCircle
            percent={this.state.percentage}
            radius={70}
            borderWidth={20}
            color= {this.state.color}
            shadowColor="#999"
            opacity={0.7}
            bgColor="#fff" 
            >
            <Text style={{ fontSize: 20, fontFamily: 'monospace', color: '#5c5a5a', fontWeight: 'bold', opacity: 0.7 }}>{this.state.percentage + '%'}</Text>
           </ProgressCircle>
           </View>  
  </View>
        
      <View style={{padding: 10, borderWidth: 1, width: '80%', margin: 30, alignSelf: 'center', borderRadius: 20, borderColor: 'white', marginTop: 5, backgroundColor: 'white'}} elevation={5}>

        {this.state.logs.map((item) =>(
          <Text style={{fontFamily: 'monospace', fontSize: 15, opacity: 0.7, fontWeight: 'bold', color: '#5c5a5a',}}>{item}</Text>)
        )}

        
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