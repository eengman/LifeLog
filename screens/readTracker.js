/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Fragment, Li, Ul, FlatList } from 'react-native';
import NfcManager, { Ndef, NfcEvents } from '../NfcManager';
import tag from './components/tag';

class AppV2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            isWriting: false,
            parsedText: "nothing yet!",
            tag: {},
            count: 0,
            tags: [
                {tagg: new tag("LifeLog", 0), key:'LifeLog', num: 0 },
                {tagg: new tag("Cool", 5), key:'Cool', num: 0},
                {tagg: new tag("Water", 100), key: 'Water', num: 0 },
            ],
            miraculous_something: true, //helpfulvar to update state
        }
    }
    _updateState() {
        this.setState({ miraculous_something: true});
    }

    valInc = () => {
        this.setState({ count: this.state.count + 1});
    }

    valDec = () => {
        this.setState({ count: this.state.count - 1 });
    }

    tagInc = (props) => {
        console.log("big balls");
        props.tagg.state.count = props.tagg.state.count + 1;
        this._updateState;
        //console.log(props.tagg.state.key);
        //this.setState({'count': this.state.count + 1});
    }

  componentDidMount() {
    NfcManager.start();
    
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tags => {
        console.log('tag', tags);
        this._onTagDiscovered(tags); //writes into 'parsedText
        NfcManager.setAlertMessageIOS('I got your tag!');//probably useless
        this.setState({count: this.state.count + 1}); 
        //console.log(this.state.parsedText);
        this.state.tags.map((this_tag) => {
            //console.log(this.state.parsedText);
            //console.log(props.tagg.state.key);
            console.log(this_tag.tagg.state.tag_name);
            if (this.state.parsedText === this_tag.tagg.state.tag_name) {
                console.log('here2!');
                this_tag.tagg.state.count = this_tag.tagg.state.count + 1;
                this._updateState();
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
        return (
            <View style={{ padding: 20 }}>
                    {
                    this.state.tags.map((val) =>
                        <Text>{val.tagg.info()}</Text>
                        )
                    }
                
        <Text>Read a Tracker ok</Text>
        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._test}
        >
          <Text>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._cancel}
        >
          <Text>Cancel Scan</Text>
            </TouchableOpacity>
            <Text>Text I've seen: "{this.state.parsedText}"</Text>


            <View style={styles.elementContainer}>
                <TouchableOpacity style={styles.textinput}><Text>LifeLog</Text></TouchableOpacity>
                <Button style={styles.button} title="--" onPress={this.valDec} />
                <Text style={styles.numbers}>{this.state.count}</Text>
                <Button style={styles.button} title="+" onPress={this.valInc} />
            </View>  

                <FlatList
                    data={this.state.tags}
                    renderItem={({ item }) => (
                        <View style={styles.tracker}>
                            <TouchableOpacity onPress={() => this.tagInc(item)}>
                                <Text>Tag: {item.tagg.state.key} at {item.tagg.state.count}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
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
        console.log(text);
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
        paddingTop: 5,
        backgroundColor: 'grey',
    },

});

export default AppV2