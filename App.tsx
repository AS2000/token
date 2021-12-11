import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScreen from './screens/Signin/Signin';
import ProfileScreen from './screens/Profile/Profile';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import store from './redux/store';
import { setToken } from './redux/actions';
import  { getToken } from './helper';

const AppBody: React.FC  = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const storage = async() => {
      const token = await getToken();
      if (token) {
        dispatch(setToken(token));
      } else {
        dispatch(setToken(null));
      }
    };
    storage();
  },[])

  const Stack = createStackNavigator();
  const token = useAppSelector(state => state.token);
  const isLoading = useAppSelector(state => state.isLoading);
  const isSignout = useAppSelector(state => state.isSignout);
  console.log('token: ', token);
  console.log('isLoading: ', isLoading);
  console.log('isSignout: ', isSignout);

  return (
    <NavigationContainer>
      <Stack.Navigator>
          {(isLoading
            ? (<Stack.Screen name="Loading" component={SplashScreen} />)
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


const App: React.FC  = () => (
  <Provider store={store}>
    <AppBody />
  </Provider>
);

export default App;
