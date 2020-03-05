/* eslint-disable prettier/prettier */
import React from 'react';
import { Platform, Text, StatusBar, StyleSheet, View, AppState, ActivityIndicator } from "react-native";
//import Home from './screens/home';
import Navigator from './routes/drawer';
import tag from './screens/components/tag';
import Login from './screens/login';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import { C, createAppContainer } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

global.tags = [
    { tagg: new tag("Water", 0), key: "Water" },
    { tagg: new tag("LifeLog", 10), key: "LifeLog" },
    { tagg: new tag("Cool", 5), key: "Cool" },
];
global.recently = "Default";

global.username = "";
global.loggedIn = false;
global.update = false;


console.disableYellowBox = true; // debug yellow
export function masterUpdate(){//why does this not work wtf
    console.log("update main");
    if(global.update === true){
        console.log("Updating App.js");
        App._update();
        App.call(_update());
        App._update;
        App.setState({
            update: !update,
        });
        App.
        global.update = false;
    } 
}

export default class App extends React.Component{

    constructor(props) {
        super(props);
        this._update = this._update.bind(this);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            loading: true,
            updateVal: true,
            messageShown: false,
            update: false,
        };
        //global.currentUserId = this.state.currentUserId;
        this.tryGetLogin();
    }

    tryGetLogin = async () => {
        try {
            console.log("trying to find stored username...");
          const value = await AsyncStorage.getItem('@stored_username')
          if(value !== null) {
                console.log("found storage username: ", value);
                global.username= value;
                global.loggedIn= true;
          }
        } catch(e) {
          // error reading value
        }
      }
    
    _update() {
        console.log("Updating App.js");
        this.setState({
            messageShown: true
        });
        global.update = false;
    }


    async componentDidMount() {
        try {
            await this._loadClient();
            setTimeout(() => {
                this.setState({
                    loading: false,
                });
            }, 1500)
        } catch (err) {
            console.log(err);
            this.setState({
                loading: false,
            });
        }
    }
    
    _loadClient() {
        Stitch.initializeDefaultAppClient("lifelog_db-bshms").then(client => {
            this.setState({ client });
            this.state.client.auth
                .loginWithCredential(new AnonymousCredential())
                .then(user => {
                    console.log(`Successfully logged in as user ${user.id}`);
                    this.setState({ currentUserId: user.id });
                    this.setState({ currentUserId: client.auth.user.id });
                })
                .catch(err => {
                    console.log(`Failed to log in anonymously: ${err}`);
                    this.setState({ currentUserId: undefined });
                });
        });
    }
    
    render() {
        
        if (this.state.loading) {
            return (
                <View style={{ paddingVertical: '50%' }}>
                    <Text style={{ fontFamily: 'SpaceMono-Bold', textAlign: 'center', paddingBottom: 30 }}>
                        Loading
                    </Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        else if (global.loggedIn) {
            return (
                    <Navigator 
                        action={this._update}
                    />
            );
        } else {
            return (
                <Login
                    action={this._update}
                />
            );
        }
    }
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});


