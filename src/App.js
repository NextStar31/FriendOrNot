import {createStackNavigator, createAppContainer} from 'react-navigation';
import QuestionsScreen from './questions/QuestionsScreen';
import StartScreen from './start/StartScreen';

const MainNavigator = createStackNavigator({
  Start: {screen: StartScreen},
  Questions :{screen: QuestionsScreen}
});

const App = createAppContainer(MainNavigator);

export default App;