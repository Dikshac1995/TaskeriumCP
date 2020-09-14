import { StyleSheet ,Dimensions} from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";

 export const styles = StyleSheet.create({
    container: {
        flex:1,
        display: "flex",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,

    },
    map: {
        flex: 1,
    },
windowClosedIcon:{
        alignItems: 'flex-end', paddingRight: 20, paddingTop: 30 
    },
    footer:{
        flex:0.15,paddingBottom:10
    },
    signUpWrapper: {
        flex: 1,
        borderWidth: 0,
        //  paddingVertical:20,
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
    

});