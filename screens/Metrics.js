import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
  PointPropType,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-react-native-sdk";


var incPercent = 100 / 3;
export default class App extends React.Component {
 
  state = {
    progress: 0,
    epicProgress: 0,
  }
  
  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }

  querryFunction(querry){
    console.log("in function");
    console.log(querry);
  }
 
  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red', 
      borderRadius: 0,
      borderColor: 'orange',
    };

   
      const id = this.props.navigation.getParam('id');
      //this.setState({ refreshing: true });
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
      );
      const db = mongoClient.db("LifeLog_DB");
      const trackers = db.collection("item");
      var current = trackers.findOne({_id: id})
      .then(item => {
       current = item.goal
       console.log(item.name)
       return(item)
      })
      .catch(err => {
      console.error(err)
      })
      //incPercent = current.goal;
      console.log(current);

      
 
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>epicProgress</Text>
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
                title= "epicProgress"
                onPress={this.increase.bind(this,'epicProgress', incPercent)}
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