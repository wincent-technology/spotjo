/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, StatusBar, ImageBackground, PermissionsAndroid, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import CustomButton from '../Component/Button'
import { themeColor, Background } from '../Constant/index'
import ImagePicker from 'react-native-image-picker';


class JobSeekerPhoto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img: ''
        };
    }


    OpenImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [{
                name: 'customOptionKey',
                title: 'Choose Photo'
            },],
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
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                } else {
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
    next = () => {
        this.props.navigation.navigate('Personal')
    }

    render() {
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
            leftVid('upload', scale(80), '#fff')
            }
        
       <CustomButton title = {'Upload your Photo'}
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
        <View style={[styles.Next, {
                right: wp('10%'),
                marginTop: scale(-20)
            }]}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}><View  style={[styles.Size, {
                alignItems: "flex-end"
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
       </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(JobSeekerPhoto);