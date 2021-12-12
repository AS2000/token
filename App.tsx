import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import SigninScreen from './screens/Signin/Signin';
import ProfileScreen from './screens/Profile/Profile';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import store from './redux/store';
import { setToken, setIsPortait } from './redux/actions';
import  { getToken } from './helper';
import  { fetchImage } from './api/images';
import  { IMAGE_URL } from './api/constants';
import { isPortrait } from './helper/platform';

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
  console.log('token: ', token);
  console.log('isLoading: ', isLoading);

  return (
    <NavigationContainer>
      <Stack.Navigator>
          {(isLoading
            ? (<Stack.Screen name="Loading" component={SplashScreen} />)
            : token == null
              ? (<Stack.Screen
                  name="SignIn"
                  component={SigninScreen}
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
