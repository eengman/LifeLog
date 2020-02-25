import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
} from 'react-native';

//var value =
var incPercent = 100 / 3;
 
import ProgressBarAnimated from 'react-native-progress-bar-animated';
 
export default class App extends React.Component {
 
  state = {
    progress: 0,
    epicProgress: 0,
    progressCustomized: 0,
  }
 
  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }
 
  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red', 
      borderRadius: 0,
      borderColor: 'orange',
    };
 
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Epic</Text>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.epicProgress}
            backgroundColorOnComplete="#6CC644"
            onComplete={() => {
                Alert.alert('Hey!', 'Good job!');
              }}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}>
              <Button
                title="Progress"
                onPress={this.increase.bind('','epicProgress', incPercent)}
              />
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.label}>Epicness</Text>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.epicProgress}
            backgroundColorOnComplete="#6CC644"
            onComplete={() => {
              Alert.alert('Hey!', 'onComplete event fired!');
            }}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}>
              <Button
                title="Progress"
                onPress={this.increase.bind(this, 'epicProgress', incPercent)}
              />
            </View>
          </View>
        </View>
        
      </View>

      
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
  separator: {
    marginVertical: 30,
    borderWidth: 0.5,
    borderColor: '#DCDCDC',
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
});