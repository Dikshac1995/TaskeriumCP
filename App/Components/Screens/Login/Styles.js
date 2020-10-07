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
  logoWrap: {
    height: WINDOW_HEIGHT * .08,
    ...sty.aCenter,
    borderWidth: 0,
    marginTop: WINDOW_HEIGHT * .03
  },
  logo: {
    height: WINDOW_HEIGHT * .08,
    width: "75%",
    borderWidth: 0
  },
  headingWarp: {
    height: WINDOW_HEIGHT * .09,
    ...sty.aCenter,
    borderWidth: 0,
    marginTop: WINDOW_HEIGHT * .02
  },
  headingText: {
    fontSize: fonts.heading,
    color: colors.heading1,
    fontFamily: fonts.fontFamily.Regular
  },
  TextInput: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontFamily: fonts.fontFamily.Regular,

  },
  checkboxWrapper: {
    borderWidth: 0,
    marginTop: 20
  },
  checkBoxView: {
    ...sty.fRow,
    paddingTop: 0,
    paddingLeft: 10,
    borderWidth: 0,
    width: "60%",
    ...sty.aCenter
  },
  checkBoxlogoWrap:{
    ...sty.fRow,
     paddingTop: 0, 
     paddingLeft: 10,
      borderWidth: 0, 
      width: "60%", 
      ...sty.aCenter
  },
  checkBoxlogo: {
    height: 20,
    width: 20,
    borderWidth: 0
  },
  rememberMeText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    borderWidth: 0,
    fontFamily: fonts.fontFamily.Regular

  },
  buttonWrap: {
      paddingTop: 60
  },
  button: {
   
  },
  forgetPassView: {
    borderWidth: 0,
    paddingVertical:10,
  },
  forgetPass: {
    ...sty.fRow,
    paddingTop: 0,
    paddingLeft: 10,
    borderWidth: 0,
    width: "60%",
    ...sty.aCenter
  },
  forgetPassText: {
    fontSize: 20,
    paddingLeft: 0,
    color: colors.text,
    fontFamily: fonts.fontFamily.Regular

  },
  signUpWrapper: {
    flex: 1,
    borderWidth: 0,
    paddingBottom: 20,
    paddingTop: 10,
    ...sty.jEnd,
    ...sty.aCenter,
  },
  signUpView: {
    borderWidth: 0,
  },
  signUp: {
    ...sty.fRow,
    paddingTop: 0,
    paddingLeft: 0,
    borderWidth: 0,
    flex:1,
    width: "60%",
    ...sty.aCenter,
  },
  signUpText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: "bold",
    fontFamily: fonts.fontFamily.Regular,
    paddingTop: 10
  },

});
