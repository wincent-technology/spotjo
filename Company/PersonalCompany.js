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
    StatusBar,
    SafeAreaView,
    ImageBackground,
    Dimensions,
    Text,
    Image,
    View,
    PermissionsAndroid,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    scale
} from '../src/Util'
import CustomInput from '../Component/TextInput'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    backgroundCorner,
    Companyavtar,
    FontBold,
    FontRegular,
    Background
} from '../Constant/index'
import ImagePicker from 'react-native-image-picker';

class PersonalCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CompanyName: 'Company Name',
            Branch: 'Automotive',
            Email: "Enter Email",
            Address: "Enter Compny Address",
            Cell: '+9100000-00000',
            WebSite: '',
            img: ''

        };
    }

    profile = () => {
        // this.props.navigation.navigate('Companylogo');
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
                    global.uploadUri = 'file://' + response.path

                    let n1 = Math.floor(Math.random() * 9) + 1,
                        n2 = Math.floor(Math.random() * 9) + 1,
                        n3 = Math.floor(Math.random() * 9) + 1,
                        n4 = Math.floor(Math.random() * 9) + 1,
                        n5 = Math.floor(Math.random() * 9) + 1,
                        n6 = Math.floor(Math.random() * 9) + 1;
                    let randomNumber = n1 + '' + n2 + '' + n3 + '' + n4 + '' + n5 + '' + n6;
                    console.log("res", uploadUri);
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

    componentDidMount() {
        this.setState({
            CompanyName: global.Company,
            Branch: global.Branch,
            Email: global.Email,
            Address: global.Address,
            Cell: global.Mobile,
            WebSite: global.WebSite
        })
    }
    next = () => {
        this.props.navigation.navigate('VideoResume');
    }
    handleChange = (text) => {
        this.setState({
            Address: text
        })
        global.Address = this.state.Address
    }

    back = () => {
        console.log('dfgdg');
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
                    <View style={[{
                top: scale(40)
            }, styles.CenterLogo]}><View><Image source={require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }} /></View>
                        <ImageBackground style={styles.AvtarView} source={backgroundCorner}><TouchableWithoutFeedback onPress={this.profile}>
                        <Image source={global.uploadUri ? {
                uri: global.uploadUri
            } : Companyavtar} style={{
                height: wp('29'),
                width: wp('29'),
            // backgroundColor: "transparent"
            }} resizeMode={'cover'}/></TouchableWithoutFeedback></ImageBackground>
           
                        <View style={styles.PersonalInfo}>
                         <ScrollView showsVerticalScrollIndicator={true} style={{
                alignSelf: "stretch",
                height: hp(30)
            }}>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Company</Text></View>
                                <View style={styles.PersonalInfoEnd}>
                                <CustomInput textAlign={'right'} value = {this.state.CompanyName} textChange = {(text) => this.setState({
                CompanyName: text
            }, () => {
                global.Company = this.state.CompanyName
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

            }]}>Branch</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput  textAlign={'right'} value = {this.state.Branch} textChange = {(text) => this.setState({
                Branch: text
            }, () => {
                global.Branch = this.state.Branch
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
                                <View style={styles.PersonalInfoEnd}><CustomInput  textAlign={'right'} value = {this.state.Email} textChange = {(text) => this.setState({
                Email: text
            }, () => {
                global.Email = this.state.Email
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

            }]}>Mobile Number</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput textAlign={'right'} value = {this.state.Cell} textChange = {(text) => this.setState({
                Cell: text
            }, () => {
                global.Mobile = this.state.Cell
            })} containerStyle={styles.PersonalCompanyTextInput} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16) 
            }]}
            keyboardType={'phone-pad'}
            /></View></View>
            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>WebSite</Text></View>
                                <View style={styles.PersonalInfoEnd}>
                                <CustomInput textAlign={'right'} value = {this.state.WebSite} 
                                textChange = {(text) => this.setState({
                WebSite: text
            }, () => {
                global.WebSite = this.state.WebSite
            })} containerStyle={[styles.PersonalCompanyTextInput, {
                width: wp(48)
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
            }]}>Address</Text></View>
                                <View style={styles.PersonalInfoEnd}><TextInput
            multiline={true}
            value={this.state.Address}
            textAlign={'right'}
            numberOfLines={10}
            placeholderTextColor={'#fff'}
            style={[styles.PersonalInfoText, {
                height: hp(10),
                width: wp(40),
                right: wp(1),
                marginTop: hp(-1),
                alignSelf: 'center',
                textAlignVertical: 'top',
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            onChangeText ={(text) => this.handleChange(text)}
            /></View></View>
                        </ScrollView></View>
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
export default withNavigationFocus(PersonalCompany)