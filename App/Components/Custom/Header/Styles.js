import { StyleSheet } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import { color } from "react-native-reanimated";

export default styles = StyleSheet.create({
    container: {
        // backgroundColor: "#fff",
        // ...sty.flex1,
        paddingTop: 20 ,
    },
    headerWrap:{
        ...sty.fRow, 
    },
    headerLeft:{
      flex:1
    },
    rightIconWrap:{
        flex: 1, 
        ...sty.aEnd
    },

    rightIconStyle:{
        height: 35, 
        width: 40, 
        paddingLeft: 0, 
        color: 'black' 
    },
    inputText: {
        fontSize: 20,
        fontFamily: fonts.fontFamily.Regular

    },
    headingTextWrap:{
        flex: 8, 
        ...sty.aCenter, 
        ...sty.jCenter,
         borderWidth: 0 
    },
    headingText: {
        fontSize: 30,
        color: colors.text,
        fontWeight: "400",
        fontFamily: fonts.fontFamily.Regular

    },
    



});
