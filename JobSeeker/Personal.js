/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Dimensions,
    Text,
    Image,
    View,
    PermissionsAndroid,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    scale
} from '../src/Util'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    backgroundCorner,
    avtar,
    FontBold,
    FontRegular,
    Background
} from '../Constant/index'
import ImagePicker from 'react-native-image-picker';

class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            Email: '',
            Place: '',
            Mobile: '',
            img: ''

        };
    }

    componentDidMount() {
        this.setState({
            firstName: global.firstName,
            lastName: global.lastName,
            Email: global.UserEmail,
            Place: global.Place,
            Mobile: global.UserMobile,
        })
        console.log('global', global.UserProfile)
    }

    next = () => {
        this.props.navigation.navigate('JobVideoResume');
    }
    back = () => {
        console.log('dfgdg');
        this.props.navigation.goBack();
    }

    profile = () => {
        let options = {
            title: 'Select Image',
            customButtons: [{
                name: 'customOptionKey',
                title: 'Choose Photo'
            }, ],
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        var permissions = [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ];
        PermissionsAndroid.requestMultiple(permissions).then(granted => {
            console.log("rs");

            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {} else if (response.error) {} else if (response.customButton) {} else {
                    console.log("rs>>>>>>>", response);

                    // const {uri} = response;
                    global.UserProfile = 'file://' + response.path

                    let n1 = Math.floor(Math.random() * 9) + 1,
                        n2 = Math.floor(Math.random() * 9) + 1,
                        n3 = Math.floor(Math.random() * 9) + 1,
                        n4 = Math.floor(Math.random() * 9) + 1,
                        n5 = Math.floor(Math.random() * 9) + 1,
                        n6 = Math.floor(Math.random() * 9) + 1;
                    let randomNumber = n1 + '' + n2 + '' + n3 + '' + n4 + '' + n5 + '' + n6;
                    console.log("res", UserProfile);
                    this.setState({
                        img: response.data
                    }, () => {
                        global.CompanyImage = `data:` + response.type + `;base64,` + this.state.img
                        global.type = response.type
                    });
                }
            });
        });
    }
    render() {
        const {
            firstName,
            lastName,
            Email,
            Place,
            Mobile
        } = this.state;
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
                <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source={require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }} /></View>
                        <ImageBackground style={styles.AvtarView} source={backgroundCorner} resizeMode={'contain'}>
                        <TouchableWithoutFeedback onPress={this.profile}>
                        <Image source={{
                uri: global.UserProfile
            }} style={{
                height: wp('29'),
                width: wp('29'),

            // backgroundColor: "transparent"
            }} resizeMode={'cover'}/></TouchableWithoutFeedback></ImageBackground>
                        <View style={styles.PersonalInfo}>
                            <ScrollView style={{
                alignSelf: "stretch",
                height: hp(30)
            }}>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>First Name</Text></View>
                                <View style={styles.PersonalInfoEnd}>
                                <CustomInput textAlign={'right'} value = {firstName} textChange = {(text) => this.setState({
                firstName: text
            }, () => {
                global.firstName = firstName
            })} containerStyle={styles.PersonalCompanyTextInput} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Last Name</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput  textAlign={'right'} value = {lastName} textChange = {(text) => this.setState({
                lastName: text
            }, () => {
                global.lastName = lastName
            })} containerStyle={[styles.PersonalCompanyTextInput, {
                width: wp(43)
            }]} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Email</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput  textAlign={'right'} value = {Email} textChange = {(text) => this.setState({
                Email: text
            }, () => {
                global.UserEmail = Email
            })} containerStyle={[styles.PersonalCompanyTextInput, {
                width: wp(60)
            }]} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Place</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput textAlign={'right'} value = {Place} textChange = {(text) => this.setState({
                Place: text
            }, () => {
                global.Place = Place
            })} containerStyle={styles.PersonalCompanyTextInput} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Mobile Number</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput textAlign={'right'} value = {Mobile} textChange = {(text) => this.setState({
                Mobile: text
            }, () => {
                global.UserMobile = Mobile
            })} containerStyle={[styles.PersonalCompanyTextInput, {
                width: wp(48)
            }]} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            keyboardType={'phone-pad'}
            /></View></View>
                        </ScrollView>
                        </View>
                        <View style={{
                flexDirection: "row",
                width: wp(90),
                top: hp(6),
            }}>
            <View style={{
                alignItems: "flex-start",
                width: wp(40),
                marginLeft: wp(5)
            }}>
            <TouchableOpacity style={styles.Size} onPress={() => this.back()} hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}><View  style={styles.Size}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Back</Text></View></TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'flex-end',
                right: wp(7),
                width: wp(47)
            }}><TouchableOpacity style={styles.Size} onPress={this.next} hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableOpacity></View>
            </View>
                    </View>
                </ImageBackground></SafeAreaView>
        );
    }
};
export default withNavigationFocus(Personal)