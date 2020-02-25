/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Fragment, Li, Ul, FlatList } from 'react-native';
import NfcManager, { Ndef, NfcEvents } from '../NfcManager';
import tag from './components/tag';
import writeTracker from './writeTracker';
//import { Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk";
import { Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-react-native-sdk";
import App from "../App";
import Confetti from "react-native-confetti";




class AppV2 extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            isWriting: false,
            parsedText: "nothing yet!",
            tag: {},
            tags: global.tags,
            count: 0,
            goal: 0,
            name: props.item,
            miraculous_something: true, //helpfulvar to update state
            currentUserId: undefined,
            client: undefined,
            tagss: undefined,
            refreshing: false, 
            inc: 1,
        }
        this._loadClient = this._loadClient.bind(this);
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
    this._loadClient();
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
        //this._onPressComplete(this.state.parsedText);
        
        //global.tags.map((this_tag) => {
        this.state.trackers.map((this_tag) => {  
            if (this.state.parsedText === this_tag.name) {
                console.log('here2!');
                this_tag.count = this_tag.count + 1;
                this._onPressComplete(this_tag.count, this.state.parsedText);
                //this._updateState(); // if you remove this line from here is breaks; but doesn't in tagInc???????
                console.log('fuck');
                console.log('Found the tag ', this.state.parsedText, ' at value' , this_tag.count);
            }
                
            });
    
        NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  _onPressComplete(newCount, name){
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      const db = mongoClient.db("LifeLog_DB");
      const trackers = db.collection("item");
      trackers 
        .updateOne(
            { name: name },
            { $set: { count: newCount, logDate: new Date() } },
            { upsert: true }
        )
        .then(() => {
        trackers
            .find({ status: "new" }, { sort: { date: -1} })
            .asArray()
            .then(docs => {
                this.setState({ trackers: docs});
                if (this._confettiView){
                    this._confettiView.startConfetti();
                }
            })
            .catch(err => {
                console.warn(err);
            });
        })
        .catch(err => {
            console.warn(err);
        })
  }

  _onPressDelete(itemID){
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("LifeLog_DB");
    const trackers = db.collection("item");
    trackers 
      .deleteOne(
          { _id: itemID },
      )
      .then(() => {
      trackers
          .find({ status: "new" }, { sort: { date: -1} })
          .asArray()
          .then(docs => {
              this.setState({ trackers: docs});
              if (this._confettiView){
                  this._confettiView.startConfetti();
              }
          })
          .catch(err => {
              console.warn(err);
          });
      })
      .catch(err => {
          console.warn(err);
      })
}

  


  // Refresh shit  
  _onRefresh = () => {
      this.setState({ refreshing: true });
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
      );
      const db = mongoClient.db("LifeLog_DB");
      const trackers = db.collection("item");
      trackers 
        .find({ status: "new" }, { sort: { date: -1} })
        .asArray()
        .then(docs => {
            this.setState({ trackers: docs });
            this.setState({ refreshing: false});
        })
        .catch(err => {
            console.warn(err);
        });
  };

  

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }



    render() {
        // This is for navigating to add tracker screen 
        const { navigate } = this.props.navigation;

        // I have no idea what this shit is or if i'm doing anything right
        const sections = 
            this.state.trackers == undefined 
            ? [{ data: [{ title: "Loading..." }], title: "Loading..." }]
            : this.state.trackers.length > 0
            ? [{ data: this.state.trackers, title: "Current Trackers"}]
            : [
                {
                    data: [{ title: "No new trackers"}],
                    title: "No new tasks"
                }
              ];


        return (

        <View style={{ padding: 20 }}>
                    
                <FlatList
                    data={this.state.trackers}
                    keyExtractor={(item, index) => index}
                            renderItem={({ item }) => (
                                <View style={styles.tracker}>
                                    <TouchableOpacity onPress={() => this._onPressDelete(item._id)}>
                                        <Text style={styles.trackerText}>=    {item.name} at {item.count}</Text>
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

    _loadClient() {
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
      );
      const db = mongoClient.db("LifeLog_DB");
      const trackers = db.collection("item");
      trackers 
        .find({ status: "new" }, { sort: { date: -1} })
        .asArray()
        .then(docs => {
            this.setState({ trackers: docs });
            this.setState({ refreshing: false});
        })
        .catch(err => {
            console.warn(err);
        });
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