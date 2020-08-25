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
// import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';
// import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _Layout, _ListView } from '../../custom';
// import mainStyles from '../../../assets/styles/MainStyles';
// import { styles } from './styles';


// export const mainHoc = (data) => WrappedComponent => {
//     class MainHoc extends React.Component {
//         state = {
//             renderCmp: false,
//             rootViewStyle: data.rootView || mainStyles.rootView
//         }

//         componentDidMount() {
//             this.setState({ renderCmp: true });
//         }

//         componentWillUnmount() {
//         }

//         // _loader = () => { return this.refs.loader; }
//         // _errorModal = () => { return this.refs.errorModal; }

//         render() {
//             const { rootViewStyle } = this.state;
//             const statBar = <StatusBar backgroundColor={'rgba(74,74,74,100)'} barStyle="light-content" />;
//             return (
//                 <View style={rootViewStyle}>
//                     {statBar}
//                     {/* <_Loading ref={'loader'} /> */}
//                     {/* <_ErrorModal ref={'errorModal'} /> */}
//                     {
//                         this.state.renderCmp ?
//                             // <WrappedComponent {...this.props} loader={this._loader()} errorModal={this._errorModal()} />
//                             <WrappedComponent {...this.props} />
//                             :
//                             <View />
//                     }
//                 </View>
//             )
//         }
//     }

//     return MainHoc
// }

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
