import { Dimensions, Platform } from "react-native";
// import DeviceInfo from "react-native-device-info";

export const live = true;
// export const BASE_URL = 'http://184.72.194.163/';
// export const BASE_URL = "https://api.picstagraph.com/";
// export const BASE_URL = "http://stagingapi.picstagraph.com/";
export const API_KEY = "TqKGLk2e";

export const POST_TYPES = {
};

var userData = {
  baseUrl: ""
};

export const setUserData = (prop, value) => {
  userData[prop] = value;
};
export const getUserData = (prop) => userData[prop];
export const getAllData = () => userData;

export const fcmToken = "";
export const receivingNotificationId = "";


export const WINDOW = Dimensions.get("window");
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const iPhoneX =
  Platform.OS == "ios" && WINDOW.height == 812 && WINDOW.width == 375
    ? true
    : false;
export const footerHeight = iPhoneX ? 80 : 60;

export const LANG_ARR = {
  English: "en",
  German: "he",
};

export const PAGINATION = {
  // subscribers: 10,
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  pages: 0,
};


