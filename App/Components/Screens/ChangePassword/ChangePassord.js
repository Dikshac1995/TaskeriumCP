import React, { Component, useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet, Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { globals, helpers, validators, API } from '../../../Config';
import { mainStyle, images, sty } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Custom/Loader/Loader';





const ChangePassword = (props) => {
    const localize = useSelector(state => state.localize);
    const [currentPassword, setcurrentPassword] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [loading, setloading] = useState(false);
    const loginData = useSelector(state => state.loginData);

    useEffect(() => {

    }, [])
    const resetPassword = async () => {
        setloading(true)
        let token = await AsyncStorage.getItem('token');
        let userAuthdetails = await helpers.userAuthdetails();

        const baseUrl = await AsyncStorage.getItem("baseUrl");
        const userName = await AsyncStorage.getItem("userName");

        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    // console.log("success res:", res)
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert(
                            'Success',
                            helpers.getLocale(localize, "changePassword", "onSubmitSuccess"),
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        props.navigation.navigate('LogIn')
                                    }
                                },
                            ]
                        );
                    }, 100)

                },

                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert("Error", err.message)
                    }, 100)

                },
                complete: () => {
                    setloading(false)
                },
            };

            let header = helpers.buildHeader({
                Authorization: token
            });
            let data = {
                "username": userName,
                "password": password,
                "api_key": globals.API_KEY
            };
            API.resetpassword(data, cb, header);
        } else {
            // getEndPoint()
        }
    }


    const saveHandler = async () => {
        if (currentPassword && password && confirmPassword) {
            let aynscPassword = await AsyncStorage.getItem('password');
            if (aynscPassword === currentPassword) {
                if (password === confirmPassword) {
                    resetPassword()
                }
                else {
                    Alert.alert(helpers.getLocale(localize, "changePassword", "passwordNotMatch"))
                }
            }
            else {
                Alert.alert(helpers.getLocale(localize, "changePassword", "currentPasswordNotMatched"))
            }
        }
        else {
            Alert.alert(helpers.getLocale(localize, "changePassword", "onSubmit"))
        }

    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            <_Header header={helpers.getLocale(localize, "changePassword", "change_password")} />
            <View style={{}}>
                
                <_InputText
                    style={styles.TextInput}
                    value={currentPassword}
                    placeholder={helpers.getLocale(localize, "changePassword", "current_password")}
                    onChangeText={value => { setcurrentPassword(value) }}
                    secureTextEntry
                />
                <_InputText
                    style={styles.TextInput}
                    value={password}
                    placeholder={helpers.getLocale(localize, "changePassword", "new_password")}
                    onChangeText={value => { setpassword(value) }
                    } secureTextEntry
                />
                <_InputText
                    style={styles.TextInput}
                    value={confirmPassword}
                    placeholder={helpers.getLocale(localize, "changePassword", "repeat_password")}
                    onChangeText={value => { setconfirmPassword(value) }
                    } secureTextEntry
                />
            </View>
            <View style={styles.signUpWrapper}>
                <View style={styles.signUpView}>
                    <_Button
                        btnTxt={helpers.getLocale(localize, "changePassword", "save")}
                        callback={saveHandler} />
                </View>
            </View>
        </View >

    );
};

export default MainHoc(ChangePassword)

