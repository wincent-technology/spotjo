import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor, themeWhite, iconSearch } from '../Constant/index'
import styles from '../src/Style';



class JobTaskDescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            FullTime: false,
            PartTime: false,
            Employed: false,
            Internship: false,
            StudentJobs: false,
            HelpingVacancies: false,
            Freelancer: false,
        };
    }

    next = () => {
        this.props.navigation.navigate('TabScreen')
    }

    render() {
        const {FullTime, PartTime, Employed, Internship, StudentJobs, HelpingVacancies, Freelancer, name} = this.state
        return (

            <ImageBackground style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(5)),
            // justifyContent: "center",
            // alignItems: 'center'
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginVertical: hp(1)

            }}><Text style={{
                fontSize: scale(18),
                fontFamily: "Roboto-Bold"
            }}>Task Description</Text></View>
           </View>
            </ImageBackground>
        )
    }
}
;

export default withNavigationFocus(JobTaskDescription);