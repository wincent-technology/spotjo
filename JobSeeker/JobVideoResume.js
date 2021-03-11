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
    Dimensions,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    ImageBackground,
    Image,Alert,
    PermissionsAndroid,
    TouchableOpacity
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
    scale,
    snack
} from '../src/Util';
import {
    play
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
import BackNext from '../Component/BackNext'



class JobVideoResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            letdue: 0,flag:false

        }
        // this.state = {};
    }



    next = () => {
        try {
            http.POST('api/user/edit', {
                id: global.Id,
                video: global.Video,
                first_name: global.firstName,
                last_name: global.lastName,
                place: global.Place,
                email: global.UserEmail,
                mobile: global.UserMobile,
                profile: global.CompanyImage,
                type: global.type,
            }).then(async (res) => {
                if (res['data']['status']) {
                    console.log('rrrrrrrrr>>>>>>', res['data']['result']);
                    global.Video = url + 'images/user/' + res['data']['result'][0]['video']
                    global.UserProfile = url + 'images/user/' + res['data']['result'][0]['profile']
                    await AsyncStorage.removeItem('UserLoggedInData');
                    await AsyncStorage.setItem('UserLoggedInData', JSON.stringify(res['data']['result'][0]));
                    this.props.navigation.navigate('TabScreenJob')
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']));
        } catch (error) {
            snack(error)

        }
    }

    back = () => {
        console.log('dfgdg');
        this.props.navigation.goBack();
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
            // durationLimit: 30
        };
        var permissions = [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ];
        PermissionsAndroid.requestMultiple(permissions).then(granted => {
            console.log("rs");

            ImagePicker.launchImageLibrary(options, async (response) => {
                if (response.didCancel) {} else if (response.error) {} else if (response.customButton) {} else {
                    console.log(response);
                    const maxTime = 300000; // 5 min

                    // global.Video = 'file://' + response.path
                    this.setState({
                        letdue: response
                    })
                }
            });
        });
    }


    Record  = () => {
        console.log('hi')
        this.props.navigation.navigate('CameraRecord');
    }

    onLoad = (data) => {
        console.log('durationVideo', data.duration);
        if  (!this.state.flag){
        if (data.duration <= 30)
        {this.setState({flag:true},()=>
            this.maggi(this.state.letdue.path))}
        else
            {Alert.alert(
                'Sorry',
                'Video must be less then 30 Seconds', [{
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }], {
                    cancelable: false
                }
            );}
        }
            

    }
    maggi = async (file) => {
        var data = await RNFS.readFile(`file://${file}`, 'base64').then(async (res1) => {
            RNFS.stat(`file://${file}`)
                .then((stats) => {
                    let videoType = stats.path.split('.').pop()
                    try {
                        this.setState({
                            show: true
                        })
                        http.POST('api/user/upload/video', {
                            Id: global.Id,
                            video: res1,
                            type: videoType
                        }).then((res) => {
                            if (res['data']['status']) {
                                this.setState({
                                    show: false
                                })
                                snack('Video uploaded')
                                this.next()
                            } else {
                                snack(res['data']['message'])
                            }
                        }, err => snack(err['message']));
                    } catch (error) {
                        snack(error)
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
            play('videocam', scale(100), '#fff')
            }
        
       <CustomButton title = {'Upload Video'}
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
            <CustomButton title = {'Record Video'}
            onPress = {()=> this.Record()}
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
            }}><ActivityIndicator size="large" color="#fff" /></View>
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
            
            </View>
            
            </View> }
            <BackNext onBack={this.back} onNext={this.next} />
       </ImageBackground></SafeAreaView>

        );
    }
};
export default withNavigationFocus(JobVideoResume);