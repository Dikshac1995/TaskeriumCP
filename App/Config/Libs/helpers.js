import moment from "moment";
import { connect, useSelector, useDispatch } from 'react-redux';
import * as validators from "./Validators";
import { globals } from "..";
import AsyncStorage from '@react-native-community/async-storage';

import {
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
  Image,
} from "react-native";
import {
  map,
  filter,
  reject,
  concat,
  find,
  toUpper,
  uniqBy,
  findIndex,
  differenceBy,
  orderBy,
  shuffle,
  chain,
  forEach,
  chunk,
} from "lodash";
import { StackActions, CommonActions } from "@react-navigation/native";


export const _spaceChecker = (value) => {
  const splitData = value.split("");

  for (i = 0; i < splitData.length; ++i) {
    if (splitData[i] == " ") {
      return true;
    }
  }
  return false;
};

export const _emailCorrector = (email) => {
  const splitData = email.split("");
  let value = "";

  for (i = 0; i < splitData.length; ++i) {
    if (splitData[i] != " ") {
      value = value + splitData[i];
    }
  }
  return value;
};

export const _validateData = (obj) => {
  let validation = {
    status: true,
    data: [],
  };
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let ele = obj[key];
      let value = ele[0];
      let validationArr = ele[1].split("|");

      if (ele[3]) {
        let res = ele[3]();

        if (!res.status) {
          validation.status = false;
          validation.data.push(res.data);
        }
      }

      validationArr.map((item) => {
        let itemArr = item.split("-");

        switch (itemArr[0]) {
          case "required":
            if (!validators.RequiredFieldValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + " is required");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' is required')) // ' is required')
            }
            break;
          case "number":
            if (!validators.NumberValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be number");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be number')) //' must be number')
            }
            break;
          case "mobnumber":
            if (!validators.MobileNumberValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be number");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be number')) //' must be number')
            }
            break;
          case "email":
            if (!validators.EmailValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid email");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid email')) //' must be valid email')
            }
            break;
          case "public_email":
            if (!validators.EmailValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid email");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid email')) //' must be valid email')
            }
            break;
          case "url":
            if (!validators.UrlValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid URL");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid URL')) // ' must be valid URL')
            }
            break;
          case "link":
            if (!validators.LinkValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid link");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid URL')) //' must be valid link')
            }
            break;
          case "min":
            if (value.length < itemArr[1]) {
              validation.status = false;
              validation.data.push(
                ele[2] + ` must be minimum ${itemArr[1]} characters`
              );
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be minimum') + itemArr[1] + getLocale(currentLang, 'validator', ' characters'))  // ` must be minimum ${itemArr[1]} characters`)
            }
            break;
          case "max":
            if (value.length > itemArr[1]) {
              validation.status = false;
              validation.data.push(
                ele[2] + ` must be maximum ${itemArr[1]} characters`
              );
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', '') + itemArr[1] + getLocale(currentLang, 'validator', ''))
            }
            break;
          case "space":
            if (!validators.spaceValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + ` must not contain spaces`);
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must not contain spaces')) // ` must not contain spaces`)
            }
            break;
          case "emoji":
            if (!validators.emojisValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + ` must not contain emoji`);
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must not contain emoji'))  //` must not contain emoji`)
            }
            break;
          default:
            break;
        }
      });
    }
  }
  return validation;
};

//Check if object is empty
export const _isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const _isObjectInArr = (obj, arr) => {
  var state = false;
  for (let i = 0; i < arr.length; i++) {
    var count = 0;
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key)) {
        if (arr[i][key] == obj[key]) {
          count++;
        }
      }
    }
    if (Object.keys(obj).length == count) {
      state = true;
    }
  }
  return state;
};

export const _removeObjectInArr = (obj, arr) => {
  var repeatIndex = -1;
  for (let i = 0; i < arr.length; i++) {
    var count = 0;
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key)) {
        if (arr[i][key] == obj[key]) {
          count++;
        }
      }
    }
    if (Object.keys(obj).length == count) {
      repeatIndex = i;
    }
  }
  arr = arr.filter((item, index) => {
    return repeatIndex == index ? false : true;
  });
  return arr;
};

