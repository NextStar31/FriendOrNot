import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import i18n from "../i18n";

export default class ResultScreen extends React.Component {
  static navigationOptions = {
    //title: 'Welcome',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        points: 0,
        numberOfQuestions: 0
      };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      points: navigation.getParam("points"),
      numberOfQuestions: navigation.getParam("numberOfQuestions")
    });
  }



  render() {
      console.log(this.state.points)
      console.log(this.state.numberOfQuestions)
      let pourcent = this.state.points * 100 / (this.state.numberOfQuestions * 10);

    return (
      <View style={styles.container}>
        <Text>{pourcent}</Text>
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
  },
  btnClickContain: {
    alignSelf: "center",
    backgroundColor: "#e88f00",
    borderRadius: 5,
    padding: 5,
    margin: 10,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 18,
    color: "white",
    lineHeight: 30,
    fontWeight: "bold"
  }
});
