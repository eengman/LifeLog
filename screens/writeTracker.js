/* eslint-disable prettier/prettier */
import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import NfcManager, {Ndef, NfcTech} from '../NfcManager';
import AppV2 from './readTracker';

function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.uriRecord(valueToWrite),
    ]);
    
}

class AppV2Ndef extends React.Component {

  constructor(props){
    super(props)
    this.state={
      name: '',
    };  
  }
   


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
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
        onChangeText={(text) => this.setState({name: text}) }
        />
        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._testNdef}
        >
          <Text>Add a tracker</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._cleanUp}
        >
          <Text>Cancel Add</Text>
        </TouchableOpacity>

      </View>
    )
  }

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

  _testNdef = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NFC tags!'
      });
      console.warn(resp);
      let ndef = await NfcManager.getNdefMessage();
      console.warn(ndef);
      //Obj.addTracker(this.state.name);
      let bytes = buildUrlPayload(this.state.name); //where tag goes in
      await NfcManager.writeNdefMessage(bytes);
      console.warn('successfully write ndef');
      await NfcManager.setAlertMessageIOS('I got your tag!');
      this._cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      this._cleanUp();
    }
  }
}

export default AppV2Ndef;