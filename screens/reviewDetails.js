/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function ReviewDetails( { navigation }) {

    return(
        <View style={styles.container}>
            <View style={styles.elements}>
                
                    <Text style={styles.title}>Tracker Name: { navigation.getParam('title') } </Text>
                
                
                
                    <Text style={styles.number}>Counter: { navigation.getParam('num') } </Text>
                
                
                
                    <Text style={styles.description}>Tracker Description:  </Text>
                    <Text style={styles.desBody}>{ navigation.getParam('body') }</Text>
                

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        padding: 20,
    },
    number: {
        fontSize: 24,
        padding: 20,
    },
    description: {
        fontSize: 24,
        padding: 20,
    },
    desBody: {
        fontSize: 20,
        padding: 20,
        borderWidth: 1,
    }
        

});