export const _sortByKeyArr = (array, key, type = "all") => {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

export const _standardCb = (loader) => {
  return {
    error: (error) => {
      let cb = {
        ok: () => { },
      };
      setTimeout(() => {
        loader.error("Error", error.message, cb);
      }, 100);
    },
    complete: () => loader.hideLoader(),
  };
};

export const _getData = (data) => {
  let obj = {};
  for (var key in data) {
    if (data.hasOwnProperty(key)) obj[key] = data[key][0];
  }
  return obj;
};


export const _objectArrToArrConvert = (arr, prop) => {
  var newArr = [];
  arr.map((item) => {
    newArr.push(item[prop]);
  });
  return newArr;
};

export const getLocale = (prop, string1, string2) => {
  if (!prop.translations[prop.activeLanguage]) return "Not found";
  else if (!prop.translations[prop.activeLanguage][string1]) return "Not found";
  else if (!prop.translations[prop.activeLanguage][string1][string2]) {
    return "Not found";
  }
  return prop.translations[prop.activeLanguage][string1][string2];
};

export const dateToFromNowDaily = (myDate, formatStr) => {
  return moment(myDate).calendar(null, {
    lastWeek: "[Last] dddd",
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: formatStr,
    sameElse: formatStr,
  });
};

export const getMessageSeperator = (
  date,
  formatStr = "DD/MM/YYYY",
  shouldDateFormat = false
) => {
  if (shouldDateFormat && date) {
    return moment(date).format(formatStr);
  } else if (date) {
    return dateToFromNowDaily(date, formatStr);
  }
  return "";
};

export const getDuration = (seconds) => {
  // multiply by 1000 because Date() requires miliseconds
  var date = new Date(seconds * 1000);
  var hh = date.getUTCHours();
  var mm = date.getUTCMinutes();
  var ss = date.getSeconds();
  // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
  // if (hh > 12) {hh = hh % 12;}
  // These lines ensure you have two-digits
  if (hh < 10) hh = "0" + hh;
  if (mm < 10) mm = "0" + mm;
  if (ss < 10) ss = "0" + ss;
  // This formats your string to HH:MM:SS
  var t = hh + ":" + mm + ":" + ss;
  return t;
};

export const aspect_ratio = (val, lim) => {
  var lower = [0, 1];
  var upper = [1, 0];

  while (true) {
    var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

    if (val * mediant[1] > mediant[0]) {
      if (lim < mediant[1]) {
        return upper;
      }
      lower = mediant;
    } else if (val * mediant[1] == mediant[0]) {
      if (lim >= mediant[1]) {
        return mediant;
      }
      if (lower[1] < upper[1]) {
        return lower;
      }
      return upper;
    } else {
      if (lim < mediant[1]) {
        return lower;
      }
      upper = mediant;
    }
  }
};

export const checkIphoneXR = () => {
  if (
    Platform.OS === "ios" &&
    (globals.WINDOW_HEIGHT == 812 || globals.WINDOW_WIDTH == 812)
  ) {
    return true;
  } else {
    return false;
  }
};

//---------- required -----------------------------

export const buildHeader = (headerParams = {}) => {
  var header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    //'Access-Control-Allow-Origin': 'http://127.0.0.1:8081',
  };
  header = Object.assign({}, header, headerParams);
  return header;
};

export const userAuthdetails = async () => {
  let userAuthdetails;
  await AsyncStorage.getItem('userAuthDetails').then(async (value) => {
    // console.log({ value })
    userAuthdetails = await JSON.parse(value);
  });
  return userAuthdetails;
};


export const authError =(Error,err,props,ok)=>{
  setTimeout(() => {
    Alert.alert(Error, err.message,
        [
            {
                text: ok, onPress: () => {
                    AsyncStorage.removeItem('userAuthDetails');
                    AsyncStorage.removeItem('token');
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'LogIn' },
                            ],
                        })
                    );
                }
            },
        ])
}, 100)
}


//--------validation----------------------//
export const validation = (type, text, pass) => {



  // console.log(text, 0, pass)

  // const regex = /^[A-Za-z]+$/;
  // const passreg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/


  const numregx = /^[0-9]+$/
  // /^\d{10}$/
  // const emailPattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  // /^ [_a - z0 - 9 -] + (\.[_a-z0 - 9 -]+)*@[a - z0 - 9 -]+(\.[a - z0 - 9 -] +)* (\.[a - z]{ 2, 4 }) $ /;s
  // const emailPattern = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/
  if (type == 'email') {
    if (text == " " || !text) {
      return false
    }

    else if (emailPattern.test(text)) {
      return true
    }
    else {
      return false
    }
  }
  else if (type == 'phoneNo') {
    if (text == " " || !text) {
      return false
    }
    else if (numregx.test(text)) {
      return true
    }
    else {
      return false
    }
  }

}



