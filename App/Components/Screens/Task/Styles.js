import { StyleSheet ,Platform} from "react-native";
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
    TextInput: {
        marginTop: 10,
        fontFamily: fonts.fontFamily.Regular,
    },
    signUpWrapper1: {
        flex: 0.1,
        borderWidth: 0,
         paddingBottom: 20,
        ...sty.jEnd,
        ...sty.aCenter,
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
        width: "100%",
        // ...sty.jEnd,
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
        paddingLeft:12,
        // textAlign: 'center',
        // paddingVertical: 30,
        fontSize: 20,
        fontFamily: fonts.fontFamily.Regular,
        // color:'#A9A9A9'
        color:'#808080'

    },
    tasksListWrapper: {
        paddingVertical: 5,
        flex:6
        // height:'60%'
    },
    CommentWrapper: {
        paddingHorizontal: 10,
        marginLeft:5
       
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
        fontFamily: fonts.fontFamily.Regular
    },
    commentDateWrapper: {
        flexDirection: 'row', 
        display: 'flex',
    },
    commentText: {
        fontSize: 20, 
        fontFamily: fonts.fontFamily.Regular,
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
        height: 150,
        width: "60%",
        borderRadius: 10,
        display: 'flex',
        padding: 10
    },
    addMessage: {
        marginTop: 20, 
        borderWidth: 1, 
        borderColor: "#969696",
        borderRadius:10,
      
    },
    addMessageTextWrapper: {
        width: "85%", 
        ...sty.jCenter, 
        paddingLeft: 10,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    
    },
    addMessageText: {
        fontSize: 25, 
        borderWidth: 0,
        fontFamily: fonts.fontFamily.Regular,
        paddingTop: Platform.OS === 'ios' ? 5 : 0,
    },
    addMessageIConWrapper: {
        width: "15%", 
        ...sty.jCenter, 
        ...sty.aCenter,
     backgroundColor:"#DCDCDC",
    opacity:0.7,
    borderLeftWidth:1,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    borderColor: "#969696",
    },
    addMessageICon: {
        height: 20, 
        width: 20, 
        paddingLeft: 0,
    },
    section2:{
        marginTop:10
    },
    section2Wapper: {
        ...sty.fRow, 
        paddingLeft: 10,
    },
    downArrow: {
        height: 20, 
        width: 20, 
        paddingLeft: 0, 
        marginTop: Platform.OS === 'ios' ? 0 : 5,
    },
    downArrow2: {
        height: 20, 
        width: 20, 
        paddingLeft: 0, 
        marginTop: Platform.OS === 'ios' ? 0 : 5,
        transform: [{ rotate: '270deg' }]
    },
    heading: {
        fontSize: 25, 
        fontFamily: fonts.fontFamily.Regular,
        paddingLeft: 10, 
        textAlign: "center",
    },
    documentListText: {
        fontSize: 20, 
        fontFamily: fonts.fontFamily.Regular
    },
    startRateWrapper: {
        ...sty.fRow,
        ...sty.aCenter,
        ...sty.jCenter,
        paddingVertical:10
        // paddingBottom: 10, 
        // paddingTop: 10,
        // marginTop: 20
    },
    horizontalLine: {
        marginTop: 1,
        height: 1.5,
        backgroundColor: colors.primaryColor
    },
    seperator:{
        marginTop: 10,
        height: 1.5,
        backgroundColor: colors.primaryColor 
    },
    headerSeperator:{
        marginTop: 20,
        height: 1.5,
        backgroundColor: colors.primaryColor 
    },
    infoCartContainer:{
        paddingTop: 10 
    },
    documentWrapper:{
        paddingLeft: 10 ,
        marginLeft:8,
    },
    scrollView:{
        flex:1
    },
    modalHeading:{
        borderBottomWidth:2,
        borderBottomColor:colors.primaryColor ,
        alignItems:'center',padding:10
    },
    modalheadText:{
        fontSize:20
    },
    langOpt:{
        paddingBottom:10,
        display:'flex',
        flexDirection:'row' 
    },
    langOptWrap:{
        padding:10
    },
    msgText:{
        fontSize:20,
        fontFamily: fonts.fontFamily.Regular,
       
        // height:40
    }

});
