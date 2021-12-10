import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScreen from './screens/Signin/Signin';
import ProfileScreen from './screens/Profile/Profile';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import { useAppSelector } from './redux/hooks';
import store from './redux/store';

const isLoading = false;
const isSignout = false;

const AppBody = () => {
  const Stack = createStackNavigator();
  const token = useAppSelector(state => state.token);
  console.log('token: ', token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
          {(isLoading
            ? (<Stack.Screen name="Splash" component={SplashScreen} />)
            : token == null
              ? (<Stack.Screen
                  name="SignIn"
                  component={SigninScreen}
                  options={{
                    title: 'Sign in',
                    animationTypeForReplace: isSignout ? 'pop' : 'push',
                  }}
                />)
              : (<Stack.Screen name="Profile" component={ProfileScreen} />)
          )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};


const App = () => (
  <Provider store={store}>
    <AppBody />
  </Provider>
);

export default App;
