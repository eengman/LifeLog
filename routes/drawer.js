/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ReadStack from './readStack';
import SettingsStack from './settingsStack';
import CompletedTrackersStack from './completedTrackersStack';
import CalendarStack from './calendarStack';
import PastDayStack from  './pastDayStack';

const RootDrawerNavigator = createDrawerNavigator({
    Trackers: {
        screen: ReadStack,
        
    },
    Completed: {
        screen: CompletedTrackersStack,
    },
    Calendar: {
        screen: CalendarStack,
    },
    Settings:{
        screen: SettingsStack,
    } 
});

export default createAppContainer(RootDrawerNavigator);