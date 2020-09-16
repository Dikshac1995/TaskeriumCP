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
    StyleSheet, Modal,
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, ListItem, Radio, Right, Left } from 'native-base';
import { setTranslation } from "../../../../Redux/Actions/LocalizeAction"
import {
    colors,
    fonts,
    sty, images
} from "../../../../Theme";
import styles from './Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import FastImage from 'react-native-fast-image'
import { globals, helpers, validators, API, } from '../../../../Config';
import AsyncStorage from '@react-native-community/async-storage';

const LanguageModal = (props) => {
    const localize = useSelector(state => state.localize);
    const dispatch = useDispatch();
    const [modalVisible, setmodalVisible] = useState()
    const [check, setCheck] = useState(props.language)
    const languagesArr = [
        { key: 'en', label: 'english', value: helpers.getLocale(localize, "language", "English") },
        { key: 'he', label: 'language.german', value: helpers.getLocale(localize, "language", "Lithuanian") },
    ]



    const selectLanguage = async (value) => {
        setCheck(value)
        if (value === 'en') {
            dispatch(setTranslation("en"))
            await AsyncStorage.setItem('AppLang', "en");
        }
        else {
            dispatch(setTranslation("he"))
            await AsyncStorage.setItem('AppLang', "he");

        }

    }


    const _keyExtractor = (item, index) => index.toString();

    return (
        <View style={styles.modalBackground}>
            <View style={styles.modalWrapper} >
                <View style={styles.modalHeading}>
                    <TouchableOpacity style={styles.leftIcon} onPress={() => props.close(false)}>
                        <Icon name="chevron-left" size={20} color={colors.primaryColor} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{helpers.getLocale(localize, "language", "Language")}</Text>
                </View>
                <View >
                    <FlatList
                        data={languagesArr}
                        renderItem={({ item, index }) =>

                            <Content>
                                <ListItem selected={false}
                                    onPress={() => selectLanguage(item.key)} >
                                    <Left>
                                        <Text style={styles.language}>{item.value}</Text>
                                    </Left>
                                    <Right>
                                        <FastImage
                                            style={styles.radioIconStyle}
                                            source={check === item.key ? images.radioCheck : images.radioUncheck}
                                            resizeMode={"contain"}
                                        />
                                    </Right>
                                </ListItem>

                            </Content>

                        }
                        removeClippedSubviews={Platform.OS == "android" ? true : false}
                        keyExtractor={_keyExtractor}
                    />
                </View>
                
            </View>
        </View>


    )



}
export default LanguageModal;