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
    StyleSheet, Modal, TouchableHighlight, Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { globals, helpers, validators, API } from '../../../Config';
import { mainStyle, images, sty, colors } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import _PairButton from '../../Custom/Button/_PairButton';
import InfoCart from '../ContentType/InfoCart/InfoCart';
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from 'react-native-star-rating';
import { startClock } from 'react-native-reanimated';
import Loader from '../../Custom/Loader/Loader'
import { StackActions, CommonActions } from "@react-navigation/native";
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';


const Task = (props) => {
    const localize = useSelector(state => state.localize);
    const { task } = props.route.params
    const Document = task.item.documents
    const task_evaluation = task.item.evaluation
    const [message, setmessage] = useState("");
    const [modalVisible, setmodalVisible] = useState(false);
    const [msgExpand, setmsgExapnd] = useState(false);
    const [docExpand, setdocExapnd] = useState(false);
    const [starCount, setstarCount] = useState(task_evaluation);
    const [getMessage, setgetMessage] = useState([]);
    const [MsgLoader, setMsgLoader] = useState(false);
    const [loading, setloading] = useState(false);

    var DocumentCount = []

    if (Document && Document != undefined) {
        for (const item of Object.entries(Document)) {
            var docCount = Object.keys(item[1]).length
            var docList = Object.values(item[1])
            for (var i = 0; i < docCount; i++) {
                let obj = {}
                DocumentCount.push(obj)
            }
        }
    }


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getCommentData()
        });
        return unsubscribe;
    }, [props.navigation])

    const getCommentData = async () => {
        setMsgLoader(true)
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setMsgLoader(false)
                    if (res[0].task_comments !== undefined) {
                        setgetMessage(res[0].task_comments)
                    }
                },
                error: (err) => {
                    setMsgLoader(false)
                    setTimeout(() => {
                        Alert.alert(err.message)
                    }, 100)
                },
                complete: () => {
                    setMsgLoader(false)
                },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "task_id": task.item.id,
                "api_key": globals.API_KEY,
            };
            API.getCommentData(data, cb, header);
        } else {
        }
    }
    const addCommentData = async () => {
        if (message) {
            setloading(true)
            let userAuthdetails = await helpers.userAuthdetails();
            const baseUrl = await AsyncStorage.getItem("baseUrl");
            if (baseUrl && baseUrl !== undefined) {
                let cb = {
                    success: async (res) => {
                        toggleModal(false)
                        setloading(false)
                        setTimeout(() => {
                            Alert.alert(
                                'Success',
                                'Message Added Successfully ',
                            );
                        }, 100)
                        setmessage("")
                        getCommentData()
                    },
                    error: (err) => {
                        toggleModal(false)
                        setloading(false)
                        setTimeout(() => {
                            Alert.alert("Error", err.message)
                        }, 100)

                    },
                    complete: () => { },
                };
                let header = helpers.buildHeader();
                let data = {
                    "user_id": userAuthdetails.user_id,
                    "token": userAuthdetails.token,
                    "task_comment": message.trim(),
                    "task_id": task.item.id,
                    "task_type": task.item.task_type,
                    "api_key": globals.API_KEY,
                };
                API.addCommentData(data, cb, header);
            }
            else {
                // getEndPoint()
            }
        }
        else {
            Alert.alert("Message is required")
        }
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
                    props.navigation.navigate('LogIn')
                    setTimeout(() => {
                        Alert.alert("Error", err.message)
                    }, 100);

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

    const saveButtHandler = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert('Success', 'Save Successfully ');
                    }, 100);
                },
                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert("Error", err.message)
                    }, 100);
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            setloading(true)
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_id": task.item.id,
                "task_type": task.item.task_type,
                "task_evaluation": starCount,
                "api_key": globals.API_KEY,
            };

            API.saveEvalutionData(data, cb, header);
        } else {

        }
    }

    const toggleModal = (visible) => {
        setmodalVisible(visible);
    }

    const cancleButtonHandler = () => {
        props.navigation.goBack()
    }

    const saveButtonHandler = () => {
        saveButtHandler()

    }
    const onStarRatingPress = (rating) => {
        setstarCount(rating)
    }

    const openDocument = (doc_uri, doc_title) => {
        let uri = doc_uri;
        if (Platform.OS === 'ios') {
            uri = doc_uri.replace('file://', '');
        }
        let ext = doc_uri.split(".").pop()
        // const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`
        const localFile = `${RNFS.DocumentDirectoryPath}/${doc_title}`
        const options = {
            fromUrl: uri,
            toFile: localFile
        };
        RNFS.downloadFile(options).promise
            .then(() =>
                FileViewer.open(localFile))
            .then(() => {
                console.log("success")
            })
            .catch(error => {
                console.log("error", error)
            });
    }
    const commentRender = (item) => {
        const date = moment(item.item.timestamp).format('YYYY-MM-DD')
        const time = moment(item.item.timestamp).format("HH:mm")
        return (
            <View style={styles.CommentWrapper}>
                <View style={styles.commentRow}>
                    <Text style={styles.authorName}> {item.item.author} </Text >
                    <View style={styles.commentDateWrapper}>
                        <Text style={styles.commentText}> {date}</Text >
                        <FastImage
                            style={styles.clockImage}
                            source={images.clock}
                            resizeMode={"contain"}
                        />
                        <Text style={styles.commentText}> {time}</Text >
                    </View>

                </View>
                <Text style={styles.commentText}> {item.item.task_comment}  </Text >
                <View style={styles.seperator} />
            </View>)
    }
    const _keyExtractor = (item, index) => "tasks" + index.toString();



    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <_Header header={helpers.getLocale(localize, "task", "task")}
                    rightIcon1={images.menu}
                    rightIcon="ellipsis-v"
                    rightcb
                    onPress={() => props.navigation.navigate('ChangePassord')}
                    onPress_signout={() => signout()}
                />
                <View style={styles.headerSeperator} />

                <View style={styles.infoCartContainer}>
                    <InfoCart localize={localize} tasks={task} />
                </View>
                <View style={styles.section2}>
                    <View style={styles.section2Wapper}>
                        <TouchableOpacity onPress={() => setdocExapnd(!docExpand)}>
                            <FastImage
                                style={styles.downArrow}
                                source={images.downArrow}
                                resizeMode={"contain"}
                            />
                        </TouchableOpacity>
                        <Text allowFontScaling={false} style={styles.heading}>
                            {helpers.getLocale(localize, "task", "documents")}</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    {true ? null : <View style={styles.seperator} />}

                    {docExpand && <>
                        {Document ?
                            <View style={styles.documentWrapper}>

                                <FlatList
                                    data={docList}
                                    renderItem={({ item, index }) =>
                                        <TouchableOpacity onPress={() => openDocument(item.file_path, item.title)}>
                                            <Text style={styles.documentListText}>{item.title}</Text>
                                        </TouchableOpacity>
                                    }
                                    keyExtractor={_keyExtractor}
                                    removeClippedSubviews={Platform.OS == "android" ? true : false}
                                />

                            </View> :
                            <Text style={styles.emptyDataText}> {helpers.getLocale(localize, "task", "empty_document")}
                            </Text>
                        }
                    </>

                    }
                </View>

                <View style={styles.section2}>
                    <View style={styles.section2Wapper}>
                        <TouchableOpacity onPress={() =>
                            setmsgExapnd(!msgExpand)
                        }>
                            <FastImage
                                style={styles.downArrow}
                                source={images.downArrow}
                                resizeMode={"contain"}
                            />
                        </TouchableOpacity>
                        <Text allowFontScaling={false} style={[styles.heading]}>{helpers.getLocale(localize, "task", "messages")}</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    {true ? null : <View style={styles.seperator} />}

                    {msgExpand && <>
                        {MsgLoader ?
                            <View>
                                <ActivityIndicator animating={true} color="blue" />
                            </View> :
                            <>
                                {getMessage.length == 0 ?
                                    <Text style={styles.emptyDataText}>
                                        {helpers.getLocale(localize, "task", "empty_message")}
                                    </Text>
                                    :
                                    <View style={{}}>
                                        <FlatList
                                            data={getMessage}
                                            maxToRenderPerBatch={2}
                                            renderItem={commentRender}
                                            keyExtractor={_keyExtractor}
                                            removeClippedSubviews={Platform.OS == "android" ? true : false}
                                        />
                                    </View>
                                }</>
                        }</>}
                    <View style={styles.addMessage}>
                        <View style={{ ...sty.fRow }} >
                            <View style={styles.addMessageTextWrapper}>
                                <TextInput placeholder={helpers.getLocale(localize, "task", "add_message")}
                                    value={message}
                                    onChangeText={value => { setmessage(value) }}
                                    style={{ fontSize: 20 }} placeholderTextColor='black'
                                    multiline={true} />

                                {/* <Text allowFontScaling={false} style={styles.addMessageText}>
                                    {helpers.getLocale(localize, "task", "add_message")}</Text> */}
                            </View>
                            <View style={styles.addMessageIConWrapper}>
                                <TouchableOpacity onPress={() => addCommentData()}>
                                    <FastImage
                                        style={styles.addMessageICon}
                                        source={images.upArrow}
                                        resizeMode={"contain"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={styles.startRateWrapper}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={starCount}
                        fullStarColor={colors.primaryColor}
                        starSize={35}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        starStyle={{ padding: 5 }}
                    />

                </View>

                <View style={[styles.signUpWrapper]}>

                    <View style={styles.signUpView}>
                        <_PairButton
                            btnTxt1={helpers.getLocale(localize, "task", "cancel")}
                            btnTxt2={helpers.getLocale(localize, "task", "save")}
                            txtStyle1={{ color: "red" }}
                            callback1={() => { cancleButtonHandler() }}
                            callback2={() => { saveButtonHandler() }}
                        />
                    </View>
                </View>
            </ScrollView>

            <Modal animationType={"none"} transparent={true}
                visible={modalVisible}
                onRequestClose={() => toggleModal(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalWrapper} >
                        <_InputText
                            style={styles.TextInput}
                            placeholder={helpers.getLocale(localize, "task", "add_message")}
                            onChangeText={value => { setmessage(value) }
                            }
                        />
                        <View style={styles.addMessage}>
                            <TouchableOpacity style={{ ...sty.fRow }} onPress={() => addCommentData()}
                            >
                                <View style={styles.addMessageTextWrapper}>
                                    <Text allowFontScaling={false} style={styles.addMessageText}>{helpers.getLocale(localize, "task", "add_message")}</Text>
                                </View>
                                <View style={styles.addMessageIConWrapper}>
                                    <FastImage
                                        style={styles.addMessageICon}
                                        source={images.upArrow}
                                        resizeMode={"contain"}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View >

    );
};

export default MainHoc(Task)

