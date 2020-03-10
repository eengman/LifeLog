/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import Metrics from '../screens/Metrics';
import Header from '../shared/header';
import React from 'react';
import { StackNavigator } from 'react-navigation';


const screens = {
    Metrics: {
        screen: Metrics,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Metrics' />,
            }
        } 
    },
}



const MetricsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#a9cce3', height: 60 }
    }
});

export default MetricsStack;
