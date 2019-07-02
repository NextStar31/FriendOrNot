import {createStackNavigator, createAppContainer} from 'react-navigation';
import QuestionsScreen from './src/questions/QuestionsScreen';
import StartScreen from './src/start/StartScreen';
import ResultScreen from './src/result/ResultScreen';

const MainNavigator = createStackNavigator({
  Start: {screen: StartScreen},
  Questions :{screen: QuestionsScreen},
  Result :{screen: ResultScreen}
});

const App = createAppContainer(MainNavigator);

export default App;