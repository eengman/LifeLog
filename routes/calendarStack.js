/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import calendar from '../screens/calendar';
import PastDay from '../screens/pastDay';
import Header from '../shared/header';
import React from 'react';
import { StackNavigator } from 'react-navigation';


const screens = {
    calendar: {
        screen: calendar,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Calendar' />,
            }
        } 
    },

PastDay: {
    screen: PastDay,
    navigationOptions: ({ navigation }) => {
        return {
            headerTitle: () => <Header navigation={navigation} title='Past Day' />,
        }
    } 
},
}




const CalendarStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#a9cce3', height: 60 }
    }
});

export default CalendarStack;
