import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Input, Item } from "native-base";
import styles from "./Styles";
import { colors, sty } from "../../../Theme"

const _Button = (props) => {
    const style = props.style || {};
    const textStyle = props.textStyle || {}
    return (
        <View style={{ width: "100%", }}>
            <TouchableOpacity style={{}} onPress={() => { props.callback ? props.callback() : null }}>
                <View style={[styles.btnWrap, , style,]}>
                    <Text allowFontScaling={false} style={[styles.btnTextStyle, props.btnTxtStyle,]}>{props.btnTxt ? props.btnTxt : "Button"}</Text>
                    {/* <View style={{ height: 20, width: 30, backgroundColor: "red" }} /> */}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default _Button;