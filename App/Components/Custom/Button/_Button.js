import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from "./Styles";


const _Button = (props) => {
    const style = props.style || {};
    const textStyle = props.textStyle || {}
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity style={{}} onPress={() => { props.callback ? props.callback() : null }}>
                <View style={[styles.btnWrap, style,]}>
                    <Text allowFontScaling={false} style={[styles.btnTextStyle, props.btnTxtStyle,]}>{props.btnTxt ? props.btnTxt : "Button"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default _Button;