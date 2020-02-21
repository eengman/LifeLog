/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import TrackerForm from './trackerForm';
import NfcManager, { Ndef, NfcEvents} from '../NfcManager';
import Tag from './components/tag';


export default class mytrackers extends React.Component {
    
    constructor(props){
        super(props)
        this.state= {
            supported: true,
            enabled: false,
            isWriting: false,
            parsedText: "Nothing yet",
            trackers: [
                { title: 'Water Bottle', num: 0, key: '1' },
                { title: 'Garbage', num: 0, key: '2'},
            ],
            modalVisible: false,
        };

        this.addTracker = this.addTracker.bind(this);
        //this.increment = this.increment.bind(this);
    }


    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    addTracker = (tracker) => {
        tracker.key = Math.random().toString();
        this.setState({trackers: [...this.state.trackers, tracker]});
        this.setModalVisible(false);
    }

    increment = (tracker) => {
        let value = tracker.num + 1;
        let trackers = [...this.state.trackers];
        let index = trackers.findIndex(el => el.title === tracker.title);
        trackers[index] = {...trackers[index], num: value};
        this.setState({trackers});
    }

    // not working 
    moveScreens = ({ navigation, item }) => {
        navigation.navigate('ReviewDetails', item);
    }

    componentDidMount() {
        NfcManager.start();
        
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            console.log('tag', tag);
            this._onTagDiscovered(tag); //writes into 'parsedText
            NfcManager.setAlertMessageIOS('I got your tag!');//probably useless
            this.setState({count: this.state.count + 1}); 
            console.log(this.state.parsedText);
            //this.state.tags.map((this_tag) => {
                //console.log(this.state.parsedText);
                //if (this.state.parsedText === this_tag.tagg.state.tag_name) {
                    //console.log('here2!');
                    //this_tag.tagg.state.count = this_tag.tagg.state.count + 1;
                    //this._updateState();
                    //console.log('Found the tag ', this.state.parsedText, ' at value' , this_tag.tagg.state.count);
                //}
                //});
        
            NfcManager.unregisterTagEvent().catch(() => 0);
        });
      }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }  

    render() {
        return (

            <View>
                <Modal visible={this.state.modalVisible} animationType='slide'>
                    <View style ={styles.modalContent}>
                        <TrackerForm addTracker={this.addTracker}/>

                        <Button 
                            title='close'
                            size={24}
                            onPress={() => this.setModalVisible(false)}
                        />
                    </View>

                </Modal>
            

                <View>
                    <FlatList 
                        data={this.state.trackers} 
                        extraData={this.state.trackers}
                        renderItem ={({ item, navigation, key }) => (

                            <TouchableOpacity onPress={() => this.increment(item)} >
                                <Text> {item.title} {item.num} </Text>  
                            </TouchableOpacity>
                        
                        )}
                    />
                </View>

                <Button style={styles.button}
                name='add'
                title='Add tracker'
                type="outline"
                size={24}
                onPress={() => this.setModalVisible(true)}
                
                />

                <Button style={styles.button}
                title='scan'
                size={24}
                onPress={this._test}            
                />
            </View>
        )

        
    }

    _cancel = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
      }
    
      _test =  async () => {
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
            return null;
        }

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    listText: {
        padding: 25,
        fontSize: 30,
        color: 'white',
        //borderWidth: 1,
        //alignItems: 'stretch',
    },
    listNum: {
        padding: 20,
        alignSelf: 'flex-end',
        fontSize: 30,
        color: 'white',
        //borderWidth: 1,
        //marginLeft: 50,
    },
    modalContent: {
        flex: 1,
        padding: 24,
    },
    comp: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'grey',
        backgroundColor: 'coral',
    },
    labels: {
        fontSize: 24,
        padding: 10,
    },
    input: {
        borderColor:'black',
        borderWidth: 1,
        width: 200,
        margin: 10,
    },
    tracker: {
        padding: 10,
        alignItems: 'stretch',
        //width: 300,
    },
    button: {
        borderRadius: 50,
        backgroundColor: 'red',
    }
    
});