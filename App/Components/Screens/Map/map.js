import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import React from "react";
import { View, Text, Share, Button, TouchableOpacity, FlatList, Modal, Dimensions, 
    StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './Styles'
import _Button from '../../Custom/Button/_Button';
import _PairButton from '../../Custom/Button/_PairButton';
import { globals, helpers, validators, API } from '../../../Config';
import { connect } from 'react-redux';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



 class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            focusedLocation: {
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
            },
            locationChosen: false,
            address: "",
            userLocation: "Your current location",
            loading: false,
             localize :props.localize
            
        }
    }


    componentDidMount() {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            this.getLocationHandler();
        } else {
            this.getLocationHandler()
        }
    }
    onMapReady = () => {
        this.setState({ isMapReady: true, });
    }

    // Fetch location details as a JOSN from google map API
    fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="
            + this.state.focusedLocation.latitude + "," + this.state.focusedLocation.longitude +
            "&key=" + "AIzaSyA1dN3ZXZiAAxmtkafcgakmm2DeDSosf_w")
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === "OK") {
                    const res = responseJson.results[0].formatted_address;
                    const userLocation = responseJson.results[0].formatted_address;
                    this.setState({
                        userLocation: userLocation,
                        address: res,
                        loading: false
                    });
                }
                else {
                    Alert.alert(helpers.getLocale(localize, "popup", "Failed"), responseJson.error_message)
                    this.setState({ loading: false })
                }

            })
            .catch((err) => {
                Alert.alert(helpers.getLocale(localize, "popup", "Error"),err)
                this.setState({ loading: false })
            })


    }

    onPressHandler = () => {
        if (this.state.address != "") {
            const address = this.state.address
        }

    }




    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true,
            };
        });
        setTimeout(() => {
            this.fetchAddress()
        }, 100)
    };
    getLocationHandler = () => {
        Geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
            err => {
                Alert.alert(helpers.getLocale(this.state.localize, "newTask", "geolocation_err"));
            },
            { enableHighAccuracy: false, timeout: 20000 }
        );

    }
    closeHandler = () => {
        this.props.onPressmap()
    }

    render() {
        let marker = null;
        if (this.state.locationChosen && !this.state.loading) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation}
                title={this.state.userLocation}
                onPress={() => this.onPressHandler()}
            />;
        }
        return (
            <Modal animationType={"none"}
                visible={true}
                onRequestClose={() => this.closeHandler()
                }
            >
                {this.state.loading ? <ActivityIndicator color="red" /> :
                    <View style={styles.container}>
                        
                        <MapView
                            initialRegion={this.state.focusedLocation}
                            region={!this.state.locationChosen ? this.state.focusedLocation : null}
                            style={styles.map}
                            onPress={this.pickLocationHandler}
                            ref={ref => this.map = ref}
                        >
                            {marker}
                            {/* <View style={styles.windowClosedIcon}>
                                <Icon name="window-close" size={30} color="#8B0000" onPress={() => this.closeHandler()} />
                            </View> */}
                        </MapView>
                        <View style={styles.footer}>
                        <View style={[styles.signUpWrapper, 
                        { borderWidth: 0 }
                        ]}>
                        <View style={styles.signUpView}>
                                 <_PairButton
                                       btnTxt1={helpers.getLocale(this.state.localize, "task", "cancel")}
                                       btnTxt2={helpers.getLocale(this.state.localize, "newTask", "set")}
                                       txtStyle1={{ color: "red", }}
                                       callback1={() => { this.closeHandler() }}
                                    callback2={() => {  this.props.onPressmap(this.state.address) }}
                                    />
                        </View>
                    </View>
                 </View>
            </View>
                    
                 }
                   
            </Modal>



        );
    }
}


export default Map



