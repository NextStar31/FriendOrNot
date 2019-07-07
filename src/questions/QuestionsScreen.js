import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import questions from "./Questions";
import i18n from "../i18n";
import { AdMobInterstitial, AdMobBanner, AdMobRewarded } from "expo-ads-admob";

export default class QuestionsScreen extends React.Component {
  static navigationOptions = {
    //title: 'Welcome',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      myName: null,
      friendName: null,
      points: 0,
      currentQuestion: 0,
      numberOfQuestions: 0,
      disableInterstitialBtn: false,
      isLoading: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      myName: navigation.getParam("myName"),
      friendName: navigation.getParam("friendName"),
      numberOfQuestions: questions.length
    });

    AdMobInterstitial.setAdUnitID("ca-app-pub-2959761366823394/4163400356");
    AdMobInterstitial.setTestDeviceID("EMULATOR");
    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      console.log("interstitialDidLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      console.log("interstitialDidFailToLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
      console.log("interstitialDidOpen");
      this.setState({
        isLoading: false
      });
    });
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      console.log("interstitialDidClose");
      const { navigate } = this.props.navigation;
      navigate("Result", {
        points: this.state.points,
        numberOfQuestions: this.state.numberOfQuestions,
        friendName:this.state.friendName
      });
    });
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      console.log("interstitialWillLeaveApplication")
    );
  }

  _openInterstitial = async () => {
    try {
      this.setState({
        isLoading: true
      });
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
    AdMobRewarded.removeAllListeners();
  }

  _onButtonPress = value => {
    let points = this.state.points + value;
    console.log(points);
    this.setState(
      {
        points: points
      },
      this.nextQuestion
    );
  };

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

  nextQuestion() {
    let current = this.state.currentQuestion + 1;
    if (current < 10) {
      this.setState({
        currentQuestion: current
      });
    } else {
      this._openInterstitial();
    }
  }

  render() {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={60} color="#e88f00" />
          </View>
        )}
        {!this.state.isLoading && (
          <View style={styles.container}>
            <View style={{ height: "12%", marginTop: "30%" }}>
              <Text style={styles.title}>
                Question {this.state.currentQuestion + 1} /{" "}
                {this.state.numberOfQuestions}
              </Text>
            </View>
            {
              // <View style={{ height: "20%",display: 'flex', justifyContent: 'center',   margin: 10 , borderWidth: 0.5}}>
            }
            <View style={{ height: "15%", margin: 10 }}>
              <Text style={styles.question}>
                {this.generateText(
                  i18n.t("QUESTION." + this.state.currentQuestion + ".q")
                )}
              </Text>
            </View>
            {questions[this.state.currentQuestion].response.map(r => (
              <TouchableHighlight
                key={r.id}
                onPress={() => this._onButtonPress(r.value)}
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <Text style={styles.btnText}>
                    {this.generateText(
                      i18n.t(
                        "QUESTION." + this.state.currentQuestion + ".r" + r.id
                      )
                    )}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        )}
        <View>
          <AdMobBanner
            bannerSize="smartBannerLandscape"
            adUnitID="ca-app-pub-2959761366823394/3324961400" // Test ID, Replace with your-admob-unit-id
            //testDeviceID="EMULATOR"
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
    alignItems: "center"
    //   justifyContent: "center"
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  btnClickContain: {
    alignSelf: "center",
    backgroundColor: "#e88f00",
    borderRadius: 5,
    padding: 5,
    margin: 10,
    width: "90%",
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
    textAlign: "center",
    fontSize: 18,
    color: "white",
    lineHeight: 24,
    fontWeight: "bold",
    padding: 5
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold"
    // height: "15%",
    // margin: "auto",
    //  borderWidth: 0.5
  },
  question: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "500",
    //height: "18%",
    color: "#e88f00",
    padding: 10
    // borderWidth: 0.5
  }
});
