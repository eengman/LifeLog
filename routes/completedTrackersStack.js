/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import Read from '../screens/Settings';
import Header from '../shared/header';
import React from 'react';
import Completed from '../screens/completedTrackers';
import Metrics from '../screens/Metrics';

const screens = {
    Read: {
        screen: Completed,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Completed'/>,
            }
        } 
    },
    Metrics: {
        screen: Metrics,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Details' />,
            }
        } 
    },
}

    

const CompletedTrackersStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#a9cce3', height: 70 }
    }
});

export default CompletedTrackersStack;