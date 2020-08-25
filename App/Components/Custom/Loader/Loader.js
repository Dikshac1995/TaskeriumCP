import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';

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
                    // console.log('close modal')
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
            <View style={{ flex: 1 }}>
                <View style={styles.loading}>
                    <View>
                        <ActivityIndicator color="blue" />
                    </View>
                </View>
            </View>)
    }

}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    loading: {

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
});

export default Loader;