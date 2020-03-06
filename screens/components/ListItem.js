/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Fragment, Li, Ul, FlatList, Alert, Modal, TextInput, AppState, Keyboard, RefreshControl, ScrollView, Picker, Dimensions } from 'react-native';
//import NfcManager, { Ndef, NfcEvents, NfcTech } from '../NfcManager';
//import tag from './components/tag';
//import about from './about';
import { Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-react-native-sdk";
import { StackNavigator } from 'react-navigation';
import { Divider, Card, Icon } from 'react-native-elements';
import  PureChart  from 'react-native-pure-chart';
//import { ListItem } from './components/ListItem';

//global.totalLogs = 0;
//global.numTrackers = 0;
//global.trackersCompleted = 0;


export default class ListItem extends React.PureComponent {
    
    constructor(props){
        super(props);
    }

    render(){
        global.totalLogs += this.props.count;
        global.numTrackers++;
        if(this.props.progress >= 100){
            global.trackersCompleted++;
            console.log("Tracker completed");
        }
        console.log("Total logs: " + global.totalLogs);
        return(
            <View>
        <View style={{flexDirection: 'row', padding: 5}}>

            <View style={{backgroundColor: this.props.color, width: 30, height: 30}}>
                
            </View>

            <TouchableOpacity 
            style={{flex: 1, justifyContent: 'center', borderWidth: 2, borderColor: this.props.color, height: 30}}
            onPress={() => this.trackerOptions(this.prop.id)}
            >

                <Text style={{ fontSize: 20, alignSelf: 'flex-start', marginLeft: 20, color: 'black'}}>
                    {this.props.name}
                </Text>
                
            </TouchableOpacity>

            <View style={{borderTopWidth: 2, borderBottomWidth: 2, borderRightWidth: 2, borderColor: this.props.color, height: 30, padding: 5}}>
                <Text style={{fontSize: 15, alignItems: 'center'}}>{this.props.count} / {this.props.goal} </Text>
            </View>

        
        </View>

        <View style={{ alignSelf: 'flex-start',backgroundColor: 'white', borderWidth: 1, borderRadius: 100, height: 10, marginBottom: 10, width: '100%', justifyContent: 'center', borderColor: this.props.color}}>
            
            <View style={{backgroundColor: this.props.color, width: this.props.progress+1 + '%', height: 10, borderWidth: 1, borderRadius: 100, borderColor: this.props.color }}>
            </View>
        </View>

    </View>
        )
    }
}


