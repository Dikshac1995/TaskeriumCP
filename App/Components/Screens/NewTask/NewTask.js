import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Alert, Image, Text, FlatList, TouchableOpacity
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { globals, helpers, validators, API } from '../../../Config';
import { mainStyle, images, sty } from '../../../Theme';
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import _PairButton from '../../Custom/Button/_PairButton';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Custom/Loader/Loader'
// import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { StackActions, CommonActions } from "@react-navigation/native";
import RNFS from 'react-native-fs'
import AddressLocation from '../map'
import ImagePicker1 from 'react-native-image-crop-picker';
import { Container, Header, Button, Content, ActionSheet } from "native-base";
import Map from "../map"
import { localeData } from 'moment';

const NewTask = (props) => {
    const localize = useSelector(state => state.localize);
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [customer_id, setcustomer_id] = useState("");
    const [edit, setedit] = useState(false);
    const [picture, setpicture] = useState("");
    const [document, setdocument] = useState(" ");
    const [task_id, settask_id] = useState("");
    const [uploadedDoc, setuploadedDoc] = useState([]);
    const [uploadedImg, setuploadedImg] = useState([]);
    const [initialLoading, setinitialLoading] = useState(true);
    const [loading, setloading] = useState(false);
    const [locationExpand, setlocationExpand] = useState(false)
    const [count, setCount1] = useState(0)
    const Document = [];
    var BUTTONS = ["Camera", "Galary", "Cancel"];
    var CANCEL_INDEX = 2;




    useEffect(() => {
        get_customer_data()

    }, [])

    const get_customer_data = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    let customer_data = res[0].objects
                    setname(customer_data[0].name)
                    setaddress(customer_data[0].address)
                    setcustomer_id(customer_data[0].customer_id)
                    setinitialLoading(false)
                },
                error: (err) => {
                    Alert.alert(err.message)
                    setinitialLoading(false)
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            console.log('header', header)
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.get_customers_data(data, cb, header);
        }

    }

    // const apiCall = (async) => {
    //    let data =await Promise.all() 

    //  }
    const addTask = async () => {
        setloading(true)
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    settask_id(res.record_id)

                    if (uploadedDoc.length > 0) {
                        // uploadDoc(uploadedDoc[0], res.record_id)

                        var mape = uploadedDoc.map(async (element) => {
                            // console.log(element)
                            await uploadDoc(element, res.record_id)
                        });




                    }

                    else {
                        setloading(false),
                            Alert.alert('Success', helpers.getLocale(localize, "newTask", "task_save"),
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            props.navigation.navigate('Tasks')
                                        }
                                    },
                                ])
                    }
                },
                error: (err) => {
                    setloading(false)
                    Alert.alert("error", err.message)
                },
                complete: () => {
                    setloading(false)

                },
            };
            let header = helpers.buildHeader();
            console.log('header', header)
            let newdata = [
                edit ?
                    {
                        "object": name,
                        "address": address,
                        "description": description,
                        "title": title,
                    } :
                    {
                        "customer_id": customer_id,
                        "object": name,
                        "address": address,
                        "description": description,
                        "title": title,
                    }
            ]
            console.log('newdata', newdata)
            let data = {
                "user_id": userAuthdetails.user_id,
                "task_actions": newdata,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };


            API.sync_data(data, cb, header);
        }
    }
    // const addPicture = () => {
    //     if (!task_id) {
    //         Alert.alert(helpers.getLocale(localize, "newTask", "taskid_not_availabel"))

    //     }
    //     else {
    //         const options = {
    //             title: 'Select Photo',
    //             storageOptions: {
    //                 skipBackup: true,
    //                 path: 'images',
    //             },
    //         };
    //         ImagePicker.showImagePicker(options, (response) => {
    //             const base64Value = response.data;
    //             if (response.didCancel) {
    //                 console.log('User cancelled image picker');
    //             } else if (response.error) {
    //                 console.log('ImagePicker Error: ', response.error);
    //             } else if (response.customButton) {
    //                 console.log('User tapped custom button: ', response.customButton);
    //             } else {
    //                 console.log('picker resp', response)
    //                 uploadDoc(response.fileName, response.uri, base64Value, " ", "Photo1")
    //             }
    //         });
    //     }
    // }
    const imagePicker = () => {
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: "Select Photo"
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    imagefromCamera()
                }
                else if (buttonIndex === 1) {
                    imagefromGalary()
                }
            }
        )


    }
    const imagefromGalary = () => {
        ImagePicker1.openPicker({
            width: 1000,
            height: 1000,
            includeBase64: true,
            cropping: false,
            mediaType: 'photo',

            smartAlbums: ['PhotoStream', 'Generic', 'Panoramas', 'Videos', 'Favorites', 'Timelapses', 'AllHidden', 'RecentlyAdded', 'Bursts', 'SlomoVideos', 'UserLibrary', 'SelfPortraits', 'Screenshots', 'DepthEffect', 'LivePhotos', 'Animated', 'LongExposure']
        }).then(response => {
            const base64 = response.data
            const name = response.path.split("/").pop()
            // uploadDoc(name, response.path, base64, " ", "Photo1")
            const item = {
                "fileName": name,
                "base64": base64
            }

            // const arr = [...uploadedImg]
            // arr.push(item)
            // Document.push(item);
            // setuploadedImg(arr)
            const array = [...uploadedDoc]
            array.push(item)
            setuploadedDoc(array)


        })
            .catch(err => {
                console.log("err", err)
            })

    }


    const imagefromCamera = () => {
        ImagePicker1.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true,
            mediaType: 'photo',
        }).then(response => {
            const base64 = response.data
            const name = response.path.split("/").pop()
            // uploadDoc(name, response.path, base64, " ", "Photo1")
            const item = {
                "fileName": name,
                "base64": base64
            }
            const array = [...uploadedDoc]
            array.push(item)
            setuploadedDoc(array)
        })
            .catch(err => {
                console.log("err", err)
            })

    }
    // (fileName, uri, photo, doc, image) 


    const uploadDoc = async (dataValue, taskId) => {
        const id = taskId
        console.log("count", count)

        setCount1(count + 1)



        // setloading(true)
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {

                    console.log({ res })
                    // console.log({ count })
                    // console.log("uploadedDoc", uploadedDoc.length)

                    // if (count > 0 && count < uploadedDoc.length) {
                    //     console.log("loop count", count)
                    //     uploadDoc(uploadedDoc[count], id)
                    // }
                    // else {
                    //     console.log("else", count)
                    //     setTimeout(() => { setloading(false) }, 300)
                    //     props.navigation.navigate('Tasks')
                    // Alert.alert('Success', helpers.getLocale(localize, "newTask", "task_save"))
                    // [
                    //     {
                    //         text: 'OK', onPress: () => {

                    //         }
                    //     },
                    // ])
                    // }
                    return res
                },
                error: (err) => {
                    console.log({ err })
                    setloading(false)

                    Alert.alert("error in saving" + uploadedDoc[count].fileName, err.message)
                },
                complete: () => {
                    setloading(false)

                },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_id": taskId,
                "filename": dataValue.fileName,
                "photo": dataValue.base64,
                "api_key": globals.API_KEY,
            };
            console.log("data", data)
            API.postDocument(data, cb, header);
        } else {
            // getEndPoint()
        }

    }
    const onEdit = () => {
        setedit(true)
    }
    const cancleButtonHandler = () => {
        props.navigation.goBack()
    }

    const saveButtonHandler = () => {
        if (title && address && name) {
            addTask()
        }
        else {
            Alert.alert(helpers.getLocale(localize, "newTask", "validation_err"))

        }
    }

    const addDocument = async () => {

        DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles]
        })
            .then(res => {
                console.log('rest', res, res.uri)
                let filepath = ""
                if (Platform.OS === "android") {
                    filepath = res.uri
                } else {
                    let basepath = res.uri.substring(0, res.uri.lastIndexOf("/"));
                    filepath = basepath + "/" + res.name;
                }
                RNFS.readFile(filepath, "base64").then(result => {
                    // uploadDoc(res.name, res.uri, result, "Doc1 ", " ")
                    const item = {
                        "fileName": res.name,
                        "base64": result
                    }
                    const array = [...uploadedDoc]
                    array.push(item)
                    setuploadedDoc(array)
                })

            })
            .catch(error => {
                console.log(error)
            })
        // }
    }
    const signout = async () => {
        let token = await AsyncStorage.getItem('token');
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setloading(false)
                    AsyncStorage.removeItem('userAuthDetails');
                    AsyncStorage.removeItem('token');
                    // AsyncStorage.removeItem('userName');
                    // props.navigation.navigate('LogIn')
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'LogIn' },
                            ],
                        })
                    );
                },
                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        props.navigation.navigate('LogIn')
                        Alert.alert("Error", err.message)
                    }, 200);

                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.signOut(data, cb, header);
        } else {

        }

    }

    const pressHandle = (data) => {
        if (data) {
            setaddress(data)
        }
        setlocationExpand(false)
        setedit(true)
    }


    return (
        <>
            {(!locationExpand) ?
                <View style={[mainStyle.rootView, styles.container]}>
                    <Loader
                        loading={loading} />
                    {initialLoading ? < Loader
                        name /> :
                        <>
                            <_Header header={helpers.getLocale(localize, "newTask", "new_task")}
                                rightIcon1={images.menu1}
                                rightcb
                                rightIcon="ellipsis-v"
                                onPress_signout={() => signout()}
                                onPress={() => props.navigation.navigate('ChangePassord')}
                            />
                            <View style={{}}>

                                <_InputText
                                    style={styles.TextInput}
                                    value={title}
                                    placeholder={helpers.getLocale(localize, "newTask", "title")}
                                    onChangeText={value => {
                                        settitle(value)
                                    }}
                                />
                                <_InputText
                                    style={styles.TextInput1}
                                    placeholder={helpers.getLocale(localize, "newTask", "name")}
                                    value={name.trim()}
                                    onChangeText={value => {
                                        setname(value),
                                            onEdit()
                                    }
                                    }
                                />
                                <_InputText
                                    style={styles.TextInput1}
                                    placeholder={helpers.getLocale(localize, "newTask", "address")}
                                    value={address}
                                    leftIcon={images.location}
                                    onChangeText={value => {
                                        setaddress(value), onEdit()
                                    }}
                                    multiline={true}

                                    callback={() =>
                                        setlocationExpand(true)
                                        // props.navigation.navigate("AddressLocation", { address: address })
                                        // { AddressLocation() }
                                        // Alert.alert("hi")}
                                    }
                                // ellipsizeMode="tail"
                                />
                                <_InputText
                                    style={styles.TextInput1}
                                    value={description}
                                    placeholder={helpers.getLocale(localize, "newTask", "description")}
                                    onChangeText={value => { setdescription(value) }
                                    }
                                />


                                <_PairButton
                                    icon1={images.camera}
                                    icon2={images.document}
                                    icon1Style={styles.pairButtonIcon}
                                    txtStyle1={{ color: "red" }}
                                    callback1={() => {
                                        // addPicture()
                                        imagePicker()
                                    }}
                                    callback2={() => { addDocument() }}
                                    style={styles.pairButton}
                                />
                                <View style={styles.uploadDocWrapper}>
                                    <FlatList
                                        data={uploadedImg}
                                        renderItem={({ item, index }) =>
                                            <Text style={styles.text}>{item.fileName}</Text>}

                                        keyExtractor={(item, index) => index.toString()}
                                        removeClippedSubviews={Platform.OS == "android" ? true : false}
                                    />
                                    <FlatList
                                        data={uploadedDoc}
                                        renderItem={({ item, index }) =>
                                            <Text style={styles.text}>{item.fileName}</Text>}

                                        keyExtractor={(item, index) => index.toString()}
                                        removeClippedSubviews={Platform.OS == "android" ? true : false}
                                    />
                                </View>

                            </View>
                            <View style={[styles.signUpWrapper, { borderWidth: 0 }]}>
                                <View style={styles.signUpView}>
                                    <_PairButton
                                        btnTxt1={helpers.getLocale(localize, "task", "cancel")}
                                        btnTxt2={helpers.getLocale(localize, "task", "save")}
                                        txtStyle1={{ color: "red", }}
                                        callback1={() => { cancleButtonHandler() }}
                                        callback2={() => { saveButtonHandler() }}
                                    />
                                </View>
                            </View>
                        </>}
                </View >
                :
                <Map onPressmap={(data) => { pressHandle(data) }} />}
        </>

    );
};

export default MainHoc(NewTask)

