/* eslint-disable prettier/prettier */
import React from 'react';
import { 
  View, Text,TouchableOpacity, TextInput, Button,
} from 'react-native';
import NfcManager, {Ndef, NfcTech} from '../NfcManager';

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
export default Write;