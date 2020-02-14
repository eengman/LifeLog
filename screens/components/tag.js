/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Tag extends Component {
    constructor(name, c) {
        super()
        this.state = {
            tag_name: name,
            key: name,
            count: c,
        }
    }

    valInc = () => {
        this.setState({ count: this.state.count + 1 });
    }

    valDec = () => {
        this.setState({ count: this.state.count - 1 });
    }

    info = () => {
        return (
            <Text>tag: {this.state.tag_name} at {this.state.count}.</Text>
        );
    }

    render = () => {
        return (
            <View style={styles.elementContainer}>
                <TouchableOpacity style={styles.textinput}><Text>LifeLog</Text></TouchableOpacity>
                <Button style={styles.button} title="--" onPress={this.valDec} />
                <Text style={styles.numbers}>{this.state.count}</Text>
                <Button style={styles.button} title="+" onPress={this.valInc} />
            </View>  
            );

    }
} export default Tag