import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    Alert,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainStyles from '../../Theme/MainStyle';
import { colors } from '../../Theme';

const MainHoc = (WrappedComponent) => {
    return props => {
        return (
            <SafeAreaView style={mainStyles.rootView}>
                <StatusBar barStyle="dark-content" />
                {/* <ActivityIndicator color={colors.darkGray} size={"small"} /> */}
                <View style={mainStyles.rootView}>
                    <WrappedComponent {...props} />
                </View>
            </SafeAreaView >
        );
    };
};

export default MainHoc;
