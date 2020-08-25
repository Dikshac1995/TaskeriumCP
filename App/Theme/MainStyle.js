import { StyleSheet } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "./";

const mainStyles = StyleSheet.create({
    appLayout: {
        flex: 1,
        backgroundColor: colors.appBg      // App background color
    },
    innerLayout: {
        flex: 1,
        backgroundColor: '#fff',
        ...sty.appBorder,
        overflow: 'hidden',
        marginBottom: 10,
        padding: 10
    },
    rootView: {
        flex: 1,
    },
    roundBox: {
        backgroundColor: '#fff',
        ...sty.appBorder,
        ...sty.flex1,
        //  paddingTop:3,
        ...sty.mgB10,
        overflow: 'hidden'
    },
    rootViewLight: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    rootViewDark: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    rootViewDarker: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    // tabWrap: {
    //     borderRadius: 10,
    //     marginBottom: 5,
    //     backgroundColor: '#fff',
    //     padding: 5,
    //     overflow: 'hidden',
    //     marginTop: 5
    // },
    // tabItem: {
    //     backgroundColor: '#fff',
    //     borderColor : 'black',
    //     borderWidth : 0.7,
    //     paddingVertical : 4,
    //     borderRadius: 10,
    //     overflow: 'hidden',
    //     paddingHorizontal: 8,
    //     ...sty.aCenter
    // },
    tabWrap: {
        paddingVertical: 8,
        borderBottomColor: colors.black,
    },
    tabItem: {
        ...sty.aCenter
    },
    closeBtn: {
        position: 'absolute',
        top: 5,
        left: 5,
        padding: 10,
        zIndex: 10
    },
    avRegular: {
        fontFamily: 'AvenirNext-Regular'
    },
    avDemi: {
        fontFamily: 'AvenirNext-Medium'
    },
    avBold: {
        fontFamily: 'AvenirNext-DemiBold'
    },
    headingTxtWrap: {
        ...sty.padB10,
        ...sty.padT20,
    },
    headingTxt: {
        fontSize: fonts.small,
        color: colors.heading1,
        fontFamily: 'Helvetica'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colors.appBg
    },
    appLayout: {
        flex: 1,
        backgroundColor: colors.appBg      // App background color
    },
    innerLayout: {
        flex: 1,
        backgroundColor: '#fff',
        ...sty.appBorder,
        overflow: 'hidden',
        marginBottom: 10,
        padding: 10
    },
    rootView: {
        flex: 1,
    },
    roundBox: {
        backgroundColor: '#fff',
        ...sty.appBorder,
        ...sty.flex1,
        //  paddingTop:3,
        // ...sty.mgB10,
        overflow: 'hidden',
    },
    rootViewLight: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    rootViewDark: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    rootViewDarker: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    // tabWrap: {
    //     borderRadius: 10,
    //     marginBottom: 5,
    //     backgroundColor: '#fff',
    //     padding: 5,
    //     overflow: 'hidden',
    //     marginTop: 5
    // },
    // tabItem: {
    //     backgroundColor: '#fff',
    //     borderColor : 'black',
    //     borderWidth : 0.7,
    //     paddingVertical : 4,
    //     borderRadius: 10,
    //     overflow: 'hidden',
    //     paddingHorizontal: 8,
    //     ...sty.aCenter
    // },
    tabWrap: {
        paddingVertical: 10,
        borderBottomColor: colors.black
    },
    tabItem: {
        ...sty.aCenter,
    },
    closeBtn: {
        position: 'absolute',
        top: 5,
        left: 5,
        padding: 10,
        zIndex: 10
    },
    avRegular: {
        fontFamily: 'AvenirNext-Regular'
    },
    avDemi: {
        fontFamily: 'AvenirNext-Medium'
    },
    avBold: {
        fontFamily: 'AvenirNext-DemiBold'
    },
    headingTxtWrap: {
        ...sty.padB10,
        ...sty.padT20,
    },
    headingTxt: {
        fontSize: fonts.small,
        color: colors.heading1,
        fontFamily: 'Helvetica'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colors.appBg
    },

    //App Theme
    headTxt: { color: colors.heading1, fontFamily: "Helvetica", }, // fontSize: 12
    boldHeadTxt: {
        color: colors.heading1,
        fontFamily: "Helvetica", //"Helvetica-Bold",
        fontWeight: "bold",
        // fontSize: 12
    },
    lightHeadTxt: {
        color: colors.heading1,
        fontFamily: "Helvetica-light",
        fontWeight: "300"
    },
    head2Txt: { color: colors.heading2, fontFamily: "Helvetica", }, // fontSize: 12 , 
    head3Txt: {
        color: colors.heading3,
        fontFamily: "Helvetica-light",
        fontWeight: "300"
    },
    appTxt: { color: colors.text, fontFamily: "Helvetica", }, // fontSize: 12
    appTxtBold: { color: colors.text, fontFamily: "Helvetica-Bold" },
    appTxtLight: {
        color: colors.text,
        fontFamily: "Helvetica-light",
        fontWeight: "300",
        // fontSize: 12
    },

    //Theme white
    appTxtWhite: { color: "#fff", fontFamily: "Helvetica" },
    appTxtBoldWhite: { color: "#fff", fontFamily: "Helvetica-Bold" },
    appTxtLightWhite: {
        color: "#fff",
        fontFamily: "Helvetica-light",
        fontWeight: "300"
    }
});
export default mainStyles;
