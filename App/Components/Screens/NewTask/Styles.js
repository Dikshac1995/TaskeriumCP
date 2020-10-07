import { StyleSheet, Platform } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';

export default styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    },
    formWrap:{
        flex:5,
    },
    TextInput: {
        marginTop: Platform.OS === 'ios' ? 40 : 10,
        fontFamily: fonts.fontFamily.Regular,
    },
    TextInput1: {
        marginTop: Platform.OS === 'ios' ? 40 : 10,
        fontFamily: fonts.fontFamily.Regular,
    },
    signUpWrapper: {
        flex:1,
        paddingBottom: 20,
        ...sty.jEnd,
        ...sty.aCenter,
    },
    signUpView: {
        borderWidth: 0,
        width: "100%",
    },
    signUp: {
        ...sty.fRow,
        paddingTop: 0,
        paddingLeft: 0,
        borderWidth: 0,
        width: "60%",
        ...sty.aCenter,
        borderWidth: 0,
    },
    signUpText: {
        fontSize: 20,
        color: colors.text,
        fontWeight: "bold",
        fontFamily: fonts.fontFamily.Regular
    },
    uploadDoc:{
        flex:4,
    },
    uploadDocWrapper: {
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    text: {
        color: colors.text,
        fontSize: 20,
        fontFamily: fonts.fontFamily.Regular
    },
    pairButton: {
        borderTopWidth: 0,
        paddingVertical: 2
    },
    pairButtonIcon: {
        height: 35, width: 35
    },
    
    footer:{
        flex:1
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    modalWrapper: {
        backgroundColor: '#FFFFFF',
        height: 150,
        width: "60%",
        borderRadius: 10,
        display: 'flex',
        padding: 10
    },
    modalHeading:{
        borderBottomWidth:2,
        borderBottomColor:colors.primaryColor ,
        alignItems:'center',padding:10
    },
    modalheadText:{
        fontSize:20,
        fontFamily: fonts.fontFamily.Regular
    },
    langOpt:{
        paddingBottom:10,display:'flex',flexDirection:'row' 
    },
    langOptWrap:{
        padding:10
    }


});
