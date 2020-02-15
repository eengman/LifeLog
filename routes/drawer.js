/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import AboutStack from './aboutStack';
import CounterStack from './counterStack';
import ReadStack from './readStack';
import WriteStack from './writeStack';
import MyTrackersStack from './mytrackerStack';



const RootDrawerNavigator = createDrawerNavigator({
    Trackers: {
        screen: ReadStack,
    },
    AddTracker: {
        screen: WriteStack,
    },
    HomeOld: {
        screen: HomeStack,
    },
    About: {
        screen: AboutStack,
    },
    JunkOld: {
        screen: CounterStack,
    },
    MyTrackersOld: {
        screen: MyTrackersStack,
    },
});

export default createAppContainer(RootDrawerNavigator);