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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { Root } from "native-base";

import { Provider } from 'react-redux'
import configureStore from './Redux/Stores/configureStore';
// import RootScreen from './Containers/Root/RootScreen'
import Main from './Components/Screens/Main';
import { colors } from './Theme';
import AsyncStorage from '@react-native-community/async-storage';
import { API, helpers } from './Config';
import { Permission, PERMISSIONS_TYPE}from './AppPermission'



const App: () => React$Node = () => {
  const store = configureStore();

  useEffect(() => {
    // console.log("useEffect App.js")
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    console.disableYellowBox = true;
    // setDefaultFontStyle()

    // checkApiBaseUrl()
    Permission.requestMultiplePermission([PERMISSIONS_TYPE.camera,
      PERMISSIONS_TYPE.photo,
      PERMISSIONS_TYPE.location
    ])

  }, []);

  // const checkApiBaseUrl = async () => {
  //   const baseUrl = await AsyncStorage.getItem("baseUrl");
  //   console.log("baseUrl :", baseUrl)

  //   if (baseUrl) {
  //     console.log("baseUrl 1:")
  //   } else {
  //     console.log("baseUrl 2:")
  //     getEndPoint()
  //   }

  //   // await AsyncStorage.setItem("baseUrl", res.data.token);

  // }

  // const getEndPoint = () => {
  //   let cb = {
  //     success: (res) => {
  //       console.log("success res:", res)
  //     },
  //     error: (err) => { },
  //     complete: () => { },
  //   };
  //   let header = helpers.buildHeader({ authorization: "" });
  //   let data = {
  //     company_code: "app"
  //   };
  //   API.getUserInfo(data, cb, header);
  // };

  // const setDefaultFontStyle = () => {
  //   console.log("setDefaultFontStyle")
  //   let oldRender = Text.render;
  //   Text.render = function (...args) {
  //     let origin = oldRender.call(this, ...args);
  //     return React.cloneElement(origin, {
  //       style: [{ fontFamily: 'MyriadPro-Light', color: colors.text, }, origin.props.style]
  //     });
  //   };
  // }


  return (
    // <>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       style={styles.scrollView}>
    //       <Header />
    //       {global.HermesInternal == null ? null : (
    //         <View style={styles.engine}>
    //           <Text style={styles.footer}>Engine: Hermes</Text>
    //         </View>
    //       )}
    //       <View style={styles.body}>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>Step One</Text>
    //           <Text style={styles.sectionDescription}>
    //             Edit <Text style={styles.highlight}>App.js</Text> to change this
    //             screen and then come back to see your edits.
    //           </Text>
    //         </View>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>See Your Changes</Text>
    //           <Text style={styles.sectionDescription}>
    //             <ReloadInstructions />
    //           </Text>
    //         </View>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>Debug</Text>
    //           <Text style={styles.sectionDescription}>
    //             <DebugInstructions />
    //           </Text>
    //         </View>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>Learn More</Text>
    //           <Text style={styles.sectionDescription}>
    //             Read the docs to discover what to do next:
    //           </Text>
    //         </View>
    //         <LearnMoreLinks />
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </>

    <Provider store={store}>
      <MenuProvider>
        <Root>
          <Main />
        </Root>
      </MenuProvider>

    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
