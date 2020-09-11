import React, { Component, useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    Platform,
    Alert
} from 'react-native';
import AppNavigator from "../../Navigators/AppNavigator";
import MainNavigator from "../../Navigators/MainNavigator";
import AsyncStorage from '@react-native-community/async-storage';

import I18n from 'react-native-i18n';
var deviceLocale = I18n.currentLocale()

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            autoLogin: false,
        };
        console.log("deviceLocale 1:", deviceLocale)

    }

    async componentDidMount() {
        console.log("deviceLocale 2:", deviceLocale)
        const deviceLanguage =
            Platform.OS === 'ios'
                ? NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
                : NativeModules.I18nManager.localeIdentifier;

        console.log("deviceLanguage :", deviceLanguage);
        Alert.alert("Lang found ", deviceLocale + " " + deviceLanguage)

        await this.getRememberedUser()

    }

    getRememberedUser = async () => {
        let autoLogin = false;
        // const remeber = await AsyncStorage.getItem('RemeberMe');
        const token = await AsyncStorage.getItem("token");
        console.log("token :", token)
        if (token !== null) {
            autoLogin = true
            // const remebervalue = JSON.parse(remeber)
            // if (remebervalue) {
            // autoLogin = token === null ? false : true;
            // }
        }

        this.setState({
            loading: false,
            autoLogin,
        });

    };

    componentWillUnmount() {

    }

    render() {
        const { loading, autoLogin } = this.state;
        console.log("loading autoLogin :", loading, autoLogin)
        return (

            loading ?
                (<View />)
                :
                autoLogin ?
                    (<MainNavigator
                        ref={(navigatorRef) => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                        }}
                    />) :
                    (<AppNavigator
                        ref={(navigatorRef) => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                        }}
                    />)
            // <Text style={{ fontSize: 20 }}>Amit</Text>
        );
    }
}







export default Main;