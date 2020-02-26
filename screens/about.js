/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function About() {
    return(
        <View style={styles.container}>
            <Text>Contributors: </Text>
            <Text></Text>
            <Text>Milo McCarty</Text>
            <Text>Guzel Rakhimova</Text>
            <Text>Nisser Aldossary</Text>
            <Text>Eric Engman</Text>
            <Text>Joshua Petersen</Text>
            <Text>Jacob Chesterfield</Text>
            <Text>Dylan McNee</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
});