import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // removef not using Google Maps
import React from "react";
import { View, Text, Share, Button, TouchableOpacity, FlatList, Modal, Dimensions, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './Styles'


const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class Map extends React.Component {

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
        this.setState({ isMapReady: true, marginTop: 0 });
    }

    // Fetch location details as a JOSN from google map API
    fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="
            + this.state.focusedLocation.latitude + "," + this.state.focusedLocation.longitude +
            "&key=" + "AIzaSyA1dN3ZXZiAAxmtkafcgakmm2DeDSosf_w")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("fetchAddress responseJson", responseJson)
                if (responseJson.status === "OK") {
                    const res = responseJson.results[0].formatted_address;
                    const userLocation = responseJson.results[0].formatted_address;
                    console.log("res :", res)
                    console.log("userLocation :", userLocation)

                    this.setState({
                        userLocation: userLocation,
                        address: res,
                        loading: false
                    });
                }
                else {
                    Alert.alert("Failed", responseJson.error_message)
                    this.setState({ loading: false })
                }

            })
            .catch((err) => {
                console.log("eror", err)
                Alert.alert(err)
                this.setState({ loading: false })
            })


    }

    onPressHandler = () => {
        console.log("add", this.state.address)
        if (this.state.address != "") {
            const address = this.state.address
            console.log(" onPressHandler address :", this.state)
            Alert.alert(
                ' Do you want to set this location  as address', this.state.address,
                [
                    {
                        text: 'YES', onPress: () => {
                            this.props.onPressmap(address)
                           
                        }
                    },
                    {
                        text: 'No', onPress: () => {
                            console.log("no")
                        }
                    },
                ]
            );
        }

    }




    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        console.log("coords :", coords)
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
                console.log(err);
                alert("Fetching the Position failed, please pick one manually!");
            },
            // { enableHighAccuracy: true, timeout: 200000, 
            //     // maximumAge: 1000 
            // },
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
                            <View style={styles.windowClosedIcon}>
                                <Icon name="window-close" size={30} color="#8B0000" onPress={() => this.closeHandler()} />
                            </View>
                        </MapView>
                    </View>}
            </Modal>



        );
    }
}




