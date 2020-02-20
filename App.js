import React from 'react';
import { Platform, Text, StatusBar, StyleSheet, View, AppState, ActivityIndicator } from "react-native";
import Home from './screens/home';
import Navigator from './routes/drawer';
import tag from './screens/components/tag';
import Login from './screens/login';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import { C, createAppContainer } from 'react-navigation';

global.tags = [
    { tagg: new tag("Water", 0), key: "Water" },
    { tagg: new tag("LifeLog", 10), key: "LifeLog" },
    { tagg: new tag("Cool", 5), key: "Cool" },
];
global.recently = "Default";


export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            loading: true,
        };
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
        else if (true) {
            return (
                <Navigator />
            );
        } else {
            return (
                <Login />
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

