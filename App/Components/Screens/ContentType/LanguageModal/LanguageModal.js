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
    StyleSheet,Modal
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, ListItem, Radio, Right, Left } from 'native-base';
import { setTranslation } from "../../../../Redux/Actions/LocalizeAction"
import {
    colors,
    fonts,
    sty,
} from "../../../../Theme";

   const LanguageModal=(props)=>{
    const localize = useSelector(state => state.localize);
    const dispatch = useDispatch();
    const [modalVisible, setmodalVisible] = useState()
    const [check,setCheck]= useState(props.language);



    const selectLanguage = (value)=>{
        setCheck(value)
        if (value === 'en'){
            dispatch(setTranslation("en"))
        }
        else
        {
            dispatch(setTranslation("he"))
        }
            return  props.close(false)
    }
       
       return(
        <View style={styles.modalBackground}>
        <View style={styles.modalWrapper} >
            <View style={styles.modalHeading}>
                <Text style={styles.modalheadText}>Choose Language</Text>
            </View> 
            <View style={styles.langOptWrap}>
                <View style={styles.langOpt}>
                    <Radio
                        color={colors.primaryColor} selectedColor={colors.primaryColor}
                        selected={check== 'en'} onPress={()=>selectLanguage('en')}
                    />
                    <Text> English</Text>
                </View>
                <View style={styles.langOpt}>
                    <Radio
                        color={colors.primaryColor} selectedColor={colors.primaryColor}
                        onPress={()=>selectLanguage('he')} selected={check== 'he'}
                />
                    <Text>Other Language</Text>
                </View>
            </View>
        </View>
    </View>


       )



 }
 export default LanguageModal;