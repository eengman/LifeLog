/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, Platform, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TextInput, Dimensions, KeyboardAvoidingView, Button, Modal, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {masterUpdate} from './../App';
//import Confetti from "react-native-confetti";

var height = Dimensions.get("window").height;

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    render() {
        return (
            <View>
                 <TouchableOpacity 
                    style={styles.simple}
                    onPress={() => this.logoutPressed()}
                    >
                        <Text style={{fontSize: 30, color: 'white', margin: 5, padding: 5, alignSelf: 'center', fontWeight: 'bold'}}>Log Out</Text>
                    </TouchableOpacity> 
            </View>
        );
    }

    logoutPressed = async () => {
        try {
            console.log("logout pressed...");
            await AsyncStorage.setItem('@stored_username', "");
            global.username= "";
            global.loggedIn= false;
            global.update = true;
            masterUpdate();
            console.log("logout complete...");
        } catch (e) {
            // saving error
        }
      }

}

const styles = StyleSheet.create({
    simple: {
        width: '100%',
        backgroundColor: "#074e67",
        borderColor: "#074e67",
        alignItems: "center",
        marginTop: '123%',
        padding: 10,
        borderWidth: 2, 
        alignSelf: 'center'
    },
    containerRed: {
        flex: 1,
        width: '100%',
        backgroundColor: "#ffd4d4",
        justifyContent: "center",
        alignItems: "center"
    },
    containerGreen: {
        flex: 1,
        width: '100%',
        backgroundColor: "#d9ffdb",
        justifyContent: "center",
        alignItems: "center"
    }
});