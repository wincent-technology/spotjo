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
    url,
    FontRegular
} from '../Constant/index'
import ImagePicker from 'react-native-image-picker';
import http from '../api'
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import BackNext from '../Component/BackNext'
import Texting from '../Constant/Text'
import Video from 'react-native-video';
import Modal from "react-native-modal";

const Items = global.language == 'english' ? true : false
class VideoResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            letdue: 0,flag:false,
            changeImage:false
        }

    }


    next = () => {
        // console.log('sdfsdf');
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

    Record  = () => {
        this.setState({changeImage:false})
        this.props.navigation.navigate('Camera');
    }


    OpenImage = () => {
        this.setState({changeImage:false})

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
        if(!this.state.flag){
        if (data.duration <= 30)
        {this.setState({
            flag:true
        },()=> this.maggi(this.state.letdue.path))}
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
                                this.next();
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
        <Modal
              style={{ justifyContent: 'center', alignItems: 'center'}}
              isVisible={this.state.changeImage}
              backdropOpacity={0.3}
              onBackdropPress={()=>{this.setState({changeImage:false})}}
              onBackButtonPress={()=>{this.setState({changeImage:false})}}
              animationOutTiming={600}
              onSwipeComplete={()=>{this.setState({changeImage:false})}}
              swipeDirection="left"
          >

              <View
                  style={{
                    //   height: '35%',
                      width: '100%',
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position:'absolute',
                      bottom:0,
                      padding:10
                  }}
              >
        <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                      <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',marginVertical:10}}>
                          <Text style={{fontSize:hp(2.7),fontWeight:'bold',color:'black'}}>Video Resume</Text>
                      </View>
                      <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center',
                     }}>
                          <View style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                              <TouchableOpacity
                                  onPress={() =>this.Record() }
                                  style={{
                                      backgroundColor: 'white',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      width: '100%',
                                      height: '100%'
                                  }}
                              >
                                  <Image source={require('../Img/camera2.png')} style={{width:hp(5),height:hp(5)}}/>
                                  <Text style={{ color: '#000000',fontSize:hp(2),fontFamily:FontRegular }}> Camera </Text>
                              </TouchableOpacity>
                          </View>
                          <View style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                              <TouchableOpacity
                                  onPress={() => this.OpenImage()}
                                  style={{
                                      backgroundColor: 'white',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      width: '100%',
                                      height: '100%'
                                  }}
                              >
                                  <Image source={require('../Img/gallery.png')} style={{width:hp(5),height:hp(5)}}/>
                                  <Text style={{ color: '#000000',fontSize:hp(2),fontFamily:FontRegular }}> Gallery </Text>
                              </TouchableOpacity>
                          </View>

                      </View>
                                  </View>
                                  </View>
          </Modal>

         <View style={[{
                top: hp(5)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: hp(20),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View>
           {
            play('videocam', hp(15), '#fff')
            }
       <CustomButton title = {Items ? 'Upload Company Video' : 'Upload Company Video' }
            onPress = {()=> this.setState({changeImage:true})}
            containerStyle = {{
                width: wp('80%'),
                marginTop: hp(5),
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
                fontSize: hp(2.7)
            }}
            />
        </View>
        {
            show && <View style={{
                height: hp(5),
                width: hp(5),
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
            </View>

            </View> }
            <BackNext onBack={this.back} onNext={this.next} show={true} />

       </ImageBackground></SafeAreaView>

        );
    }
};
export default withNavigationFocus(VideoResume);