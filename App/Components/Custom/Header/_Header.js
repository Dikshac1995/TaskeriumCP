import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import styles from "./Styles";
import FastImage from 'react-native-fast-image'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';


const _Header = (props) => {
    const [menu, setmenu] = useState(false);
    const style = props.style || {};
    return (
        <View style={styles.container}>
            <View style={styles.headerWrap}>
                <View style={styles.headerLeft}>
                </View>
                <View style={styles.headingTextWrap}>
                    <Text style={styles.headingText}> {props.header ? props.header : "Header"} </Text>
                </View>
                {props.rightIcon ?
                    <View style={styles.rightIconWrap}>
                        <TouchableOpacity style={{}}
                        >
                            <View>
                                <Menu >
                                    <MenuTrigger customStyles={triggerStyles} >
                                        <FastImage
                                            style={styles.rightIconStyle}
                                            source={props.rightIcon1}
                                            resizeMode={"contain"}
                                        />
                                    </MenuTrigger>
                                    <MenuOptions customStyles={
                                        {
                                            optionText: { fontSize: 20, fontFamily: 'MyriadPro-Regular' },
                                            optionWrapper: { borderColor: '#1C7DED', borderWidth: 1 }
                                        }
                                    } >
                                        <MenuOption text='Change Password'
                                            onSelect={props.onPress ? () => props.onPress() : null}
                                        />
                                        <MenuOption text='Change Language'
                                            onSelect={() => { props.onPress_changeLang ? props.onPress_changeLang() : null }}
                                        />
                                        <MenuOption text='Sign Out' customStyles={{}}
                                            onSelect={props.onPress_signout ? () => props.onPress_signout() : null}

                                        />
                                    </MenuOptions>
                                </Menu>
                            </View>

                        </TouchableOpacity>

                    </View> : null}
            </View >
        </View >
    )

}
const triggerStyles = {
    triggerText: {

    },
    triggerWrapper: {
        padding: 5,

    },
    triggerTouchable: {
    },
    TriggerTouchableComponent: TouchableHighlight,
};

export default _Header;