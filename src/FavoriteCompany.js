import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from './Util';
import CustomInput from '../Component/Input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor } from '../Constant/index'
import ToggleSwitch from '../Component/ToggleSwitch'
import styles from './Style';

var c = 0;
class FavoriteCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            Anywhere: false,
        };
    }

    next = () => {
        this.props.navigation.navigate('ChooseTalent')
    }
    back = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {Anywhere, name} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
            <View style={styles.MainFlex}>
        <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={styles.HeadingText}><Text style={[{
                fontSize: scale(24),
                textAlign: 'center'
            }, styles.FontSty]} > Favourite Company ? </Text></View>< View style = {
            {
                top: scale(20)
            }}><CustomInput placeholder = {'Select Company'} textChange = {(text) => this.setState({
                name: text
            })} inputStyle={{
                fontWeight: "bold",
                fontSize: scale(18)
            }}
            iconStyle={{
                height: 25,
                width: 25
            }}
            /></View></View>
              <View style={{
                flex: 1,
                flexDirection: "row",
            }}><View style={[{
                top: hp('35%'),
                left: wp('7%'),
            }, styles.MainSwitchView]}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Anywhere}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Anywhere: toggle
            })}
            /></View><Text style={[{
                marginLeft: scale(5),
                fontSize: scale(20),
            }, styles.FontSty]}>Anywhere?</Text></View>
             <View style={{
                flexDirection: "row",
                width: wp(100),
                top: hp(40)
            }}>
            <View style={{
                alignItems: "flex-start",
                width: wp(40),
                marginLeft: wp(7)
            }}>
            <TouchableWithoutFeedback style={styles.Size} onPress={this.back}><View  style={styles.Size}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Back</Text></View></TouchableWithoutFeedback>
            </View>
            <View style={{
                alignItems: 'flex-end',
                // right: wp(7),
                width: wp(47)
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
            </View></View></View>
        </ImageBackground></SafeAreaView>
        )
    }
}
;

export default withNavigationFocus(FavoriteCompany);