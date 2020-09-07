import {check, request ,PERMISSIONS, RESULTS} from 'react-native-permissions';
import{Platform} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

const PLATFORM_CAMERA_PERMISSION={
    ios:PERMISSIONS.IOS.CAMERA,
    android:PERMISSIONS.ANDROID.CAMERA,
}

const PLATFORM_PHOTO_PERMISSION={
    ios:PERMISSIONS.IOS.PHOTO_LIBRARY,
    android:PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
}


const REQUEST_PERMISSION_TYPE={
    camera :PLATFORM_CAMERA_PERMISSION,
    photo:PLATFORM_PHOTO_PERMISSION
}

const PERMISSIONS_TYPE={
    camera:'camera',
    photo:'photo'
}


class AppPermission{
 checkPemission = async(type): Promise<boolean> =>{
     console.log("check Permission type ",type)
     const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
     console.log("check Permission request ",permissions)
     if(!permissions){
         return true 
     }
     try{
         const result = await check (permissions)
         console.log("check Permission result ",result)
         if(result === RESULTS.GRANTED)return true
         return this.requestPermission(permissions)
        
     } 
     catch(error){
        console.log("check Permission error ",error)
           return false
          
     }
 }

 requestPermission = async (permissions): Promise<boolean> =>{
    console.log("request Permission  ",permissions)
    try {
        const  result = await request(permissions) 
        console.log(" req Permission result ",result)
        return result=== request.GRANTED
    }
    catch(error){
        console.log(" req Permission error ",error)
        return false

    }
 }
 requestMultiplePermission = async (types): Promise<boolean> =>{
    console.log("multiple request Permission  ",types)
    const results=[]
    for (const type of types){
        const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        if(permission){
            const result = await this.requestPermission(permission)
            results.push(result)
        }
    }
    for (const res of results){
        if(!res){
            return false
        }

    }
  return true
 }


}
const Permission = new AppPermission
export {Permission,PERMISSIONS_TYPE}