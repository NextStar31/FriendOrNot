import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

export default function App() {

  _onStart = () => {
   console.log('Press');
  };

  return (
    <View style={styles.container}>
      <Text>Test your friendship ! </Text>

      <Button
              onPress={this._onStart}
              title="Begin"
              color="#e88f00"
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
