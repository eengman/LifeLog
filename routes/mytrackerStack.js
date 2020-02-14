/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
//import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';
import Header from '../shared/header';
import React from 'react';
import MyTrackers from '../screens/mytrackers';

const screens = {
    MyTrackers: {
        screen: MyTrackers,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='My Trackers' />,
            }
        }
    },

    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions: {
            title: 'LifeLog Details',
        } 
    }
}

const MyTrackersStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: 'coral', height: 60 }
    }
});

export default MyTrackersStack;