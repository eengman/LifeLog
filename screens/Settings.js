/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, Platform, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TextInput, Dimensions, KeyboardAvoidingView, Button, Modal, BackHandler, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {masterUpdate} from './../App';

//import Confetti from "react-native-confetti";

var height = Dimensions.get("window").height;

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            test: false,
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    changeHeader(itemValue){
        global.headerColor = itemValue;
        this.setState({test: !this.state.test});
    }


    render() {
        return (
            <View style={styles.simple}>

                <Button
                    title= "logout"
                    onPress={()=>this.logoutPressed()}
                />
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
            window.updateMaster("pingas");

            
            console.log("logout complete...");
        } catch (e) {
            // saving error
        }
      }

}

const styles = StyleSheet.create({
    simple: {
        width: '100%',
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"

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