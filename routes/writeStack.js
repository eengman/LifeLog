/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import Write from '../screens/writeTracker';
import Header from '../shared/header';
import React from 'react';

const screens = {
    Write: {
        screen: Write,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Add a Tracker' />,
            }
        } 
    },
    
    
}

const WriteStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: 'coral', height: 60 }
    }
});

export default WriteStack;
