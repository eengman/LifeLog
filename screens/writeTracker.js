/* eslint-disable prettier/prettier */
import React from 'react';
import { 
  View, Text,TouchableOpacity, TextInput, Button, Alert, Keyboard,
} from 'react-native';
import NfcManager, { Ndef, NfcTech } from '../NfcManager';
import tag from './components/tag';
import { Stitch, RemoteMongoClient} from "mongodb-stitch-react-native-sdk";
import { ThemeContext } from 'react-navigation';

function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.uriRecord(valueToWrite),
    ]);
    
}

class Write extends React.Component {

  constructor(props){
    super(props)
    this.state={
      name: '',
      value: false,
      goal: 0,
    };  
  }

  handleSubmit = (obj) => {
    Keyboard.dismiss();
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"

    );
    const db = mongoClient.db("LifeLog_DB");
    const trackers = db.collection("item");
    if(this.state.name != "" ){
      trackers
        .insertOne({
          status: "new",
          count: 0,
          key: this.state.name,
          name: this.state.name,
          date: new Date(),
          goal: 10000, // in write tracker we need to set this
          description: "", // in write tracker we also need to set this
        })
        .then(() => {
          if(1){

          }
          //this.setState({})
          //this.setState({})
        })
        .catch(err => {
          console.warn(err);
        })
    }
  };

   
  componentDidMount() {
    NfcManager.start();
  }
  componentWillUnmount() {
    this._cleanUp();
  }
  render() {
    return (
      <View style={{padding: 20}}>
        <Text>Create a new LifeTracker</Text>
        <TextInput style={{height: 50, borderColor: 'gray', borderWidth: 1}} 
        onChangeText={(text) => this.setState({name: text}) }
        />
        <Button 
                        title='Tap LifeTracker To Add' 
                        color='coral' 
                        onPress={this.writeToChip}
                        />

      </View>
    )
  }
  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }//not in use but cancels request
  writeToChip= async () => { //func to write to script
    try {
        Alert.alert('Scan tag now...');
        let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
            alertMessage: 'Ready to write some NFC tags!'
        });
        //console.warn(resp);
        let ndef = await NfcManager.getNdefMessage();
        let bytes = buildUrlPayload(this.state.name); //where tag goes in
        await NfcManager.writeNdefMessage(bytes);
        Alert.alert("Successfully scanned " + '"' + this.state.name + '"');
        const obj = { tagg: new tag(this.state.name, 0), key: this.state.name, };
        global.tags = [...global.tags, obj]; //this succesfully adds to the state, but it struggles to update
        this.handleSubmit(obj);
        await NfcManager.setAlertMessageIOS('I got your tag!');
        this._cleanUp();
    } catch (ex) {
      this._cleanUp();
    }
  }
}
export default Write;