import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  InputAccessoryView
} from "react-native";

export default class StartScreen extends React.Component {
  static navigationOptions = {
    //title: 'Welcome',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { myName: "Me", friendName: "Friend" };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Test your friendship ! </Text>

        <Text>Your name :</Text>
        <TextInput
          style={{
            padding: 10,
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da"
          }}
          onChangeText={text => this.setState({ myName: text })}
          value={this.state.myName}
        />

        <Text>Your friend name : </Text>
        <TextInput
          style={{
            padding: 10,
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da"
          }}
          onChangeText={text => this.setState({ friendName: text })}
          value={this.state.friendName}
        />

        <Button
          onPress={() =>
            navigate("Questions", {
              myName: this.state.myName,
              friendName: this.state.friendName
            })
          }
          title="Begin"
          color="#e88f00"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
