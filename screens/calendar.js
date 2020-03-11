import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
  PointPropType,
  TouchableOpacity,
  Vibration
  
} from 'react-native';
import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import { calendarFormat } from 'moment';
import { Calendar } from 'react-native-calendario';

export default class OurCalendar extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    const Cdate = "any day"
    return (
      <Calendar
      
      onChange={(range) => navigate("PastDay", {screen: "PastDay", Cdate: "range"})}
      minDate="2018-04-20"
      startDate="2020-01-01"
      endDate="2022-01-01"
      disableRange={true}
      theme={{
        activeDayColor: {},
        monthTitleTextStyle: {
          color: 'black',
          fontWeight: '300',
          fontSize: 16,
        },
        emptyMonthContainerStyle: {},
        emptyMonthTextStyle: {
          fontWeight: '200',
        },
        weekColumnsContainerStyle: {},
        weekColumnStyle: {
          paddingVertical: 10,
        },
        weekColumnTextStyle: {
          color: '#b6c1cd',
          fontSize: 13,
        },
        nonTouchableDayContainerStyle: {},
        nonTouchableDayTextStyle: {},
        startDateContainerStyle: {},
        endDateContainerStyle: {},
        dayContainerStyle: {},
        dayTextStyle: {
          color: '#2d4150',
          fontWeight: '200',
          fontSize: 15,
        },
        dayOutOfRangeContainerStyle: {},
        dayOutOfRangeTextStyle: {},
        todayContainerStyle: {},
        todayTextStyle: {
          color: '#6d95da',
        },
        activeDayContainerStyle: {
          backgroundColor: '#6d95da',
        },
        activeDayTextStyle: {
          color: 'white',
        },
        nonTouchableLastMonthDayTextStyle: {},
      }}
    />
    





    );
  }
}
const styles = StyleSheet.create({
  label: {
    padding: 10,
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },
  container: {
    //padding: 20,
    width: '100%',
    //apsectRatio: 2/1,
    height: '100%',
  },
  buttoncontain: {
    //flexDirection: 'row',
  },
  trackerText: {
    padding: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },

  header: {
    alignSelf: 'center',
    fontSize: 40,
    color: 'white'
  },

  elementContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 100,
    alignContent: 'flex-end',
  },

  button: {
    backgroundColor: 'red',
    paddingLeft: 50,
  },

  numbers: {
    fontSize: 30,
    backgroundColor: '#acafb5',
    paddingLeft: 30,
    paddingRight: 30,
  },

  textinput: {
    paddingRight: 50,
    fontSize: 22,
  },

  tracker: {
    borderWidth: 1,
    padding: 5,

    backgroundColor: global.trackerColor,
    borderRadius: 100,
    margin: 5,
    borderColor: '#05878a',

  },
  button2: {
    fontSize: 30,
    color: 'white',
    margin: 5,
    padding: 5,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  touch: {
    padding: 10,
    width: 450,
    margin: 20,
    marginTop: 350,
    borderWidth: 2,
    borderColor: '#05878a',
    backgroundColor: '#074e67',
    alignSelf: 'center'
  },
  modalContent: {
    flex: 2,
  }

});