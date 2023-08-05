/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// App.tsx

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper'; // Import 'Provider' from 'react-native-paper' as 'PaperProvider'

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {TaskProvider} from './context/TaskContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    checkStoredUserData();
  }, []);

  const checkStoredUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString !== null) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  return (
    <PaperProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {userLoggedIn ? (
              <>
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </PaperProvider>
  );
}

export default App;
