import { StyleSheet, Platform } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";

export default styles = StyleSheet.create({
    btnWrap: {
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        ...sty.aCenter,
        ...sty.jCenter,
        borderBottomColor: colors.buttonBorder,
        borderTopColor: colors.buttonBorder,
        paddingVertical: 7.5,
        ...sty.fRow,
        // paddingTop: Platform.OS === 'ios' ? 2 : 0
    },
    inputText: {
        fontSize: 20,
        fontFamily: fonts.fontFamily.Regular

    },
    line: {
        width: 2,
        height: "100%",
        backgroundColor: colors.buttonBorder
    },
    btnTextStyle: {
        fontSize: 29,
        color: "#1C7DED",
        fontFamily: fonts.fontFamily.Regular,
        paddingTop: Platform.OS === 'ios' ? 7 : 0
    },
    pairButtonStyle: {
        width: "50%",
        ...sty.aCenter,
        ...sty.jCenter
    },
    pairBtnTextStyle: {
        fontSize: 25,
        color: "#1C7DED",
        fontFamily: fonts.fontFamily.Regular,
        paddingTop: Platform.OS === 'ios' ? 7 : 0,
        borderWidth: 0,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'

    }
});
