/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ReadStack from './readStack';
import SettingsStack from './settingsStack';
import MetricsStack from './metricsStack';

const RootDrawerNavigator = createDrawerNavigator({
    Trackers: {
        screen: ReadStack,
        
    },
    Metrics: {
        screen: MetricsStack,
    },
    Settings:{
        screen: SettingsStack,
    } 
});

export default createAppContainer(RootDrawerNavigator);