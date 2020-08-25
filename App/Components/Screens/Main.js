import React, { Component, useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar
} from 'react-native';
import AppNavigator from "../../Navigators/AppNavigator";
import MainNavigator from "../../Navigators/MainNavigator";
import AsyncStorage from '@react-native-community/async-storage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            autoLogin: false,
        };
    }

    async componentDidMount() {
        await this.getRememberedUser()
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
            // <Text style={{ fontSize: 20 }}>Amit</Text>
        );
    }
}







export default Main;