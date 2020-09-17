import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet, Alert,Modal
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { globals, helpers, validators, API, } from '../../../Config';
import { mainStyle, images, sty, colors } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import AsyncStorage from '@react-native-community/async-storage';
import InfoCart from '../ContentType/InfoCart/InfoCart';
import { setTasks } from "../../../Redux/Actions/TaskAction"
import { large } from '../../../Theme/FontSizes';
import Loader from '../../Custom/Loader/Loader'
import { StackActions, CommonActions } from "@react-navigation/native";
import { setTranslation } from "../../../Redux/Actions/LocalizeAction"
import { Container, Header, Content, ListItem, Radio, Right, Left } from 'native-base';
import { color } from 'react-native-reanimated';
import Language from '../ContentType/LanguageModal/LanguageModal'


const Tasks = (props) => {
    const localize = useSelector(state => state.localize);
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const [task, settask] = useState([]);
    const [arrayholder, setarrayHolder] = useState([]);
    const [loading, setloading] = useState(false)
    const [TaskLoader, setTaskLoader] = useState(true)
    const [search, setsearch] = useState(false)
    const [modalVisible, setmodalVisible] = useState(false)
    const [check,setCheck]= useState(false);

    const signoutHandler = () => {
        signout()
    }
    const toggleModal = (visible) => {
        setmodalVisible(visible);
    }

    const changeLang = () => {
        if (localize.activeLanguage === "en")
        {
              setCheck("en")
        }
        else{
               setCheck("he")
        }

        toggleModal(true)
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
                    if (err.type === 'AUTHORIZATION' || err.message === 'Not logged in / Wrong password or username / Token expired') {
                        helpers.authError(err,props)
                    }
                     else{
                    setTimeout(() => {
                        Alert.alert(err.message)
                    }, 100)
                    }
                   
                },
                complete: () => {
                    setloading(false)
                },
            };
            setloading(true)
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.signOut(data, cb, header);
        } else {
            props.navigation.navigate('LogIn')
        }

    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getTasks();
        });
        return unsubscribe;
    }, [props.navigation])


    const getTasks = async () => {
        let cb = {
            success: async (res) => {
                dispatch(setTasks({ res }))
                setTaskLoader(false)
                const TaskList = res[0].tasks
                TaskList.sort(function (a, b) {
                    return (b.id - a.id)

                })
                settask(TaskList)
                setarrayHolder(res[0].tasks)
            },
            error: (err) => {
                setTaskLoader(false)
                if (err.type === 'AUTHORIZATION' || err.message === 'Not logged in / Wrong password or username / Token expired') {
                    helpers.authError(helpers.getLocale(localize, "popup", "Error"),err,props)
                }
                else {
                    setTimeout(() => {
                        Alert.alert(helpers.getLocale(localize, "popup", "Error"),err.message)
                    }, 100)
                }
            },

            complete: () => { },
        };

        let header = helpers.buildHeader({});
        let userAuthdetails = await helpers.userAuthdetails();
        let data = {
            "user_id": userAuthdetails.user_id,
            "token": userAuthdetails.token,
            "portal_user": userAuthdetails.portal_user,
            "api_key": globals.API_KEY
        };
        API.getAllTasks(data, cb, header);
    }
    const taskRender = (a) => {
        return (
            <View style={styles.infoCartWrapper}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Task', { task: a })}>
                    <InfoCart localize={localize} tasks={a} />
                </TouchableOpacity>
            </View >
        )
    }
    const searchFilterFunction = text => {

        if (text !== "") {
            var pattern = RegExp(text, "gi")
            const newData = arrayholder.filter(function (item) {
                for (var key in item) {
                    if (key === "documents") {
                        let fileFound = false
                        item[key].forEach((docitem) => {
                            for (const prop in docitem) {
                                if (docitem[prop].title.toLowerCase().indexOf(text.toLowerCase()) != -1) {
                                    fileFound = true
                                    return true
                                }
                            }
                        })
                        if (fileFound) {
                            return true
                        }
                    } else {
                        if (item[key].toString().toLowerCase().indexOf(text.toLowerCase()) != -1) {
                            return true
                        }
                    }
                }
                return false
            });
            settask(newData)
        }
        else {
            settask(arrayholder.sort(function (a, b) {
                return (b.id - a.id)

            }))
        }
    }

    const _keyExtractor = (item, index) => "tasks" + index.toString();
    return (
        <>
            {
                <View style={[mainStyle.rootView, styles.container]}>
                    <Loader
                        loading={loading} />

                    <_Header header={helpers.getLocale(localize, "tasks", "tasks")}
                        rightIcon1={images.menu}
                        rightcb
                        rightIcon="ellipsis-v"
                        onPress={() => props.navigation.navigate('ChangePassord')}
                        onPress_signout={() => signoutHandler()}
                        onPress_changeLang={() => changeLang()}
                    />
                    <View>
                        <_InputText
                            style={styles.TextInput}
                            placeholder={helpers.getLocale(localize, "tasks", "search")}
                            onChangeText={value => {
                                setsearch(value)
                                searchFilterFunction(value)
                            }
                            }
                        />

                    </View>
                    <View style={styles.tasksListWrapper}>
                        {TaskLoader ?
                            <ActivityIndicator color="blue" />
                            :
                            <>
                                {task.length === 0 &&
                                    <Text style={styles.emptyDataText}> {helpers.getLocale(localize, "tasks", "empty_task")}</Text>}
                                <FlatList
                                    data={task}
                                    renderItem={taskRender}
                                    keyExtractor={_keyExtractor}
                                    removeClippedSubviews={Platform.OS == "android" ? true : false}
                                    scrollToIndex={1}
                                /></>}

                    </View>
                    <View style={[styles.signUpWrapper,
                    { borderWidth: 0 }
                    ]}>
                        <View style={styles.signUpView}>
                            <_Button
                                btnTxt={helpers.getLocale(localize, "tasks", "add_task")}
                                callback={() => props.navigation.navigate('NewTask')} />
                        </View>
                    </View>
                    
                    <Modal animationType={"none"} transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => toggleModal(false)}>
                    <Language language={check} close={(value)=>{toggleModal(value)}}/>
            </Modal>
         </View >}
        </>

    );
};

export default MainHoc(Tasks)

