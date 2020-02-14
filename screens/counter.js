

/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Button, Alert, FlatList } from 'react-native';

export default class Home extends React.Component {
  // State attributes for numbers
  
  
  constructor(props) {
    super(props)
    this.state={
      num1: 0,
    
    }
  }

  // These are functions that increment or decrement code 
  incrementNum1 = () =>{
    this.setState({'num1': this.state.num1 + 1})
  }
  decrementNum1 = () =>{
    this.setState({'num1': this.state.num1 - 1})
  }

  
  render() {
    return(
        
      <View style={styles.home}>

        
          <View style={styles.elementContainer}>
            <TextInput style={styles.textinput}>Water Bottle</TextInput>
            <Button style={styles.button} title="--" onPress={this.decrementNum1}/>
            <Text style ={styles.numbers}>{this.state.num1}</Text>
            <Button style={styles.button} title="+" onPress={this.incrementNum1}/>
          </View>  
        
        
      </View>
      
    );
  }

}

const styles= StyleSheet.create({

  home: {
  },

  header: {
    alignSelf: 'center',
    fontSize: 40,
  },

  elementContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 100,
    alignContent: 'flex-end',
  },

  button: {
    backgroundColor: 'red',
    paddingLeft: 50,
  },

  numbers: {
    fontSize: 30,
    backgroundColor: '#acafb5',
    paddingLeft: 30,
    paddingRight: 30,
  },

  textinput: {
    paddingRight: 50,
    fontSize: 22,
  }

});