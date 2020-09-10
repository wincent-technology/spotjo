import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor, themeWhite, iconSearch, darkract } from '../Constant/index'
import styles from '../src/Style';



class JobBasicType extends Component {
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
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(4)),
            // justifyContent: "center",
            // alignItems: 'center'
            }} source={darkract} resizeMode={'stretch'}>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: hp(4)
            }}>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginVertical: hp(1)

            }}><Text style={{
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                color: themeWhite
            }}>Job Basic Type</Text></View>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginTop: hp(1)
            }}><Text style={{
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                textAlign: "center",
                color: themeWhite
            }}>Please provide all the information mentioned below</Text></View>
            <View style={{
                marginTop: hp(2)
            }}><CustomInput placeholder = {'New Job Title'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                backgroundColor: themeColor,
                // width: "100%",
                borderColor: themeColor,
                justifyContent: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            placeholderTextColor={themeWhite}
            containerStyle={{
                width: wp(75),
                height: scale(45)
            }}
            iconName={iconSearch}
            iconStyle={{
                height: 25,
                width: 25
            }}
            /></View>
            <View style={{
                flexDirection: 'column',
                width: wp(80),
                top: hp(2)
            }}>
                            <View style={styles.PersonalInfoRowChoose}>
                                <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: wp(40)
            }}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(20)
            }, styles.EmploymentJobtype]}>Fulltime</Text><View style={
            styles.SwitchView}><ToggleSwitch
            isOn={FullTime}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                FullTime: toggle
            })}
            /></View></View>
            <View style={{
                flexDirection: "row",
                alignItems: 'flex-end',
                width: wp(40),
                justifyContent: "center"
            }}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(20)
            }, styles.EmploymentJobtype]}>Part-time</Text><View style={
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
                top: hp(2)
            }}>
                                <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: wp(45)
            }}><Text style={[{
                marginLeft: wp(7.2),
                fontSize: scale(20),
                fontWeight: "bold"
            }, styles.EmploymentJobtype]}>Employment</Text></View></View></View>
            <View style={{
                flexDirection: 'column',
                width: wp(70),
                marginLeft: wp(5),
                top: hp(3)
            }}>
            <View style={[styles.PersonalInfoRowChoose, {
                marginTop: hp(2)
            }]}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.EmploymentJobtype, {
                fontSize: scale(18)
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
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.EmploymentJobtype, {
                fontSize: scale(18)
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
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.EmploymentJobtype, {
                fontSize: scale(18)
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
            }]}><Text style={[styles.EmploymentJobtype, {
                fontSize: scale(18)
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
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.EmploymentJobtype, {
                fontSize: scale(18)
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
            </View></View>
            </ImageBackground>
        )
    }
}
;

export default withNavigationFocus(JobBasicType);