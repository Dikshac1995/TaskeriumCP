import { Text, View, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const DeviceType = (height / width) > 1.6 ? 'Phone' : 'Tablet';

export const xxSmall = 12;
export const xSmall = 14;
export const small = 16;
export const medium = 18;
export const large = 20;
export const xLarge = 24;
export const xxLarge = 26;

export const heading = 29;

export const fontFamily = {
    Regular: "MyriadPro-Regular",
    Bold: "MyriadPro-Bold",
    Semibold: "MyriadPro-Semibold",
    Light: "MyriadPro-Light"


}
