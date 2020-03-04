/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
} from 'react-native';
//import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-react-native-sdk";

//var value =
var incPercent = 100 / 3;
const barWidth = Dimensions.get('screen').width - 30;
export default class App extends React.Component {
 
  state = {
    progress: 0,
    epicProgress: 0,
    progressCustomized: 0,
  }
  
  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }
  
  _updateProgress(){
    const tracker = this.props.navigation.getParam('tracker', 'nothing received');
    this.setState({ refreshing: true });
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
    );
    const db = mongoClient.db("LifeLog_DB");
    const trackers = db.collection("item");
    var currentDay = trackers.find({ _id: tracker })
   
    
      //.catch(err => {
         // console.warn(err);
      //});
     
      //incPercent = current.goal;
  }
 
  render() {

    //const barWidth = Dimensions.get('screen').width - 30;
    //const progressCustomStyles = {
      //backgroundColor: 'red', 
      //borderRadius: 0,
      //borderColor: 'orange',
    //}
    
    
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Epic</Text>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.epicProgress}
            backgroundColorOnComplete="#6CC644"
            onComplete={() => {
                Alert.alert('Hey!', 'Good job!');
              }}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}>
              <Button
                title = "{tracker}" // commented t
                onPress={this.increase.bind('','epicProgress', incPercent)}
              />
            </View>
          </View>
        </View>
        
        
      </View>

      
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
  separator: {
    marginVertical: 30,
    borderWidth: 0.5,
    borderColor: '#DCDCDC',
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
});