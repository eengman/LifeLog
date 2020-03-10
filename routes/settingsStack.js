/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import Read from '../screens/Settings';
import Header from '../shared/header';
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
}

    

const ReadStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: global.headerColor, height: 70 }
    }
});

export default ReadStack;
