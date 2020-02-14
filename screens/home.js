/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import TrackerForm from './trackerForm';
export default function Home ({ navigation }) {

    const [modalOpen, setModalOpen] = useState(false);

    const [reviews, setReviews] = useState([
        { title: 'Water Bottle', num: 0, body: 'This waters dank', key: '1'},
        { title: 'Garbage', num: 0, body: 'This app is garbage', key: '2'},
    ]);

    const addTracker = (review) => {
        review.key = Math.random().toString();
        setReviews((currentReviews) => {
            return [...currentReviews, review]
        });
        setModalOpen(false);
    }


    return(
        <View style={styles.container}>

            <Modal visible={modalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <TrackerForm addTracker={addTracker}/>

                    <Button 
                        name='close'
                        title='close'
                        size={24}
                        onPress={() => setModalOpen(false)}
                    />
                </View>
            </Modal>

            <FlatList 
                data={reviews}
                renderItem={({ item }) => (
                    <View style={styles.tracker}>
                        <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                            <View style={styles.comp}>
                                <Text style={styles.listText}>{ item.title } </Text>
                                <Text style ={styles.listNum}>{ item.num }</Text>
                            </View>
                                
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View>
                    
            <Button style={styles.button}
                name='add'
                title='Add tracker'
                type="outline"
                size={24}
                onPress={() => setModalOpen(true)}
                
                
            />

            </View>
            
            
        </View>
    )
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