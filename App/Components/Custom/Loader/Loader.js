import React, { Component } from 'react';
import {
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
import {styles} from './Styles'

const Loader = props => {
    const {
        loading,
        name,
        ...attributes
    } = props;
    if (!name) {
        return (

            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={loading} color="blue" />
                    </View>
                </View>
            </Modal>
        )
    }
    else {
        return (
            <View style={styles.loader2}>
                <View style={styles.loading}>
                    <View>
                        <ActivityIndicator color="blue" />
                    </View>
                </View>
            </View>)
    }

}



export default Loader;