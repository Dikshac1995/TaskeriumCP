import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Input, Item } from "native-base";
import styles from "./Styles";
import { colors, sty } from "../../../Theme"
import FastImage from 'react-native-fast-image'


const _InputText = (props) => {
    const style = props.style || {};
    return (
        <>
            <View style={styles.textInputContainer}>
                <View style={{ borderWidth: 0, width: props.leftIcon ? "80%" : "100%" }}>
                    <TextInput
                        style={[styles.inputText, style]}
                        placeholder={props.placeholder ? props.placeholder : "Text Input"}
                        placeholderTextColor={props.placeholderColor ? props.placeholderColor : colors.placeHolder}
                        value={props.value}
                        onChangeText={props.onChangeText ? (e) => props.onChangeText(e) : null}
                        onBlur={props.onBlur ? props.onBlur : null}
                        maxLength={props.maxLength ? props.maxLength : null}
                        keyboardType={props.keyboardType}
                        defaultValue={props.defaultValue}
                        editable={props.editable}
                        autoCapitalize='none'
                        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : null}
                        ellipsizeMode={props.ellipsizeMode ? props.ellipsizeMode : null}
                        multiline={props.multiline ? props.multiline : null}
                    >
                    </TextInput>


                </View>

                {props.leftIcon ?
                    <View style={styles.leftIconContainer}>
                        <TouchableOpacity
                            style={styles.leftIconWrapper}
                            onPress={() => { props.callback ? props.callback() : null }}>
                            <FastImage
                                style={styles.leftIconStyle}
                                source={props.leftIcon}
                                resizeMode={"contain"}
                            />
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </View>

        </>
    )
}

export default _InputText;