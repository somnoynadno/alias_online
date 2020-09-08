import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import IndexScreen from './screens/IndexScreen';
import RegisterScreen from './screens/RegisterScreen';
import NewGameScreen from './screens/NewGameScreen';
import JoinGameScreen from './screens/JoinGameScreen';
import GameScreen from './screens/GameScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createStackNavigator();

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="Index" component={IndexScreen}/>
                    <Stack.Screen name="NewGame" component={NewGameScreen}/>
                    <Stack.Screen name="JoinGame" component={JoinGameScreen}/>
                    <Stack.Screen name="Game" component={GameScreen}/>
                    <Stack.Screen name="Results" component={ResultsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
