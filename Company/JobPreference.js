import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Platform, Text, Image, View, TextInput, Picker } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor, themeWhite, iconSearch, darkract } from '../Constant/index'
import styles from '../src/Style';
import DateTimePicker from '@react-native-community/datetimepicker';


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
            show: false,
            show1: false,
            currentDate: Date.now(),
            selectedValue: 'City',
            selectedValue1: 'Languages'

        };
    }
    onChange = (event, selectedDate) => {
        this.setState({
            currentDate: selectedDate
        });
    };
    next = () => {
        this.props.navigation.navigate('TabScreen')
    }

    setSelectedValue = (selectedValue) => {
        this.setState({
            selectedValue: selectedValue
        })
    }
    setSelectedValue1 = (selectedValue) => {
        this.setState({
            selectedValue1: selectedValue
        })
    }
    render() {
        const {FullTime, PartTime, Employed, Internship, StudentJobs, HelpingVacancies, Freelancer, name, show, show1} = this.state
        return (

            <ImageBackground style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(4)),
            // justifyContent: "center",
            // alignItems: 'center'
            }} source={darkract} resizeMode={'stretch'}>
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginVertical: hp(4)

            }}><Text style={{
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                color: themeWhite
            }}>Job Preferences</Text></View>
            <View style={{
                marginTop: hp(10)
            }}><CustomInput placeholder = {'Start date'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                backgroundColor: themeColor,
                // width: "100%",
                height: scale(40),
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
            iconName={'calendar-sharp'}
            iconColor={themeWhite}
            onFocus={() => this.setState({
                show: !this.state.show
            })}
            /></View>
             <View style={{
                marginTop: hp(2)
            }}><CustomInput placeholder = {'End Date'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                backgroundColor: themeColor,
                // width: "100%",
                height: scale(40),
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
            iconName={'calendar-sharp'}
            iconColor={themeWhite}
            onFocus={() => this.setState({
                show1: !this.state.show1
            })}
            /></View>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.currentDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            />
            )}{show1 && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.currentDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            />
            )}
             <View style={{
                width: wp(70),
                height: scale(40),
                borderRadius: scale(5),
                backgroundColor: themeColor,
                marginTop: hp(2)

            }}><Picker
            selectedValue={this.state.selectedValue}
            style={{
                width: wp(75),
                height: scale(45),
            // backgroundColor: themeColor
            }}
            onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
            >
        <Picker.Item label="City" value="City" />
        <Picker.Item label="Bangalore" value="Bangalore" />
        <Picker.Item label="London" value="London" />
        <Picker.Item label="Mumbai" value="Mumbai" />
      </Picker></View>
      <View style={{
                width: wp(70),
                height: scale(40),
                borderRadius: scale(5),
                backgroundColor: themeColor,
                marginTop: hp(2)

            }}><Picker
            selectedValue={this.state.selectedValue1}
            style={{
                width: wp(75),
                height: scale(45),
            // backgroundColor: themeColor
            }}
            onValueChange={(itemValue, itemIndex) => this.setSelectedValue1(itemValue)}
            >
        <Picker.Item label="Languages" value="Languages" />
        <Picker.Item label="Hindi" value="Hindi" />
        <Picker.Item label="English" value="English" />
        <Picker.Item label="French" value="French" />
      </Picker></View>
           </View>
            </ImageBackground>
        )
    }
}
;

export default withNavigationFocus(JobBasicType);