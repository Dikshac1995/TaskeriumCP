import {check, request ,PERMISSIONS, RESULTS} from 'react-native-permissions';
import{Platform} from 'react-native'

const PLATFORM_CAMERA_PERMISSION={
    ios:PERMISSIONS.IOS.CAMERA,
    android:PERMISSIONS.ANDROID.CAMERA,
}

const REQUEST_PERMISSION_TYPE={
    camera :PLATFORM_CAMERA_PERMISSION
}

const PERMISSIONS_TYPE={
    camera:'camera'
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
         const result = await  check[permissions]
         console.log("check Permission result ",result)
         if(result === RESULTS.GRANTED)  return true
         return this.requestPermission(permissions)
        
     } 
     catch(error){
        console.log("check Permission error ",error)
           return false
          
     }
 }

 requestPermission = async (permissions): Promise<boolean> =>{
    console.log("request Permission error ",permissions)
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


}
const Permission = new AppPermission
export {Permission,PERMISSIONS_TYPE}