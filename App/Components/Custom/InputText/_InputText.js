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
            <View style={{ borderBottomWidth: 1.5, borderBottomColor: "#1C7DED", paddingLeft: 10, ...sty.fRow }}>
                <View style={{ borderWidth: 0, width: props.leftIcon ? "80%" : "100%" }}>
                    <TextInput
                        style={[styles.inputText, style]}
                        placeholder={props.placeholder ? props.placeholder : "Text Input"}
                        placeholderTextColor={props.placeholderColor ? props.placeholderColor : colors.placeHolder}
                        // secureTextEntry={props.secureTextEntry ? props.secureTextEntry : null}
                        //onBlur={() => { this.props.onBlur() }}
                        value={props.value}
                        // adjustsFontSizeToFit
                        //  autoFocus={true} selection={{start:0, end:0}}
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
                    <View style={{ width: "20%", flex: 1 }}>
                        <TouchableOpacity
                            style={{ flex: 1, ...sty.aCenter, ...sty.jEnd, paddingBottom: 5 }}
                            onPress={() => { props.callback ? props.callback() : null }}>
                            <FastImage
                                style={{ height: 30, width: 30, paddingLeft: 0 }}
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