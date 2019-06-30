import {createStackNavigator, createAppContainer} from 'react-navigation';
import QuestionsScreen from './src/questions/QuestionsScreen';
import StartScreen from './src/start/StartScreen';

const MainNavigator = createStackNavigator({
  Start: {screen: StartScreen},
  Questions :{screen: QuestionsScreen}
});

const App = createAppContainer(MainNavigator);

export default App;