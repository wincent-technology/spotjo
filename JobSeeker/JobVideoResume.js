/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale } from '../src/Util';
import { play } from '../src/IconManager';
import { widthPercentageToDP as wp } from '../Component/responsive-ratio';
import CustomButton from '../Component/Button'
import { themeColor } from '../Constant/index'

class JobVideoResume extends Component {
    constructor(props) {
        super(props);

    // this.state = {};
    }


    next = () => {
        this.props.navigation.navigate('TabScreenJob')
    }

    render() {
        return (
            <ImageBackground style={styles.ImageBlue}
            source = {
            require('../Img/bg.jpg')
            }
            resizeMode = {
            'stretch'
            } >
        <ImageBackground style={styles.ImageBlue}
            source = {require('../Img/glossy.png')}
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
            onPress = {() => this.Back}
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
       </ImageBackground></ImageBackground>

        );
    }
}
;
export default withNavigationFocus(JobVideoResume);