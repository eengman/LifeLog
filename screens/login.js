/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, Platform, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TextInput, Dimensions, KeyboardAvoidingView, Button, Modal, BackHandler } from 'react-native';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
//import Confetti from "react-native-confetti";

var height = Dimensions.get("window").height;

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        if (false) { //true to ignore login
            global.username = "LLDev";
            global.loggedIn = true;
            this.props.action();
        }
        this.state = {
            value: false,
            typed_un: "",
            typed_pass: "",
            log_typed_un: "",
            log_typed_pass: "",
            previous_reg_attempt: 0, //0=no previous, 1= un already exists, 2= succeeded login, 3 = bad login data
            previous_log_attempt: 0, //0=no previous, 1= bad data, 2= succeed, 3= no username, 4 = wrong pass
            register_modal_visible: false
        };
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        console.log("Back button pressed"); //this doesn't work for some reason idk :^)
        if (this.state.register_modal_visible) {
            this.setState({
                register_modal_visible: false,
            });
        }
        return true;
    }

    handleSubmit = () => {//Registration
        Keyboard.dismiss();
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if (this.state.typed_un.length < 3) {//too short
            this.setState({ previous_reg_attempt: 3 });
            return;
        } else if (!this.state.typed_un.match(letterNumber)) {//if non alphanumeric
            this.setState({ previous_reg_attempt: 3 });
            return;
        }
        else {
            const stitchAppClient = Stitch.defaultAppClient;
            const mongoClient = stitchAppClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            const db = mongoClient.db("LifeLog_DB");
            const users = db.collection("users");
            if (this.state.typed_un != "" && this.state.typed_pass) {
                users.findOne({
                    username: this.state.typed_un,
                }).then((found) => {
                    if (found != null) {
                        console.log(found.password);
                        this.setState({ previous_reg_attempt: 1 });
                    } else {
                        this.setState({ previous_reg_attempt: 2 });
                        users
                            .insertOne({
                                username: this.state.typed_un,
                                password: this.state.typed_pass,
                                date: new Date()
                            })
                            .then(() => {
                                if (this._confettiView) {
                                    this._confettiView.startConfetti();
                                }
                                global.username = this.state.typed_un;
                                this.setState({ value: !this.state.value, previous_reg_attempt: 0 });
                                this.setState({ typed_pass: "", typed_un: "" });
                            })
                            .catch(err => {
                                console.warn(err);
                            });
                    }
                })
            }
        }
    };

    handleLogin = () => {//previous_log_attempt: 0=no previous, 1= bad data, 2= succeed, 3= no username, 4 = wrong pass
        Keyboard.dismiss();
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if (this.state.log_typed_un.length < 3) {//too short
            this.setState({ previous_log_attempt: 1 });
            return;
        } else if (!this.state.log_typed_un.match(letterNumber)) {//if non alphanumeric
            this.setState({ previous_log_attempt: 1 });
            return;
        }
        else {//if data looks pretty good
            const stitchAppClient = Stitch.defaultAppClient;
            const mongoClient = stitchAppClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );//setup client stuff
            const db = mongoClient.db("LifeLog_DB");
            const users = db.collection("users");//with this db and collection
            if (this.state.log_typed_un != "" && this.state.log_typed_pass) {//if we have some data to pass in
                users.findOne({//find some data with this un
                    username: this.state.log_typed_un,
                }).then((found) => {//when server returns something
                    if (found != null) {//if we found username
                        console.log("Found username");
                        if (found.password == this.state.log_typed_pass) {//if correct password also
                            console.log("Found pass :^)");
                            global.username = this.state.log_typed_un;
                            global.loggedIn = true;
                            this.setState({ previous_log_attempt: 2 });//state modifications
                            this.props.action();
                        } else {//wrong pass
                            this.setState({ previous_log_attempt: 4 });
                        }
                    } else {//we found no username
                        this.setState({ previous_log_attempt: 3 });
                    }
                });
            }
        }
    };

    makeModalVisible = () => {
        this.setState({
            register_modal_visible: true,
        });
    }

    makeModalHide = () => {
        this.setState({
            register_modal_visible: false,
        });
    }

    currentRegStyle = function () {
        switch (this.state.previous_reg_attempt) {
            case 1: case 3:  //failed login, un already exist, bad data
                return {
                    flex: 1,
                    backgroundColor: "#fff7f7",
                    justifyContent: "center",
                    alignItems: "center"
                }
                break;

            case 2:  //succeed login
                return {
                    flex: 1,
                    backgroundColor: "#d9ffdb",
                    justifyContent: "center",
                    alignItems: "center"
                }
                break;

            default:
                return {//default
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                }
        }
    }

    currentLogStyle = function () {
        switch (this.state.previous_log_attempt) {
            case 1: case 3: case 4://bad login data, wrong pass, no un exists
                return {
                    backgroundColor: "#fff7f7",
                }
                break;

            case 2:  //succeed login
                return {
                    backgroundColor: "#d9ffdb",
                }
                break;

            default:
                return {//default
                    backgroundColor: "#fff",
                }
        }
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <View style={styles.simple}>
                    <View style={this.currentLogStyle()}>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <Image
                                source={require('./../assets/images/LifeLog_2_round_trans.png')}
                            />
                            <TextInput
                                style={{
                                    color: "lightgray",
                                    fontSize: 20,
                                    marginTop: 60
                                }}
                                placeholder="Username"
                                onChangeText={log_typed_un => this.setState({ log_typed_un })}
                                value={this.state.log_typed_un}
                                onSubmitEditing={() => this.handleLogin()}
                            />
                            <TextInput
                                style={{
                                    color: "lightgray",
                                    fontSize: 20,
                                    paddingTop: 0,
                                    paddingBottom: 40,
                                }}
                                placeholder="Password"
                                onChangeText={log_typed_pass => this.setState({ log_typed_pass })}
                                value={this.state.log_typed_pass}
                                onSubmitEditing={() => this.handleLogin()}
                            />
                            <View style={{}}>
                                <Button
                                    title="Login"
                                    color="#32a852"
                                    onPress={() => this.handleLogin()}>
                                </Button>
                                <View style={{ marginTop: 40 }}></View>
                                <Button
                                    title="register?"
                                    color="#32a852"
                                    onPress={this.makeModalVisible}>
                                </Button>
                            </View>
                            {
                                this.state.previous_log_attempt == 3 &&//no un
                                <Text>
                                    No account with that username
                                </Text>
                            }
                            {
                                this.state.previous_log_attempt == 4 &&//wrong pass
                                <Text>
                                    Wrong password for that account
                                </Text>
                            }
                            {
                                this.state.previous_log_attempt == 1 && // bad register vals 
                                <Text>
                                    Bad login data, try something else
                                </Text>
                            }
                            <ScrollView
                                contentContainerStyle={{ flex: 1 }}
                                keyboardShouldPersistTaps="handled"
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>

                <Modal visible={this.state.register_modal_visible} animationType='slide'>
                    <View style={this.currentRegStyle()}>
                    
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <TextInput
                                style={{
                                    color: "lightgray",
                                    fontSize: 20,
                                    marginTop: height / 2 - 140
                                }}
                                placeholder="Username"
                                onChangeText={typed_un => this.setState({ typed_un })}
                                value={this.state.typed_un}
                                onSubmitEditing={() => this.handleSubmit()}
                            />
                            <TextInput
                                style={{
                                    color: "lightgray",
                                    fontSize: 20,
                                    paddingTop: 0,
                                    paddingBottom: 40,
                                }}
                                placeholder="Password"
                                onChangeText={typed_pass => this.setState({ typed_pass })}
                                value={this.state.typed_pass}
                                onSubmitEditing={() => this.handleSubmit()}
                            />
                            <Button
                                title="Register"
                                onPress={() => this.handleSubmit()}>
                            </Button>

                            {this.state.previous_reg_attempt == 1 && //if fail
                                <Text >
                                    Account already exists.
                            </Text>
                            }
                            {
                                this.state.previous_reg_attempt == 3 && // bad register vals 
                                <Text>
                                    Bad registration data, try something else
                            </Text>
                            }
                            <View style={{ marginTop: 40 }}></View>
                            <Button
                                title="back"
                                color="#32a852"
                                onPress={this.makeModalHide}>
                            </Button>
                            <ScrollView
                                contentContainerStyle={{ flex: 1 }}
                                keyboardShouldPersistTaps="handled"
                            />
                        </KeyboardAvoidingView>
                    </View>{/*register modal ends*/}
                </Modal>
            </View>
        );
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