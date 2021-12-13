import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import store from './redux/store';
import { setToken, setIsPortait } from './redux/actions';
import  { getToken } from './helper';
import { isPortrait } from './helper/platform';
import  { fetchImage } from './api/images';
import  { IMAGE_URL } from './api/constants';
import SigninScreen from './screens/Signin/Signin';
import ProfileScreen from './screens/Profile/Profile';
import SplashScreen from './screens/SplashScreen/SplashScreen';

const AppBody: React.FC  = () => {
  const window = useWindowDimensions();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const images = async() => {
      await fetchImage(IMAGE_URL);
    }
    images();

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

  React.useEffect(() => {
    dispatch(setIsPortait(isPortrait(window)))
},[window]);

  const Stack = createStackNavigator();
  const token = useAppSelector(state => state.token);
  const isLoading = useAppSelector(state => state.isLoading);

  const renderSplashScreen = () => (
    <Stack.Screen
      name="Loading"
      component={SplashScreen}
      options={{ title: '', headerShown: false }}
    />
  );

  const renderDataScreens = () => (
    <>
      {
        token == null
          ? (<Stack.Screen
              name="SignIn"
              component={SigninScreen}
              options={{ title: '', headerShown: false }}
            />)
          : (<Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: '' }}
            />)
      }
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
          {(isLoading
            ? renderSplashScreen()
            : renderDataScreens()
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
