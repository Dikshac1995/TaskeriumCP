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
    StyleSheet,
    Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Input, Item } from 'native-base';
import { globals, helpers, validators, API, } from '../../../Config';
// import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _B, _Layout, _ListView, _ContentType, _InlineLoader } from '../../../../../custom';
// import { mainLayoutHoc } from '../../../../../hoc';
import { mainStyle, images, sty } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import Loader from '../../Custom/Loader/Loader'
import { validation } from '../../../Config/Libs/helpers';



import AsyncStorage from '@react-native-community/async-storage';


const SignUp = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState("");
    const [lastName, setlastName] = useState("");
    const [company, setcompany] = useState("");
    const [customerId, setcustomerId] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [loading, setloading] = useState(false);
    const [fNameValid, setfNameValid] = useState("");
    const [lNameValid, setlNameValid] = useState("");
    const [phoneNoValid, setphoneNoValid] = useState("");
    const [emailValid, setemailValid] = useState("");
    const [addressValid, setaddressValid] = useState("");
    const [cityValid, setcityValid] = useState("");
    const [comapanyValid, setcompanyValid] = useState("");




    useEffect(() => {

    }, [])

    const signinHandler = () => {
        if (email && userName && lastName && address && phoneNo && city && customerId) {
            const emailerr = validation("email", email)
            const phoneNoerr = validation("phoneNo", phoneNo)
            if (!phoneNoerr) {
                Alert.alert(helpers.getLocale(localize, "signIn", "phoneNo_err"))
            }
            else if (!emailerr) {
                Alert.alert(helpers.getLocale(localize, "forgetPassword", "validation_err"))
            }
            else {
                getEndPoint()
            }
        }
        else {
            Alert.alert(helpers.getLocale(localize, "signIn", "onSubmit"))
        }

    }

    const signupUser = () => {

        let cb = {
            success: async (res) => {
                // console.log("success res:", res)
                setloading(false)
                Alert.alert('Success', helpers.getLocale(localize, "signIn", "onSubmitSuccess"),
                    [
                        {
                            text: 'OK', onPress: () => {
                                props.navigation.navigate('LogIn')
                            }
                        },
                    ])
            },
            error: (err) => {
                setloading(false)
                // setTimeout(() => {
                Alert.alert("Error", err.message)
                // }, 100)

            },
            complete: () => {
                setloading(false)
            },
        };

        let header = helpers.buildHeader({});
        let data = {
            firstname: userName,
            lastname: lastName,
            phone: phoneNo,
            email: email,
            street: address,
            city: city,
            // post_code: "LT-12345",
            api_key: globals.API_KEY
        };
        API.registerUser(data, cb, header);

    }

    const getEndPoint = () => {
        setloading(true)
        let cb = {
            success: async (res) => {
                console.log("success res:", res)
                if (res.error === null) {
                    await AsyncStorage.setItem("baseUrl", res.result.ws_url);
                    signupUser()

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
                setloading(false)
                // setTimeout(() => {
                Alert.alert("Error", err.message)
                // }, 100)
            },
            complete: () => {
                setloading(false)
            },
        };

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
            <_Header header={helpers.getLocale(localize, "signIn", "signUp")} />
            <ScrollView style={{}}>
                <View style={{ paddingTop: 20 }}>
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "first_name")}
                        onChangeText={value => setuserName(value.trim())}
                        value={userName}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "last_name")}
                        onChangeText={value => setlastName(value.trim())}
                        value={lastName}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "company")}
                        onChangeText={value => setcompany(value.trim())}
                        value={company}

                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "login", "customerId")}
                        onChangeText={value => { setcustomerId(value.trim()) }}
                        value={customerId}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "phone")}
                        onChangeText={value => setphoneNo(value.trim())}
                        value={phoneNo}
                        keyboardType={'numeric'}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "email")}
                        onChangeText={value => setemail(value.trim())}
                        value={email}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "address")}
                        onChangeText={value => setaddress(value.trim())}
                        value={address}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "city")}
                        onChangeText={value => setcity(value.trim())}
                        value={city}
                    />

                </View>
                <View style={{ marginTop: 50 }}>
                    <_Button
                        btnTxt={helpers.getLocale(localize, "signIn", "signUp")}
                        callback={signinHandler} />
                </View>


                <View style={styles.signUpWrapper}>
                    <View style={styles.signUpView}>
                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('LogIn') }}
                            style={styles.signUp}>
                            <Text style={styles.signUpText}> {helpers.getLocale(localize, "signIn", "signIn")} </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>


        </View >

    );
};

export default MainHoc(SignUp)

