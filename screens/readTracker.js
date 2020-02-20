/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Fragment, Li, Ul, FlatList } from 'react-native';
import NfcManager, { Ndef, NfcEvents } from '../NfcManager';
import tag from './components/tag';
import writeTracker from './writeTracker';




class AppV2 extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            isWriting: false,
            parsedText: "nothing yet!",
            tag: {},
            tags:[],
            count: 0,
            name: props.item,
            miraculous_something: true, //helpfulvar to update state
        }
        this._loadClient = this._loadClient.bind(this);
    }

    componentDidMount() {
        this._loadClient();
    }

    _loadClient() {
        return
    }

    // This adds a new tracker to the current "tags" array 
    addTracker = (name) => {
        if(this.isMade(name) === true){
            return;
        }else{
            const obj = {tagg: new tag(name, 0), key: name,};
            global.tags = [...global.tags, obj];
            console.log(this.state.tags);
        }
    }
    _updateState() {
        this.setState({ miraculous_something: false });
        global.recently = "readTracker.js";
        this.setState({ miraculous_something: true });
        this.render; //why does this stuff only work sometimes wtf
        return;
    }

    tagInc = (props) => {
        console.log("inc ", props.tagg.state.name, " to 1+", props.tagg.state.count);
        props.tagg.state.count = props.tagg.state.count + 1;
        this._updateState;
    }
    // This checks whether or not the name of the added tracker is in the array 
    isMade = (val) =>{
        console.log(val);
        return global.tags.some(item => val === item.key);
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
        
        global.tags.map((this_tag) => {
            
            if (this.state.parsedText === this_tag.tagg.state.tag_name) {
                console.log('here2!');
                this_tag.tagg.state.count = this_tag.tagg.state.count + 1;
                this._updateState(); // if you remove this line from here is breaks; but doesn't in tagInc???????
                console.log('fuck');
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
        // This is for navigating to add tracker screen 
        const { navigate } = this.props.navigation;
        return (

        <View style={{ padding: 20 }}>
                    
                <FlatList
                    data={global.tags}
                            renderItem={({ item }) => (
                                <View style={styles.tracker}>
                                    <TouchableOpacity onPress={() => this.tagInc(item)}>
                                        <Text style={styles.trackerText}>=    {item.tagg.state.key} at {item.tagg.state.count}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                
                <View style={styles.buttoncontain}>

                
                        <TouchableOpacity 
                        style={{padding: 10, width: 120, margin: 20, borderWidth: 1, borderColor: 'black'}}
                        onPress={this._test}
                        >
                        <Text>Scan</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{padding: 10, width: 120, margin: 20, borderWidth: 1, borderColor: 'black'}}
                        onPress={this._cancel}
                        >
                            <Text>Cancel Scan</Text>
                        </TouchableOpacity>
                </View>
                    <Text>Tracker last read: "{this.state.parsedText}"</Text>

                    <TouchableOpacity 
                    style={{padding: 10, width: 300, margin: 20, borderWidth: 2, borderColor: 'coral', backgroundColor: 'coral', borderRadius: 100,}}
                    onPress={() => navigate("Write", {screen: "Write"})}
                    >
                        <Text style={{fontSize: 20, color: 'white'}}>    Click to add new tracker</Text>
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
        //console.log(text);
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
}
const styles = StyleSheet.create({

    home: {
    },
    buttoncontain: {
        flexDirection: 'row',
    },  
    trackerText: {
        padding: 10,
        fontSize: 20,
        color: 'white',
    },  

    header: {
        alignSelf: 'center',
        fontSize: 40,
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
        backgroundColor: 'coral',
        borderRadius: 100,
        margin: 5,
        borderColor: 'coral',
        
    },

});

export default AppV2