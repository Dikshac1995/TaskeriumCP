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
        if(deviceLocale === 'It-LT'|| deviceLanguage==='It_LT'){
            this.props.setTranslation("he")
        }
        else{
            this.props.setTranslation("en") 
        }
        // Alert.alert("Lang found ", deviceLocale + " " + deviceLanguage)
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
        console.log("reducer",this.props.data)
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

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
    return {
        setTranslation: (type) => dispatch(setTranslation(type))
        // getCartData: (type) => dispatch(getCartData(type))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)







// export default Main;