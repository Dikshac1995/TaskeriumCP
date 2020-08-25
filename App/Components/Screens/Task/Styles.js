import { StyleSheet } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';

export default styles = StyleSheet.create({

    container: {
        // backgroundColor: "#fff",
        // ...sty.flex1
        marginHorizontal: 15
    },
    TextInput: {
        marginTop: 35,
        fontFamily: fonts.fontFamily.Regular
    },
    signUpWrapper: {
        flex: 1,
        borderWidth: 0,
        paddingBottom: 20,
        ...sty.jEnd,
        ...sty.aCenter,
    },
    signUpView: {
        borderWidth: 0,
        marginTop: 20,
        width: "100%"
    },
    signUp: {
        ...sty.fRow,
        paddingTop: 0,
        paddingLeft: 0,
        borderWidth: 0,
        width: "60%",
        ...sty.aCenter,
        borderWidth: 0
    },
    signUpText: {
        fontSize: 20,
        color: colors.text,
        fontWeight: "bold",
        fontFamily: fonts.fontFamily.Regular

    },
    starImgStyle: {
        height: 35,
        width: 35,
        marginHorizontal: 5
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    infoCartWrapper: {
        borderBottomWidth: 1.5,
        borderColor: colors.border
    },
    emptyDataText: {
        textAlign: 'center',
        // paddingVertical: 30,
        fontSize: 20,
        fontFamily: "MyriadPro-Regular"

    },
    tasksListWrapper: {
        paddingTop: 2, height: '60%'
    },
    CommentWrapper: {
        paddingHorizontal: 10
    },
    commentRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    authorName: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: "MyriadPro-Regular"
    },
    commentDateWrapper: {
        flexDirection: 'row', display: 'flex',
    },
    commentText: {
        fontSize: 20, fontFamily: "MyriadPro-Regular",
    },
    clockImage: {
        height: 20,
        width: 20,
        paddingLeft: 1,
        marginTop: 5,
        marginLeft: 5
    },
    modalWrapper: {
        backgroundColor: '#FFFFFF',
        height: 200,
        width: "80%",
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    addMessage: {
        marginTop: 20, borderWidth: 2, borderColor: "#969696"
    },
    addMessageTextWrapper: {
        width: "85%", ...sty.jCenter, padding: 5, paddingLeft: 40
    },
    addMessageText: {
        fontSize: 25, borderWidth: 0,
        fontFamily: "MyriadPro-Regular"
    },
    addMessageIConWrapper: {
        width: "15%", ...sty.jCenter, ...sty.aCenter
    },

    addMessageICon: {
        height: 20, width: 20, paddingLeft: 0
    },

    section2Wapper: {
        ...sty.fRow, paddingLeft: 10,
    },
    downArrow: {
        height: 20, width: 20, paddingLeft: 0, marginTop: 7
    },
    heading: {
        fontSize: 25, fontFamily: "MyriadPro-Regular", paddingLeft: 10, textAlign: "center",
    },
    documentListText: {
        fontSize: 18, fontFamily: "MyriadPro-Regular"
    },
    startRateWrapper: {
        ...sty.fRow, ...sty.aCenter, ...sty.jCenter, paddingBottom: 10, paddingTop: 10,
        marginTop: 20
    },
    horizontalLine: {
        marginTop: 1, height: 1.5, backgroundColor: colors.primaryColor
    }
});
