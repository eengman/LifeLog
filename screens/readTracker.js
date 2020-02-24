/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Fragment, Li, Ul, FlatList, Alert, Modal, TextInput } from 'react-native';
import NfcManager, { Ndef, NfcEvents, NfcTech } from '../NfcManager';
import tag from './components/tag';

function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.uriRecord(valueToWrite),
    ]);
    
}

/*
Read and write are combined on this page -Eric 
I think part of the problem with it not showing up in the list was because the page 
    wasn't refreshing, so i put the add tracker stuff in a modal, which forces the page to 
    be rerendered. And merging read and write allowed me to use the add tracker function 
    directly from the writeToChip function. 
*/


class Read extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            isWriting: false,
            parsedText: "nothing yet!",
            tag: {},
            tags: global.tags,      // Global tags is now global and local for this js page - Eric
            count: 0,
            test: 'default',
            name: props.item,
            miraculous_something: true, //helpfulvar to update state
            modalVisible: false,
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    // This adds a new tracker to the current "tags" array 
    addTracker = (name) => {
        console.log(name + " is working");
        console.log("I heard you");
        if(this.isMade(name) === true){
            console.log(name + " is already here ");
            return;
        }else{
            const obj = {tagg: new tag(name, 0), key: name};
            this.state.tags = [...this.state.tags, obj]; // Do not change this please, it finally works after 5 hours - Very tired Eric 
            this._updateState();
            console.log("Detected new tracker");
        }
    }

    trackerOptions = (item) => {
        Alert.alert(
            'What would you like to do?',
            '',
            [
              {text: 'Cancel',
               onPress: () => console.log('Ask me later pressed'),
               style: 'cancel'
              },
              {
                text: 'Delete tracker',
                onPress: () => this.deleteConfirm(item.key),
              },
              {text: 'See Tracker Details', onPress: () => console.log('OK Pressed')},
              {}
            ],
            {cancelable: false},
          );
    }

    deleteConfirm = (key) => {
        Alert.alert(
            'Are you sure you want to delete the tracker?',
            '',
            [
              {text: 'Cancel',
               onPress: () => console.log('Ask me later pressed'),
               style: 'cancel'
              },
              {
                text: 'Yes I am sure',
                onPress: () => this.deleteTracker(key),
              },
            ],
            {cancelable: false},
          );
    }

    deleteTracker = (key) => {
        
        const filteredData = global.tags.filter(item => item.key !== key);
        this.setState({ tags: filteredData});
        
    }


    test(){
        alert('hello');
    }
    

    _updateState() {
        console.log("updating state");
        this.setState({ miraculous_something: false });
        global.recently = "readTracker.js";
        this.setState({ miraculous_something: true });
        this.render; //why does this stuff only work sometimes wtf
        return;
    }

    tagInc = (props) => {
        console.log("inc ", props.tagg.state.name, " to 1+", props.tagg.state.count);
        props.tagg.state.count = props.tagg.state.count + 1;
        this._updateState();
    }
    // This checks whether or not the name of the added tracker is in the array 
    isMade = (val) =>{
        console.log(val);
        return this.state.tags.some(item => val === item.key);
    }
    
  componentDidMount() { //scan tracker
    
    NfcManager.start();
    
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tags => {
        console.log('tag', tags);
        this._onTagDiscovered(tags); //writes into 'parsedText
        NfcManager.setAlertMessageIOS('I got your tag!');//probably useless
        
        // This checks to see if new tracker is in array yet, if not then it makes it
        if(this.isMade(this.state.parsedText) === false){
            this.addTracker(this.state.parsedText);
            console.log('not made');
        }
        this.state.tags.map((this_tag) => {    
            if (this.state.parsedText === this_tag.tagg.state.tag_name) {
                this_tag.tagg.state.count = this_tag.tagg.state.count + 1;
                this._updateState(); // if you remove this line from here is breaks; but doesn't in tagInc???????
                console.log('Found the tag ', this.state.parsedText, ' at value' , this_tag.tagg.state.count);
            }
                
            });
    
        NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }


    render() {
        // This is for navigating to add tracker screen  DONT NEED BUT KEEP IN CASE WE WANT TO NAVIGATE TO ANOTHER SCREEN FROM HERE IN FUTURE 
        //const { navigate } = this.props.navigation;
        return (

        <View style={styles.container}>
                
                <Modal visible={this.state.modalVisible} animationType='slide'>
                    <View style ={styles.modalContent}>
                        
                    <View style={{padding: 50}}>
                        <Text style={{alignSelf: 'center', fontSize: 25, fontWeight: 'bold'}}>Create a new LifeTracker</Text>
                        <TextInput style={{height: 80, borderColor: '#194051', borderWidth: 4, fontSize: 30}} 
                            onChangeText={(text) => this.setState({name: text}) }
                        />
                        <TouchableOpacity 
                        style={{padding: 10, width: '100%', margin: 25, borderWidth: 2, borderColor: '#eee9e5', backgroundColor: '#eee9e5', borderRadius: 100, alignSelf: 'center'}}
                        onPress={this.writeToChip}
                        >
                        <Text style={{color: 'black', fontSize: 35, alignSelf: 'center', fontWeight: 'bold'}}>Add Tracker</Text>
                        </TouchableOpacity>
        

                    </View>
                    <TouchableOpacity 
                    style={{padding: 10, width: '100%' , marginTop: '48%', margin: 20,  borderWidth: 2, borderColor: '#05878a', backgroundColor: '#074e67',  alignSelf: 'center'}}
                    onPress={() => this.setModalVisible(false)}
                    >
                        <Text style={{fontSize: 30, color: 'white', margin: 5, padding: 5, alignSelf: 'center', fontWeight: 'bold'}}>CANCEL</Text>
                    </TouchableOpacity>
                    </View>

                </Modal>
                    
                <FlatList
                    style={{padding: 10}}
                    data={this.state.tags}
                            renderItem={({ item }) => (
                                <View style={styles.tracker}>
                                    <TouchableOpacity onPress={() => this.trackerOptions(item)}>
                                        <Text style={styles.trackerText}>=   {item.tagg.state.key} at {item.tagg.state.count}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                <View style={styles.buttoncontain}>

                
                        <TouchableOpacity 
                        style={{padding: 10, width: '70%', margin: 25, borderWidth: 2, borderColor: '#eee9e5', backgroundColor: '#eee9e5', borderRadius: 100, alignSelf: 'center'}}
                        onPress={this._test}
                        >
                        <Text style={{color: 'black', fontSize: 35, alignSelf: 'center', fontWeight: 'bold'}}>SCAN</Text>
                        </TouchableOpacity>
                </View>
                    

                    <TouchableOpacity 
                    style={{padding: 10, width: '100%', margin: 0, marginTop: 20, borderWidth: 2, borderColor: '#074e67', backgroundColor: '#074e67',  alignSelf: 'center'}}
                    onPress={() => this.setModalVisible(true)}
                    >
                        <Text style={{fontSize: 30, color: 'white', margin: 5, padding: 5, alignSelf: 'center', fontWeight: 'bold'}}>ADD NEW TRACKER</Text>
                    </TouchableOpacity>


                    
                
                        
      </View>
    )
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  _test = async () => {
    try {
        await NfcManager.registerTagEvent()
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
      
    }
  }

    _onTagDiscovered = tag => {
        console.log('Tag Discovered', tag);
        this.setState({ tag });
        let text = this._parseText(tag);
        this.setState({ parsedText: text });
    }

    _parseUri = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    _parseText = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
    }

    // This is from the write tracker page 
    writeToChip= async () => { //func to write to script
        try {
            Alert.alert('Scan NFC tag');
            let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
                alertMessage: 'Ready to write some NFC tags!'
            });
            //console.warn(resp);
            let ndef = await NfcManager.getNdefMessage();
            let bytes = buildUrlPayload(this.state.name); //where tag goes in
            await NfcManager.writeNdefMessage(bytes);
            Alert.alert("Successfully scanned " + '"' + this.state.name + '"');
            console.log("hello from writetochip");
            this.addTracker(this.state.name);
            this.setModalVisible(false);        // This makes it so the modal closes automatically once it writes and adds the tracker 
            await NfcManager.setAlertMessageIOS('I got your tag!');
            this._cleanUp();
        } catch (ex) {
          this._cleanUp();
        }
      }
      // This is also from write tracker page 
      _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
      }//not in use but cancels request
}



const styles = StyleSheet.create({

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
        backgroundColor: '#05878a',
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

export default Read;