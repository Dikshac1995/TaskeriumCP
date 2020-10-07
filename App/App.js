/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  YellowBox,
  // AsyncStorage
} from 'react-native';

import { MenuProvider } from 'react-native-popup-menu';
import { Root } from "native-base";
import { Provider } from 'react-redux'
import configureStore from './Redux/Stores/configureStore';
import Main from './Components/Screens/Main';
import { colors } from './Theme';
import AsyncStorage from '@react-native-community/async-storage';
import { API, helpers } from './Config';
import { Permission, PERMISSIONS_TYPE}from './AppPermission'



const App: () => React$Node = () => {
  const store = configureStore();

  useEffect(() => {
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    console.disableYellowBox = true;

  }, []);

  return (
    <Provider store={store}>
      <MenuProvider>
        <Root>
          <Main />
        </Root>
      </MenuProvider>

    </Provider>
  );
};



export default App;
