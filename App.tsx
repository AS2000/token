import * as React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Signin from './components/Signin/Signin';
import Profile from './components/Profile/Profile';
import store from './redux/store';

const switchNavigator = createSwitchNavigator({
    Signin: Signin,
    Profile: Profile,
  },
  {
    initialRouteName: 'Profile',
  }
);

const App = createAppContainer(switchNavigator);

export default () => (
	<Provider store={store}>
		<App />
	</Provider>
);
