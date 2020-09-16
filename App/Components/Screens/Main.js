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
import { connect } from 'react-redux';
import { setTranslation } from "../../Redux/Actions/LocalizeAction";


import I18n from 'react-native-i18n';
var deviceLocale = I18n.currentLocale()

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            autoLogin: false,
        };
    }

    async componentDidMount() {
        this.setUpDeviceLang();
        await this.getRememberedUser()

    }

    setUpDeviceLang = async () => {
        let DeviceLang = await AsyncStorage.getItem('DeviceLang');

        const deviceLanguage =
            Platform.OS === 'ios'
                ? NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
                : NativeModules.I18nManager.localeIdentifier;

        if (DeviceLang === null || deviceLanguage !== DeviceLang) {
            if (deviceLocale === 'lt-LT' || deviceLanguage === 'lt_LT') {
                this.props.setTranslation("he")
                await AsyncStorage.setItem("AppLang", "he");
            }
            else {
                this.props.setTranslation("en")
                await AsyncStorage.setItem("AppLang", "en");
            }
            await AsyncStorage.setItem("DeviceLang", deviceLanguage);

        }
        else {
            let appLang = await AsyncStorage.getItem('AppLang');
            if (appLang !== null)
                this.props.setTranslation(appLang)
            else
                this.props.setTranslation("en")

        }
    }

    getRememberedUser = async () => {
        let autoLogin = false;
        // const remeber = await AsyncStorage.getItem('RemeberMe');
        const token = await AsyncStorage.getItem("token");
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

        );
    }
}

const mapStateToProps = state => ({
    data: state.localize
})


const mapDispatchToProps = (dispatch) => {
    return {
        setTranslation: (type) => dispatch(setTranslation(type))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)



