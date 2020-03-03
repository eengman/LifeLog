/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import Read from '../screens/Settings';
import Header from '../shared/header';
import login from '../screens/login';
import React from 'react';

const screens = {
    Read: {
        screen: Read,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Settings'/>,
            }
        } 
    },

    Login: {
        screen: login,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Login' />,
            }
        } 
    },
}

    

const ReadStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#074e67', height: 70 }
    }
});

export default ReadStack;
