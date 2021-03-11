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
    TouchableOpacity,TextInput,
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
import BackNext from '../Component/BackNext'


const InputText = ({...props}) => {
    console.log(props)
    return <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#fff"}}>
                <View style={{ alignItems: 'baseline'}}>
                <Text style={[styles.PersonalInfoText, {
            fontFamily: FontBold,
            fontSize: scale(18),
            }]}>{props.Text} </Text></View>
            <View>
            <TextInput
            autoCorrect={false}
            onChangeText={props.textChange}
            value={props.value}
            placeholder={!props.value ? 'Enter' + ' ' + props.Text : ''}
            placeholderTextColor={'rgba(255,255,255,0.5)'}
            style={[{ flex: 1,width:'auto',
            justifyContent:"center",
                // alignItems: 'stretch',
            fontFamily: FontRegular,
            fontWeight: '700',
            fontSize: scale(18),
            borderColor: 'black'},styles.PersonalInfoText]}
            {...props}
            /></View>
</View>
}


class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            fname:false,
            lastName: '',
            lname:false,
            Email: '',
            em:false,
            Place: '',
            pl:false,
            Mobile: '',
            Mb:false,
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
        const {firstName,lastName,Email,Place,Mobile} = this.state;
        global.firstName = firstName
        global.lastName = lastName
        global.UserEmail = Email
        global.Place = Place
        global.UserMobile=Mobile
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
            Mobile,fname,lname,em,pl,Mb
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
                height: hp(35)
            }}>
            <InputText Text ={'First Name'} value={firstName} textChange = {(text) => this.setState({
                firstName: text
            }, () => {
                global.firstName = this.state.firstName
            })} />
             <InputText Text ={'Last Name'} value={lastName} textChange = {(text) => this.setState({
                lastName: text
            }, () => {
                global.lastName = this.state.lastName
            })} />
             <InputText Text ={'Email'} value={Email} textChange = {(text) => this.setState({
                Email: text
            }, () => {
                global.UserEmail = this.state.Email
            })} />
            <InputText Text ={'Place'} value={Place} textChange = {(text) => this.setState({
               Place: text
            }, () => {
                global.Place = this.state.Place
            })} />
            <InputText Text ={'Mobile Number'} keyboardType={'numeric'} value={Mobile} textChange = {(text) => this.setState({
               Mobile: text
            }, () => {
                global.UserMobile = this.state.Mobile
            })} />
            
                        </ScrollView>
                        </View>
                    </View>
                    <BackNext onBack={this.back} onNext={this.next} />
                </ImageBackground></SafeAreaView>
        );
    }
};
export default withNavigationFocus(Personal)