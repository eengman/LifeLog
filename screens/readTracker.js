/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Fragment, Li, Ul, FlatList, Alert, Modal, TextInput, AppState, Keyboard, RefreshControl, ScrollView, Picker, Dimensions } from 'react-native';
import NfcManager, { Ndef, NfcEvents, NfcTech } from '../NfcManager';
import tag from './components/tag';
import about from './about';
import { Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-react-native-sdk";
import { StackNavigator } from 'react-navigation';
import { Divider, Card, Icon } from 'react-native-elements';
import  PureChart  from 'react-native-pure-chart';

//import {ListItem} from 'react-native-elements';
//import { ProgressBar } from 'react-native-paper';

//var totalLogs = 0;
var totalLogs = 0;

let sampleData = [
    {
        data:[
            {x: 'Feb 2', y: 10},
            {x: 'Feb 3', y: 17},
            {x: 'Feb 4', y: 4},
            {x: 'Feb 2', y: 10},
            {x: 'Feb 3', y: 17},
            {x: 'Feb 4', y: 4}
        ],
        color: '#074e67'
    },
];




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

global.trackerColor = 'coral';

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
            goal: 0,
            //progress: 1,
            test: 'default',
            name: props.item,
            miraculous_something: true, //helpfulvar to update state
            modalVisible: false,
            appState: AppState.currentState,
            currentUserId: undefined,
            client: undefined,
            tagss: undefined,
            refreshing: false,
            inc: 1,
            array: undefined,
            trackers: [],
            //array: undefined,
            color: '#05878a',
            text: "",
            value: false,
            totalCalcuation: 0,
        }
        this._loadClient = this._loadClient.bind(this);
    }
    // --------------------Testing app state ---------------------
    _handleAppStateChange = async (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }else{
          console.log('app has come into background');

        }
        this.setState({appState: nextAppState});
      };



    //--------------------Testing app state -----------------------

    handleSubmit = (obj) => {
        Keyboard.dismiss();
        console.log("submitting");
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
              goal: this.state.goal, // in write tracker we need to set this
              description: "", // in write tracker we also need to set this
              owner_id: global.username,
              color: this.state.color,
              progress: 0,
            })
            .then(docs => {
              if(1){
                // put confetti here if we want it
              }
              this.setState({ value: !this.state.value});
              this.setState({ text: ""});
              this.setState({ trackers: docs});  // changed from trackers
              //this.setState({array: trackers})  // array test
              //this._updateState();
            })
            .catch(err => {
              console.warn(err);
            })
        }
      };


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
            //this.state.trackers = [...this.state.trackers, obj]; // Do not change this please, it finally works after 5 hours - Very tired Eric 
            this._updateState();
            console.log("Detected new tracker");
        }
    }

    trackerOptions = (item) => {
        const { navigate } = this.props.navigation; // something here isn't working Jacob make it work
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
                onPress: () => this.deleteConfirm(item),
               
              },
              {text: 'See Tracker Details',
              onPress: () => navigate("Metrics", {screen: "Metrics", tracker: item})},
             
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
                onPress: () => this._onPressDelete(key),
              },
            ],
            {cancelable: false},
          );
    }


    test(){// what is this for - Dylan
        alert('hello');
    }
    

    _updateState() {
        console.log("updating state");
        this.setState({ miraculous_something: false });
        //global.recently = "readTracker.js";
        this.setState({ miraculous_something: true });
        //this.render; //why does this stuff only work sometimes wtf
        //return;
    }

    tagInc = (props) => {
        console.log("inc ", props.tagg.state.name, " to 1+", props.tagg.state.count);
        props.tagg.state.count = props.tagg.state.count + 1;
        //this._updateState();
    }
    // This checks whether or not the name of the added tracker is in the array 
    isMade = (val) =>{
        console.log(val);
        return this.state.trackers.some(item => val === item.key);
    }
    
  componentDidMount = async() => { //scan tracker
    this._loadClient();
    //AppState.addEventListener('change', this._handleAppStateChange);    // testing app state
    try {
        await NfcManager.registerTagEvent()
    } catch (ex) {
        console.warn('ex', ex);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tags => {
        console.log('tag', tags);
        this._onTagDiscovered(tags); //writes into 'parsedText
        NfcManager.setAlertMessageIOS('I got your tag!');//probably useless
        
        // This checks to see if new tracker is in array yet, if not then it makes it
        if(this.isMade(this.state.parsedText) === false){   // this if statement checks to see if the tracker is part of the list. If unknown, then it prompts if user would like to add to it
            
        }
        this.state.trackers.map((this_tag) => {    // changed from trackers
            if (this.state.parsedText === this_tag.name) {
                this_tag.count = this_tag.count + 1;
                console.log("Tracker goal: " + this_tag.goal);
                this._onPressComplete(this_tag.count, this.state.parsedText, this_tag.goal);
                //this._updateState(); // if you remove this line from here is breaks; but doesn't in tagInc???????
                console.log('Found the tag ', this.state.parsedText, ' at value' , this_tag.count);
            }
                
            });
    
        //NfcManager.unregisterTagEvent().catch(() => 0);           // commenting out this line makes NFC always listening
    });
  }

  _onPressComplete(newCount, name, goal){
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("LifeLog_DB");
    const trackers = db.collection("item");
    //const goal = trackers.goal;
    console.log("Goal is: " + goal);
    trackers 
      .updateOne(
          { name: name },
          { $set: { count: newCount, logDate: new Date(), progress: newCount*100/goal } },
          { upsert: true },
          {owner_id: global.username}
      )
      .then(() => {
      trackers
            .find(
                { 
                    status: "new",
                    owner_id: global.username,
                }, 
              { sort: { date: -1} }
            )
          .asArray()
          .then(docs => {
              this.setState({ trackers: docs});  // changed from tracker
              //this.setState({ array: trackers});    // array test
              //this._updateState();
              //this.setState({ count: newCount});
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
              .find({ owner_id: global.username }, { sort: { date: -1} })
              .asArray()
              .then(docs => {
                  this.setState({ trackers: docs});  // changed from trackers
                  //this.setState({ array: trackers});    // array test
                  this._updateState();
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
    //global.totalLogs = 0;
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
    );
    const db = mongoClient.db("LifeLog_DB");
    const trackers = db.collection("item");
    trackers 
      .find({ owner_id: global.username }, { sort: { date: -1} })
      .asArray()
      .then(docs => {
          this.setState({ trackers: docs}); // changed from trackers
          this.setState({ refreshing: false});
          //this.setState({ array: trackers});    // array test
          //this._updateState(); // added for bug fixing
        
      })
      .catch(err => {
          console.warn(err);
      });
    };

  componentWillUnmount() {
    //AppState.removeEventListener('change', this._handleAppStateChange); // testing app state  
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }
  

  renderItem = ({item}) => {

    //console.log(item.count);
    //console.log("progress: " + item.progress);
    //let deviceWidth = Dimensions.get('window').width;
    
    if(item.owner_id === global.username){
        totalLogs += item.count;
    }
    console.log("Total logs: " + totalLogs);
    //console.log(item.owner_id);
    
    
    return(
    
    <View>
        <View style={{flexDirection: 'row', padding: 5}}>

            <View style={{backgroundColor: item.color, width: 30, height: 30}}>
                
            </View>

            <TouchableOpacity 
            style={{flex: 1, justifyContent: 'center', borderWidth: 2, borderColor: item.color, height: 30}}
            onPress={() => this.trackerOptions(item._id)}
            >

                <Text style={{ fontSize: 20, alignSelf: 'flex-start', marginLeft: 20, color: 'black'}}>
                    {item.name}
                </Text>
                
            </TouchableOpacity>

            <View style={{borderTopWidth: 2, borderBottomWidth: 2, borderRightWidth: 2, borderColor: item.color, height: 30, padding: 5}}>
                <Text style={{fontSize: 15, alignItems: 'center'}}>{item.count} / {item.goal} </Text>
            </View>

        
        </View>

        <View style={{ alignSelf: 'flex-start',backgroundColor: 'white', borderWidth: 1, borderRadius: 100, height: 10, marginBottom: 10, width: '100%', justifyContent: 'center', borderColor: item.color}}>
            
            <View style={{backgroundColor: item.color, width: item.progress+1 + '%', height: 10, borderWidth: 1, borderRadius: 100, borderColor: item.color }}>
            </View>
        </View>

    </View>
    )
    
    
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
                        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>Name</Text>
                        <TextInput style={{height: 50, borderColor: '#194051', borderWidth: 4, fontSize: 25}} 
                            onChangeText={(text) => this.setState({name: text}) }
                        />
                           <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>Goal</Text>
                         <TextInput style={{height: 50, borderColor: '#194051', borderWidth: 4, fontSize: 25}} 
                            onChangeText={(text) => this.setState({goal: text}) }
                        />

                        <View style={{flexDirection: 'row', padding: 50}}>
                            <Text style={{fontWeight: 'bold'}}>Color: </Text>
                            <Picker 
                                selectedValue={this.state.color}
                                style={{height: 50, width: 100}}
                                onValueChange={(itemValue, itemIndex) => this.setState({color: itemValue})}
                                >
                                <Picker.Item label="Turquiose" value="#05878a" color="#05878a" />
                                <Picker.Item label="Pink" value="#f5b7b1" color="#f5b7b1" />
                                <Picker.Item label="Purple" value="#d7bde2" color="#d7bde2"/>
                                <Picker.Item label="Blue" value="#a9cce3" color="#a9cce3"/>
                                <Picker.Item label="Green" value="#a3e4d7" color="#a3e4d7"/>
                                <Picker.Item label="Yellow" value="#f9e79f" color="#f9e79f"/>
                                <Picker.Item label="Orange" value="#edbb99" color="#edbb99"/>
                                <Picker.Item label="Grey" value="#aeb6bf" color="#aeb6bf"/>

                            </Picker>
                            <TouchableOpacity style={{padding: 10, width: '50%', backgroundColor: this.state.color}}>

                            </TouchableOpacity>
                        </View>
                        

                        <TouchableOpacity 
                        style={{padding: 10, width: '100%', margin: 0, borderWidth: 2, borderColor: '#eee9e5', backgroundColor: '#eee9e5', borderRadius: 100, alignSelf: 'center'}}
                        onPress={this.writeToChip}
                        >
                        <Text style={{color: 'black', fontSize: 35, alignSelf: 'center', fontWeight: 'bold'}}>Add Tracker</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity //fake tracker
                        style={{padding: 10, width: '100%', margin: 25, borderWidth: 2, borderColor: '#eee9e5', backgroundColor: '#eee9e5', borderRadius: 100, alignSelf: 'center'}}
                        onPress={() => this.setModalVisible(false)}
                        >
                        <Text style={{color: 'black', fontSize: 35, alignSelf: 'center', fontWeight: 'bold'}}>Cancel</Text>
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
                    {/*
                    <Text>current state is: {this.state.appState}</Text>
                    <Text>current user: {global.username} </Text>  
                    */}
                    <Text style={{marginTop: 20, marginLeft: 20, fontSize: 18, fontWeight: 'bold', padding: 5 }}>My Trackers</Text>
                    <Divider style={{ backgroundColor: '#074e67', width: '90%', alignSelf: 'center', height: 1,}}/>
                <FlatList
                    style={{padding: 10}}
                    data={this.state.trackers}   // changed from trackers
                    //extraData={this.state}
                    refreshControl ={ <RefreshControl refreshing ={this.state.refreshing} onRefresh={this._onRefresh} />}
                    renderItem={this.renderItem}
                            /*
                            renderItem={({ item }) => (
                                //<View style={styles.tracker}>
                                <View style={{borderWidth: 1, backgroundColor: item.color, margin: 5, borderColor: item.color, padding: 5}}> 
                                    <TouchableOpacity 
                                    onPress={() => this.trackerOptions(item._id)}
                                    >
                                        <Text style={styles.trackerText}>=   {item.name} at {item.count} goal: {item.goal}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            */
                        />

              {/* <View style={styles.buttoncontain}>

                
                        <TouchableOpacity 
                        style={{padding: 10, width: '70%', margin: 25, borderWidth: 2, borderColor: '#eee9e5', backgroundColor: '#eee9e5', borderRadius: 100, alignSelf: 'center'}}
                        onPress={this._test}
                        >
                        <Text style={{color: 'black', fontSize: 35, alignSelf: 'center', fontWeight: 'bold'}}>SCAN</Text>
                        </TouchableOpacity>
                            </View> */}

                    
                    <Card containerStyle={{borderWidth: 1, }}>
                            
                            <View style={{padding: 2, }}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', padding: 5}}>Total Daily Logs</Text>
                                    <Text style={{padding: 5, fontStyle: 'italic'}}>Feb 1 - Feb 7</Text>
                                    {/*
                                    <Icon 
                                    name='rowing'
                                    color='#f50'
                                    />
                                    */}
                                </View>
                                {/*<Divider style={{backGroundColor: '#074e67', width: '90%'}}/>*/}
                            </View>
                            <PureChart data={sampleData} type={'bar'} height={50} color={'blue'}/>

                            {/*
                            <View style={{flexDirection: 'row'}}>
                                
                                <View style={{flexDirection: 'column', padding: 5}}>
                                    <Text style={{fontWeight: 'bold'}}>Trackers: </Text>
                                    <Text> 4</Text>
                                </View>

                                <View style={{flexDirection: 'column', padding: 5}}>
                                    <Text style={{fontWeight: 'bold'}}>Total Logs: </Text>
                                    <Text> {totalLogs} </Text>
                                </View>

                                <View style={{flexDirection: 'column', padding: 5}}>
                                    <Text style={{fontWeight: 'bold'}}>Total Progress: </Text>
                                    <View style={{backgroundColor: 'red'}}></View>
                                </View>

                            </View>
                            */}
                    </Card>

                    <TouchableOpacity 
                    style={{padding: 5, width: '100%', margin: 0, marginTop: 15, borderWidth: 2, borderColor: '#074e67', backgroundColor: '#074e67',  alignSelf: 'center'}}
                    onPress={() => this.setModalVisible(true)}
                    >
                        <Text style={{fontSize: 20, color: 'white', margin: 5, padding: 5, alignSelf: 'center', fontWeight: 'bold'}}>ADD NEW TRACKER</Text>
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

    _loadClient() {
        //global.logs = 0;
        const stitchAppClient = Stitch.defaultAppClient;
        const mongoClient = stitchAppClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const db = mongoClient.db("LifeLog_DB");
        const trackers = db.collection("item");
        trackers 
          .find({ owner_id: global.username }, { sort: { date: -1} })
          .asArray()
          .then(docs => {
              this.setState({ trackers: docs }); // changed from trackers
              //this.setState({ refreshing: false});
              //this.setState({ array: trackers});
              //this._updateState();
              //this.setState({ array: trackers});
          })
          .catch(err => {
              console.warn(err);
          });
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
            //this.addTracker(this.state.name);
            const obj = { tagg: new tag(this.state.name, 0), key: this.state.name, };
            //this.setState({ trackers: [...global.tags, obj]}); //this succesfully adds to the state, but it struggles to update
            this.handleSubmit(obj);
            //this.setState({ value: !this.state.value});
            this.setModalVisible(false);        // This makes it so the modal closes automatically once it writes and adds the tracker 
            await NfcManager.setAlertMessageIOS('I got your tag!');
            this._cleanUp();
        } catch (ex) {
          this._cleanUp();
        }
      }
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
        //backgroundColor: '#05878a',
        backgroundColor: global.trackerColor,
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