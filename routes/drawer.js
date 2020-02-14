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
    MyTrackers: {
        screen: MyTrackersStack,
    },
    Home: {
        screen: HomeStack,
    },
    About: {
        screen: AboutStack,
    },
    Trackers: {
        screen: CounterStack,
    },
    Read: {
        screen: ReadStack,
    },
    Write: {
        screen: WriteStack,
    }
});

export default createAppContainer(RootDrawerNavigator);