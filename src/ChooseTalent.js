import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from './Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor } from '../Constant/index'
import styles from './Style';
class ChooseTalent extends Component {
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
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
            <View style={styles.MainFlex}>
        <View style={[{
                top: scale(30),
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(140),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={{
                width: wp('80%')
            }}><Text style={[{
                fontSize: scale(24),
                textAlign: 'center'
            }, styles.FontSty]}>How will you use your talent?</Text></View>
            <View style={styles.PersonalInfoChoose}>
                            <View style={styles.PersonalInfoRowChoose}>
                                <View style={[styles.PersonalInfoStartChoose, {
                flexDirection: 'row'
            }]}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(16)
            }, styles.Employment]}>Fulltime</Text><View style={
            styles.SwitchView}><ToggleSwitch
            isOn={FullTime}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                FullTime: toggle
            })}
            /></View></View>
            <View style={[styles.PersonalInfoEndChoose, {
                flexDirection: "row"
            }]}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(16)
            }, styles.Employment]}>Part-time</Text><View style={
            styles.SwitchView}><ToggleSwitch
            isOn={PartTime}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                PartTime: toggle
            })}
            /></View></View></View>
             <View style={{
                top: hp(4)
            }}>
                                <View style={[styles.PersonalInfoStartChoose, {
                flexDirection: 'row'
            }]}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(18),
                fontWeight: "bold"
            }, styles.Employment]}>Employment</Text></View></View></View>
            <View style={styles.PersonalInfoEmpoyementList}>
            <View style={[styles.PersonalInfoRowChoose, {
                marginTop: hp(5)
            }]}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Employed</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Employed}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Employed: toggle
            })}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Internship</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Internship}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Internship: toggle
            })}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Student jobs</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={StudentJobs}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                StudentJobs: toggle
            })}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={[styles.PersonalInfoStartEmp, {
                width: wp(50)
            }]}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Helping Vacancies</Text></View>
                                <View style={[styles.PersonalInfoEndEmp, {
                width: wp(20)
            }]}><View style={styles.SwitchView}><ToggleSwitch
            isOn={HelpingVacancies}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                HelpingVacancies: toggle
            })}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Freelancer</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Freelancer}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Freelancer: toggle
            })}
            /></View></View></View>
            <View style={{
                top: hp('35'),
                width: wp(75),
                alignItems: "flex-end",
                position: "absolute"
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}>
                                <View style={[styles.Size, {
                alignItems: "flex-end"
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
            </View>
            </View>
            </View>
        </ImageBackground></SafeAreaView>
        )
    }
}
;

export default withNavigationFocus(ChooseTalent);