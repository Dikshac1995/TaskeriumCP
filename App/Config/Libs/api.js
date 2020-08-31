import { Alert } from "react-native";
import axios from "axios";
import { buildHeader, imagePreFetcher } from "./helpers";
import { live, BASE_URL, POST_TYPES } from "./globals";

import { helpers } from "..";
import { chain, uniqBy } from "lodash";
import AsyncStorage from '@react-native-community/async-storage';


let URL = "";

//Current Now
const END_POINT = { type: "POST", url: "https://ws.taskerium.com/saas/login/" };
const REGISTER_USER = { type: "POST", url: URL + "sync_registration_data" };
const LOGIN_USER = { type: "POST", url: URL + "login" };
const GET_TASKS = { type: "POST", url: URL + "get_core_data" };
const FORGET_PASSWORD = { type: "POST", url: URL + "recover_password" };
const RESET_PASSWORD = { type: "POST", url: URL + "reset_password" };
const SIGN_OUT = { type: "POST", url: URL + "logout" };
const GET_CUSTOMER_DATA = { type: "POST", url: URL + "get_customers_data" };
const SYNC_DATA = { type: "POST", url: URL + "sync_data" };
const GET_COMMENT_DATA = { type: "POST", url: URL + "get_comments_data" };
const SYNC_COMMENT_DATA = { type: "POST", url: URL + "sync_comments_data" };
const SYNC_TASK_PICTURE = { type: "POST", url: URL + "sync_task_picture" };
const SYNC_EVALUTION_DATA = { type: "POST", url: URL + "sync_evaluation_data" };

// const REGISTER_USER = { type: "POST", url: getBaseUrl() }
// https://app.taskerium.com/taman/v2/Default.asmx/logout


export const API = {

  getEndPoint: (data, cb, ) => request(data, cb, END_POINT, {}, "", false),
  registerUser: async (data, cb) => request(data, cb, REGISTER_USER),
  loginUser: async (data, cb, header) => request(data, cb, LOGIN_USER, header),
  getAllTasks: async (data, cb, header) => request(data, cb, GET_TASKS, header),
  forgetPassword: async (data, cb, header) => request(data, cb, FORGET_PASSWORD, header),
  resetpassword: async (data, cb, header) => request(data, cb, RESET_PASSWORD, header),
  signOut: async (data, cb, header) => request(data, cb, SIGN_OUT, header),
  get_customers_data: async (data, cb, header) => request(data, cb, GET_CUSTOMER_DATA, header),
  sync_data: async (data, cb, header) => request(data, cb, SYNC_DATA, header),
  getCommentData: async (data, cb, header) => request(data, cb, GET_COMMENT_DATA, header),
  addCommentData: async (data, cb, header) => request(data, cb, SYNC_COMMENT_DATA, header),
  postDocument: async (data, cb, header) => request(data, cb, SYNC_TASK_PICTURE, header),
  saveEvalutionData: async (data, cb, header) => request(data, cb, SYNC_EVALUTION_DATA, header),
}

async function request(requestData, cb, featureURL, secureRequest, urlData = '', retriveBaseUrl = true) {

  let url = "";
  if (retriveBaseUrl) {
    let baseUrl = await getBaseUrl()
    let endurl = featureURL.dynamic ? featureURL.url(urlData) : featureURL.url;
    url = baseUrl + "v2/Default.asmx/" + endurl
  } else {
    url = featureURL.dynamic ? featureURL.url(urlData) : featureURL.url;
  }

  if (!live) {
    console.groupCollapsed("API REQUEST");
    console.log({ featureURL });
    console.log({ secureRequest });
    console.log({ requestData });
    console.log({ url });
    console.groupEnd();
  }

  try {
    let response;

    if (featureURL.type == 'GET') {
      response = await axios.get(url, {
        headers: secureRequest,
        params: requestData
      })
    }
    else if ('POST|PATCH|PUT'.includes(featureURL.type)) {
      response = await axios[featureURL.type.toLocaleLowerCase()](url, requestData, {
        headers: secureRequest
      })
    }
    else if ('DELETE'.includes(featureURL.type)) {
      response = await axios.create({ headers: secureRequest }).delete(url);
    }
    if (!live) {
      console.groupCollapsed("API RESPONSE");
      console.log({ response });
      console.groupEnd();
    }
    if (cb.complete) cb.complete();

    if (response.status == 200) {
      cb.success(response.data);
    } else {
      console.log("a")
      if (response.data.message === 'Invalid credentials' || response.data.error === 'Error: Invalid credentials') {
        logout();
      }
      cb.error(response.data);
    }
  } catch (error) {
    console.log("b")
    !live ? console.log({ error }) : null;
    if (cb.complete) cb.complete();
    if (error.response) {
      if (error.response.data.type === 'AUTHORIZATION' || error.response.data.message === 'Not logged in / Wrong password or username / Token expired') {
        // logout();
        // message: "Not logged in / Wrong password or username / Token expired"
        // type: "AUTHORIZATION"
      }
      cb.error(error.response.data);
    }
    else {
      console.log("c")
      if (error.data.message === 'Invalid credentials' || error.data.error === 'Error: Invalid credentials') {
        logout();
      }
      cb.error(error);
    }
  }
}

function logout() {
  setTimeout(() => {
    Alert.alert(
      'Success',
      'Authentication failed',
      [
        {
          text: 'OK', onPress: () => {
            // NavigationService.navigate('rootNav', 'Login', {});
          }
        },
      ]
    );
  }, 100);
}

async function getBaseUrl() {
  const baseUrl = await AsyncStorage.getItem("baseUrl");
  return baseUrl
}