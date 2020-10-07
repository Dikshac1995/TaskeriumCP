import { StyleSheet, Platform } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../../Theme";


export default styles = StyleSheet.create({

modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
},
modalWrapper: {
    height:"100%",
    width:"100%",
},
language:{
    fontSize:17,
    fontFamily: fonts.fontFamily.Regular,
},

leftIcon:{
    padding:5,
    paddingHorizontal:10,
},
headerText:{
    fontSize:20,
    paddingLeft:10
},
radioIconStyle:{
    height: 20,
     width: 20,
    borderWidth: 0
},
modalHeading:{
    borderBottomWidth:2,
    borderBottomColor:colors.primaryColor ,
    padding:10,
    flexDirection:'row'
},
modalheadText:{
    fontSize:20,
    fontFamily: fonts.fontFamily.Regular,
},
langOpt:{
    paddingBottom:10,
    display:'flex',
    flexDirection:'row' 
},
langOptWrap:{
    padding:10
},
radioStyle:{
    width: 25,
    height: 25,
     borderColor:colors.primaryColor,
    borderWidth:2, 
},
})