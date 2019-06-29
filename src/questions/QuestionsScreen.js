import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class QuestionsScreen extends React.Component {
    static navigationOptions = {
      //title: 'Welcome',
      header: null
    };

    render() {
        const { navigation } = this.props;
        const myName = navigation.getParam('myName', 'toi');
        const friendName = navigation.getParam('friendName', 'moi');
        console.log(this.props)
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
