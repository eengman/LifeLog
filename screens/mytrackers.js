/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import TrackerForm from './trackerForm';


export default class mytrackers extends React.Component {
    
    constructor(props){
        super(props)
        this.state= {
            trackers: [
                { title: 'Water Bottle', num: 0, key: '1' },
                { title: 'Garbage', num: 0, key: '2'},
            ],
            modalVisible: false,
        };

        this.addTracker = this.addTracker.bind(this);
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    addTracker = (tracker) => {
        tracker.key = Math.random().toString();
        this.setState({trackers: [...this.state.trackers, tracker]});
        this.setModalVisible(false);
    }

    // not working 
    moveScreens = ({ navigation, item }) => {
        navigation.navigate('ReviewDetails', item);
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
                        renderItem ={({ item, navigation }) => (

                            <TouchableOpacity >
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

            </View>
        )

        
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