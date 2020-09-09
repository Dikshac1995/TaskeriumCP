import { StyleSheet ,Dimensions} from "react-native";

 export const styles = StyleSheet.create({
    container: {
        
        display: "flex",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,

    },
    map: {
        flex: 1,
    },
windowClosedIcon:{
        alignItems: 'flex-end', paddingRight: 20, paddingTop: 30 
    }

});