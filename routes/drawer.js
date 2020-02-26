/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ReadStack from './readStack';
import SettingsStack from './settingsStack';


const RootDrawerNavigator = createDrawerNavigator({
    Trackers: {
        screen: ReadStack,
    },
    Settings:{
        screen: SettingsStack,
    }
   
   
});

export default createAppContainer(RootDrawerNavigator);