import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Input, Item } from "native-base";
import styles from "./Styles";
import { colors, sty } from "../../../Theme"
import FastImage from 'react-native-fast-image'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuContext } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';
import { globals, helpers, validators, API, } from '../../../Config';
import Icon from 'react-native-vector-icons/FontAwesome5';



const _Header = (props) => {
    const [menu, setmenu] = useState(false);


    const style = props.style || {};
    return (
        <View style={{ paddingTop: 20 }}>
            <View style={{ ...sty.fRow, }}>
                <View style={{ flex: 1, }}>
                </View>
                <View style={{ flex: 8, ...sty.aCenter, ...sty.jCenter, borderWidth: 0 }}>
                    <Text style={styles.headingText}> {props.header ? props.header : "Header"} </Text>
                </View>
                {props.rightIcon ?
                    <View style={{ flex: 1, ...sty.aEnd }}>
                        <TouchableOpacity style={{}}
                        >
                            <View>
                                <Menu >
                                    <MenuTrigger customStyles={triggerStyles} >
                                        <FastImage
                                            style={{ height: 45, width: 40, paddingLeft: 0, color: 'black' }}
                                            source={props.rightIcon1}
                                            resizeMode={"contain"}
                                        />
                                        {/* <Icon name={props.rightIcon} size={40} /> */}
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{
                                        optionText: { fontSize: 20, fontFamily: 'MyriadPro-Regular' },
                                        optionWrapper: { borderColor: '#1C7DED', borderWidth: 1 }
                                    }} >
                                        <MenuOption text='Change Password'
                                            onSelect={props.onPress ? () => props.onPress() : null}
                                        />
                                        {/* <MenuOption text='Language'
                                        // onSelect={() => this.setState({ renderer: SlideInMenu })}
                                        /> */}
                                        <MenuOption text='Sign Out' customStyles={{}}
                                            onSelect={props.onPress_signout ? () => props.onPress_signout() : null}

                                        />
                                    </MenuOptions>
                                </Menu>
                                {/* {props.rightIcon ?
                                    <FastImage
                                        style={{ height: 40, width: 40, paddingLeft: 0, color: 'black' }}
                                        source={props.rightIcon}
                                        resizeMode={"contain"}
                                    />
                                    : null
                                } */}
                            </View>

                        </TouchableOpacity>

                    </View> : null}
            </View >
        </View >
    )

}
const triggerStyles = {
    triggerText: {
        // color: 'pink',
    },
    triggerWrapper: {
        padding: 5,
        // backgroundColor: 'blue',
    },
    triggerTouchable: {
        // underlayColor: 'darkblue',
        // activeOpacity: 70,
    },
    TriggerTouchableComponent: TouchableHighlight,
};

export default _Header;