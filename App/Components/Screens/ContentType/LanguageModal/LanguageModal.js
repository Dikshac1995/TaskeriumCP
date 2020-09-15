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
    StyleSheet,Modal,
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, ListItem, Radio, Right, Left } from 'native-base';
import { setTranslation } from "../../../../Redux/Actions/LocalizeAction"
import {
    colors,
    fonts,
    sty,images
} from "../../../../Theme";
import styles from './Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import FastImage from 'react-native-fast-image'
import { globals, helpers, validators, API, } from '../../../../Config';

   const LanguageModal=(props)=>{
    const localize = useSelector(state => state.localize);
    const dispatch = useDispatch();
    const [modalVisible, setmodalVisible] = useState()
    const [check,setCheck]= useState(props.language)
    const  languagesArr= [
        { key: 'en', label: 'english', value:helpers.getLocale(localize, "language", "English")},
        { key: 'he', label: 'language.german', value: helpers.getLocale(localize, "language", "German")},
    ]



    const selectLanguage = (value)=>{
        setCheck(value)
        if (value === 'en'){
            dispatch(setTranslation("en"))
        }
        else
        {
            dispatch(setTranslation("he"))
        }
            // return  props.close(false)
    }
    
 
    const _keyExtractor = (item, index) =>  index.toString();
       
       return(
        <View style={styles.modalBackground}>
            <View style={styles.modalWrapper} >
                <View style={ styles.modalHeading}>
                    <View style={styles.leftIcon}>
                        <Icon name="chevron-left" size={20} color={colors.primaryColor} onPress={()=>props.close(false)}/>
                    </View>
                    <Text style={styles.headerText}>{helpers.getLocale(localize, "language", "Language")}</Text>
                </View>
                <FlatList
                    data={languagesArr}
                    renderItem={({ item, index }) =>
                    <Content>
                        <ListItem selected={false} >
                            <Left>
                                <Text style={styles.language}>{item.value}</Text>
                            </Left>
                            <Right>
                            <TouchableOpacity onPress={()=>selectLanguage(item.key)}>
                                <FastImage
                                style={styles.radioIconStyle}
                                source={check===item.key ? images.radioCheck : images.radioUncheck}
                                resizeMode={"contain"}
                                        />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    </Content>
                    }
                    removeClippedSubviews={Platform.OS == "android" ? true : false}
                    keyExtractor={_keyExtractor}
                        />
            {/* <View style={styles.modalHeading}>
                <Text style={styles.modalheadText}>Choose Language</Text>
            </View>  */}
            {/* <View style={styles.langOptWrap}>
                <TouchableOpacity style={styles.langOpt}  
                // onPress={()=>selectLanguage('en')}
                >
                    <Radio
                        color={colors.primaryColor} selectedColor={colors.primaryColor}
                        selected={check== 'en'} 
                        // style={{
                        //     width: 25,
                        //     height: 25,
                        //     borderColor:colors.primaryColor,
                        //     borderWidth:2,

                        //   }}
                        onPress={()=>selectLanguage('en')}
                    />
                    <Text style={{fontSize:15}}> English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langOpt} 
                 >
                    <Radio
                        color={colors.primaryColor} selectedColor={colors.primaryColor}
                        onPress={()=>selectLanguage('he')} 
                        // selected={true}
                        // style={{
                        //     width: 25,
                        //     height: 25,
                        //     borderColor:colors.primaryColor,
                        //     borderWidth:2,

                        //   }}
                        selected={check== 'he'}
                />
                    <Text style={{fontSize:15}}>Other Language</Text>
                </TouchableOpacity>
            </View> */}
        </View> 
    </View>


       )



 }
 export default LanguageModal;