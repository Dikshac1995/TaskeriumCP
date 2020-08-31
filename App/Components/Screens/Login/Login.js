import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { globals, helpers, validators, API, } from '../../../Config';
import { mainStyle, images, sty } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../../../Redux/Actions/LoginAction'
import Loader from '../../Custom/Loader/Loader'
import { validation } from '../../../Config/Libs/helpers';
import { StackActions, CommonActions } from "@react-navigation/native";
// import { NavigationActions } from '@react-navigation/compat';




const Login = (props) => {
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState(!globals.live ? "jack@yopmail.com" : "");
    const [password, setpassword] = useState(!globals.live ? "123456" : "");
    const [customerId, setcustomerId] = useState("");
    const [checked, setchecked] = useState(false);
    const [loading, setloading] = useState(false);
    const [emailValid, setemailValid] = useState("");
    const [passwordValid, setpasswordValid] = useState("");
    // const loginData = useSelector(state => state.loginData);

    const dispatch = useDispatch();

    useEffect(() => {
        checkRemember()
    }, [])

    const checkRemember = async () => {
        const remeber = await AsyncStorage.getItem('RemeberMe');
        if (remeber !== null) {
            const remebervalue = JSON.parse(remeber)
            setchecked(remebervalue)
            if (remebervalue) {
                const userName = await AsyncStorage.getItem("userName");
                const password = await AsyncStorage.getItem("password");
                setuserName(userName)
                setpassword(password)
            }
        }
    }

    const signinHandler = () => {
        if (userName && password && customerId) {
            const emailerr = validation("email", userName)
            if (!emailerr) {
                Alert.alert(helpers.getLocale(localize, "login", "validation_err"))
            }
            else {
                getEndPoint();
            }
        }
        else {
            Alert.alert(helpers.getLocale(localize, "login", "onSubmit"))

        }
    }

    const checkApiBaseUrl = async () => {
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl) {
        } else {
            getEndPoint()
        }
    }
    const toggleRememberMe = async () => {
        await AsyncStorage.setItem('RemeberMe', JSON.stringify(!checked));
        setchecked(!checked)
    }

    const logInUser = () => {
        let cb = {
            success: async (res) => {
                console.log({ res })
                await AsyncStorage.setItem("userAuthDetails", JSON.stringify(res[0]));
                await AsyncStorage.setItem("token", res[0].token);
                await AsyncStorage.setItem("userName", userName);
                await AsyncStorage.setItem("password", password);
                dispatch(login({ res }))
                setloading(false)
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Tasks' },
                        ],
                    })
                );

            },
            error: (err) => {
                console.log(err, "e")
                setloading(false)
                if (err.type === 'AUTHORIZATION' || err.message === 'Not logged in / Wrong password or username / Token expired') {
                    setTimeout(() => {
                        Alert.alert("Wrong username or password")
                    }, 100)
                }
                else {
                    setTimeout(() => {
                        Alert.alert(err.message)
                    }, 100)
                }

            },
            complete: () => {
                setloading(false)
            },
        };

        let header = helpers.buildHeader({});
        let data = {
            username: userName,
            password: password,
            api_key: globals.API_KEY
        };
        API.loginUser(data, cb, header);
    }

    const getEndPoint = () => {
        let cb = {
            success: async (res) => {
                if (res.error === null) {
                    await AsyncStorage.setItem("baseUrl", res.result.ws_url);
                    logInUser()
                } else {
                    setloading(false)
                    if (res.error.code === "COMPANY_NOT_FOUND") {
                        Alert.alert(res.error.code)
                    }
                    else {
                        Alert.alert('Error in fetch end Point', 'Authentication failed');
                    }
                }
            },
            error: (err) => {
                // console.log("err", err)
                setloading(false)
                setTimeout(() => {
                    Alert.alert("Error", err.message)
                }, 100);
            },
            complete: () => { setloading(false) },
        };
        setloading(true)
        let header = helpers.buildHeader({});
        let data = {
            company_code: customerId
        };
        API.getEndPoint(data, cb, header);
    };

    return (

        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            <View style={{}}>
                <View style={styles.logoWrap}>
                    <FastImage
                        style={styles.logo}
                        source={images.logo}
                        resizeMode={"contain"}
                    />
                </View>
                <View style={styles.headingWarp}>
                    <Text allowFontScaling={false} style={styles.headingText}> {helpers.getLocale(localize, "login", "customer_portal")} </Text>
                </View>
            </View>
            <View style={{}}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "userName")}
                    onChangeText={value => { setuserName(value) }}
                    value={userName}
                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "password")}
                    onChangeText={value => { setpassword(value) }}
                    value={password}
                    secureTextEntry

                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "customerId")}
                    onChangeText={value => { setcustomerId(value) }}
                    value={customerId}
                />
                <View style={styles.checkboxWrapper}>
                    <TouchableOpacity
                        onPress={() => toggleRememberMe()}
                        style={{ ...sty.fRow, paddingTop: 0, paddingLeft: 10, borderWidth: 0, width: "60%", ...sty.aCenter }}>
                        <FastImage
                            style={styles.checkBoxlogo}
                            source={checked ? images.checked : images.unchecked}
                            resizeMode={"contain"}
                        />
                        <Text allowFontScaling={false} style={styles.rememberMeText}> {helpers.getLocale(localize, "login", "rememberMe")} </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ paddingTop: 60 }}>
                <_Button
                    style={styles.button}
                    btnTxt={helpers.getLocale(localize, "login", "signIn")}
                    callback={signinHandler} />
                <View style={styles.forgetPassView}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('ForgetPassword')
                        }}
                        style={styles.forgetPass}>
                        <Text allowFontScaling={false} style={styles.forgetPassText}> {helpers.getLocale(localize, "login", "forgotPassword")} </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.signUpWrapper}>
                <View style={styles.signUpView}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('SignUp')
                        }}
                        style={styles.signUp}>
                        <Text allowFontScaling={false} style={styles.signUpText}> {helpers.getLocale(localize, "login", "signUp")} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >

    );
};

export default MainHoc(Login)

