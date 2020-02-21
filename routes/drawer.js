/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ReadStack from './readStack';



const RootDrawerNavigator = createDrawerNavigator({
    Trackers: {
        screen: ReadStack,
    },
   
   
});

export default createAppContainer(RootDrawerNavigator);