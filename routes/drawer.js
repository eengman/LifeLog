/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ReadStack from './readStack';
import MetricsStack from './metricsStack';



const RootDrawerNavigator = createDrawerNavigator({
    Trackers: {
        screen: ReadStack,
    },
    Metrics: {
        screen: MetricsStack,
    },
   
   
});


export default createAppContainer(RootDrawerNavigator);