import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class QuestionsScreen extends React.Component {
    static navigationOptions = {
      //title: 'Welcome',
      header: null
    };

    render() {
        const { navigation } = this.props;
        const myName = navigation.getParam('myName');
        const friendName = navigation.getParam('friendName');
      return (
        <View style={styles.container}>
        <Text>Play</Text>
        <Text>{myName}</Text>
        <Text>{friendName}</Text>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
