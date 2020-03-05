/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import Read from '../screens/readTracker';
import Metrics from '../screens/Metrics';
import Header from '../shared/header';
import React from 'react';

const screens = {
    Read: {
        screen: Read,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Home' />,
            }
        } 
    }, 

    Metrics: {
        screen: Metrics,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Tracker Statistics' />,
            }
        } 
    },
}

    

const ReadStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#074e67', height: 70 } // original background color "#074e67"
    }
});

export default ReadStack;
