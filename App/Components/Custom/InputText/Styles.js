import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  sty,
} from "../../../Theme";

export default styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    ...sty.flex1,
  },
  textInputContainer:{
    borderBottomWidth: 1.5, borderBottomColor: "#1C7DED", paddingLeft: 10, ...sty.fRow
  },
 
  inputText: {
    fontSize: 20,
    fontFamily: fonts.fontFamily.Regular,
  },
  leftIconContainer:{
    width: "20%", flex: 1 
  },
  leftIconWrapper:{
    flex: 1, ...sty.aCenter, ...sty.jEnd, paddingBottom: 5 

  },
  leftIconStyle:{
    height: 30, width: 30, paddingLeft: 0 
  },


});
