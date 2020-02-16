/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import AboutStack from './aboutStack';
import ReadStack from './readStack';
import WriteStack from './writeStack';



const RootDrawerNavigator = createDrawerNavigator({
    Trackers: {
        screen: ReadStack,
    },
    AddTracker: {
        screen: WriteStack,
    },
    About: {
        screen: AboutStack,
    }
    
});

export default createAppContainer(RootDrawerNavigator);