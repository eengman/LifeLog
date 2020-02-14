/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import Counter from '../screens/counter';
import Header from '../shared/header';
import React from 'react';

const screens = {
    Counter: {
        screen: Counter,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Increment Test' />,
            }
        } 
    }, 
}

const CounterStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: 'coral', height: 60 }
    }
});

export default CounterStack;
