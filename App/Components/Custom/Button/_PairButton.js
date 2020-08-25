import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Input, Item } from "native-base";
import styles from "./Styles";
import { colors, sty } from "../../../Theme"
import FastImage from 'react-native-fast-image'

const _PairButton = (props) => {
    const style = props.style || {};
    const textStyle = props.textStyle || {}
    return (
        <View style={{ width: "100%" }}>
            <View style={[styles.btnWrap, , style]}>
                <View style={[styles.pairButtonStyle]}>
                    <TouchableOpacity style={{ ...sty.fRow }} onPress={() => { props.callback1 ? props.callback1() : null }}>
                        {props.icon1 ?
                            <FastImage
                                style={[{ height: 30, width: 30, marginRight: 5 }, props.icon1Style]}
                                source={props.icon1}
                                resizeMode={"contain"}
                            />
                            : null}
                        {props.btnTxt1 ?
                            <Text allowFontScaling={false} style={[styles.pairBtnTextStyle, props.txtStyle1]}>{props.btnTxt1 ? props.btnTxt1 : "Button1"}</Text>
                            : null}
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
                <View style={[styles.pairButtonStyle]}>
                    <TouchableOpacity style={{ ...sty.fRow }} onPress={() => { props.callback2 ? props.callback2() : null }}>
                        {props.icon2 ?
                            <FastImage
                                style={[{ height: 30, width: 30, marginRight: 5 }, props.icon2Style]}
                                source={props.icon2}
                                resizeMode={"contain"}
                            />
                            : null}
                        {props.btnTxt2 ?
                            <Text allowFontScaling={false} style={[styles.pairBtnTextStyle, props.txtStyle2]}>{props.btnTxt2 ? props.btnTxt2 : "Button2"}</Text>
                            : null}
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

export default _PairButton;