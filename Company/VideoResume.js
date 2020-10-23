/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Platform,
    ActivityIndicator,
    View,
    Text,
    StatusBar,
    ImageBackground,
    ScrollView,
    PermissionsAndroid,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
    scale,
    snack
} from '../src/Util';
import {
    left,
    library,
    icon,
    play,
    leftVid
} from '../src/IconManager';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import CustomButton from '../Component/Button'
import {
    themeColor,
    Background,
    url
} from '../Constant/index'
import ImagePicker from 'react-native-image-picker';
import http from '../api'
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';

class VideoResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            letdue: 0
        }

    }


    next = () => {
        console.log('sdfsdf');
        try {
            http.POST('api/company/edit', {
                Company: global.Company,
                Anywhere: global.Anywhere || false,
                Address: global.Address,
                Branch: global.Branch,
                Email: global.Email,
                Mobile: global.Mobile,
                CompanyLogo: global.CompanyImage,
                type: global.type,
                Id: global.Id,
                Website: global.WebSite || ''
            }).then(async (res) => {
                if (res['data']['status']) {
                    console.log('rrrrrrrrr>>>>>>', res['data']['result']);
                    global.Video = url + 'images/company/' + res['data']['result'][0]['video']
                    global.uploadUri = url + 'images/company/' + res['data']['result'][0]['logo']
                    await AsyncStorage.removeItem('CompanyLoggedInData');
                    await AsyncStorage.setItem('CompanyLoggedInData', JSON.stringify(res['data']['result'][0]));
                    this.props.navigation.navigate('TabScreenCompany')
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']));
        } catch (error) {
            snack(error)

        }
    }



    OpenImage = () => {

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
            mediaType: 'video',
        };
        var permissions = [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ];
        PermissionsAndroid.requestMultiple(permissions).then(granted => {
            console.log("rs");

            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {} else if (response.error) {} else if (response.customButton) {} else {
                    console.log(response);
                    alert('gone')
                    // this.maggi(response.path)
                    this.setState({
                        letdue: response
                    })
                }
            });
        });
    }


    onLoad = (data) => {
        console.log('durationVideo', data.duration);
        if (data.duration <= 30)
            this.maggi(this.state.letdue.path)
        else
            Alert.alert(
                'Sorry',
                'Video must be less then 30 Seconds', [{
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }], {
                    cancelable: false
                }
            );

    }

    // some = async (response) => {
    //     this.setState({
    //         letdue: response.uri
    //     })
    // }


    back = () => {
        console.log('dfgdg');
        this.props.navigation.goBack();
    }

    maggi = async (file) => {
        var data = await RNFS.readFile(`file://${file}`, 'base64').then(async (res1) => {
            console.log('res', res1);
            RNFS.stat(`file://${file}`)
                .then((stats) => {
                    let videoType = stats.path.split('.').pop()
                    try {
                        this.setState({
                            show: true
                        })
                        http.POST('api/company/upload/video', {
                            Id: global.Id,
                            video: res1,
                            type: videoType
                        }).then((res) => {
                            if (res['data']['status']) {
                                this.setState({
                                    show: false
                                })
                                snack('Video Uploaded')
                            } else {
                                console.log(res['data']['message']);
                                snack(res['data']['message'])
                            }
                        }, err => console.log(err['message']));
                    } catch (error) {
                        console.log('>>>', error)
                    }
                })
                .catch((err) => {})
        });
    }
    render() {
        const {
            show
        } = this.state;
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
        <StatusBar hidden ={true}/>
         <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View>
           {
            play('videocam', scale(80), '#fff')
            }
       <CustomButton title = {'Upload Company Video'}
            onPress = {this.OpenImage}
            containerStyle = {{
                width: wp('80%'),
                marginTop: scale(20),
                elevation: 5
            }}
            buttonStyle={{
                backgroundColor: "white",
                width: wp('80%'),
                borderRadius: scale(3),
                borderWidth: 0,

            }}
            titleStyle={{
                color: themeColor,
                fontSize: scale(17)
            }}
            />
        </View>
        {
            show && <View style={{
                height: scale(50),
                width: scale(50),
                marginTop: scale(50),
                marginLeft: wp(50) - 25
            }}><ActivityIndicator size="large" color="#fff" />
           
            </View>
            }
        {!show && <View style={{
                flexDirection: "row",
                width: wp(90),
                top: hp(20),
            }}>
            <View style={{
                alignItems: "flex-start",
                width: wp(40),
                marginLeft: wp(10)
            }}>
             <Video
            onLoad={this.onLoad}
            paused={true}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            source={{
                uri: this.state.letdue.uri
            }}
            volume={0}
            />
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
            </View> }
       </ImageBackground></SafeAreaView>

        );
    }
};
export default withNavigationFocus(VideoResume);