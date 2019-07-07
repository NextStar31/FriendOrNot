import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";
import i18n from "../i18n";

import { AdMobBanner } from "expo-ads-admob";

export default class StartScreen extends React.Component {
  static navigationOptions = {
    //title: 'Welcome',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      myName: i18n.t("START.defaultMyName"),
      friendName: i18n.t("START.defaultFriendName")
    };
  }

  bannerError() {
    console.log("An error");
    return;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.subtitle}>{i18n.t("START.subtitle")}</Text>

          <Text style={styles.name}>{i18n.t("START.myName")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ myName: text })}
            value={this.state.myName}
          />

          <Text style={styles.name}>{i18n.t("START.friendName")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ friendName: text })}
            value={this.state.friendName}
          />
          <TouchableHighlight
            onPress={() =>
              navigate("Questions", {
                myName: this.state.myName,
                friendName: this.state.friendName
              })
            }
            style={styles.btnClickContain}
          >
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>
                {i18n.t("START.action").toUpperCase()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View>
          <AdMobBanner
            bannerSize="smartBannerLandscape"
            adUnitID="ca-app-pub-2959761366823394/3324961400" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError}
          />
        </View>
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
  subtitle: {
    textAlign: "center",
    fontSize: 24,
    color: "#e88f00",
    lineHeight: 30,
    margin: 20,
    fontWeight: "bold"
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
    margin: 10
  },
  input: {
    padding: 10,
    borderRadius: 4,
    minWidth: "30%",
    maxWidth: "90%",
    borderWidth: 0.5,
    // borderColor: "#d6d7da",
    borderColor: "#e88f00",
    fontSize: 18,
    lineHeight: 24,
    margin: 10
  },
  btnClickContain: {
    alignSelf: "center",
    backgroundColor: "#e88f00",
    borderRadius: 5,
    padding: 5,
    margin: 50,
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
