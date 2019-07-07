import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Share
} from "react-native";
import i18n from "../i18n";

import { AnimatedCircularProgress } from "react-native-circular-progress";

export default class ResultScreen extends React.Component {
  static navigationOptions = {
    //title: 'Welcome',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      friendName: "",
      result: 0
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState(
      {
        friendName: navigation.getParam("friendName"),
        result:
          (navigation.getParam("points") * 100) /
          (navigation.getParam("numberOfQuestions") * 10)
      },
      () => {
        this.circularProgress.animate(this.state.result, 2000);
      }
    );
  }

  generateText(value) {
    if (
      this.state.friendName != null &&
      this.state.friendName.trim().length != 0 &&
      this.state.friendName != i18n.t("START.defaultFriendName")
    ) {
      value = value.replace(i18n.t("keyword"), this.state.friendName);
    }
    return value;
  }

  onShare = async () => {
    try {
      await Share.share({
        message: this.generateText(
          i18n.t("RESULT.shareMessage") + this.state.result + "%"
        )
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.result}>
          {this.generateText(i18n.t("RESULT.title"))}
        </Text>

        <AnimatedCircularProgress
          size={150}
          width={10}
          fill={100}
          tintColor="#e88f00"
          backgroundColor="#3d5875"
          ref={ref => (this.circularProgress = ref)}
        >
          {fill => <Text style={styles.result}>{Math.floor(fill)}</Text>}
        </AnimatedCircularProgress>

        <TouchableHighlight
          onPress={() => {
            this.onShare();
          }}
          style={styles.btnClickContain}
        >
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>
              {i18n.t("RESULT.share").toUpperCase()}
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => navigate("Start")}
          style={styles.btnClickContain}
        >
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>
              {i18n.t("RESULT.replay").toUpperCase()}
            </Text>
          </View>
        </TouchableHighlight>
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
  },
  result: {
    fontSize: 30,
    lineHeight: 34
  }
});
