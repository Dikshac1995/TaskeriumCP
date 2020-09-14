import { StyleSheet, Platform } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';

export default styles = StyleSheet.create({

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
    // alignItems: 'center',
    padding: 10
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
    paddingBottom:10,display:'flex',flexDirection:'row' 
},
langOptWrap:{
    padding:10
}
})