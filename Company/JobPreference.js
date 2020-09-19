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
import http from '../api';


class JobBasicType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            show1: false,
            currentDate: Date.now(),
            Start_date: Date.now(),
            End_date: Date.now(),
            selectedValue: 'City',
            selectedValue1: 'Languages',
            lang: [],
            city: [],

        };
    }
    onChange = (event, selectedDate) => {
        this.setState({
            Start_date: selectedDate
        });
        global.Start_date = selectedDate

    };
    onChange1 = (event, selectedDate) => {
        this.setState({
            End_date: selectedDate
        });
        global.End_date = selectedDate

    };
    next = () => {
        this.props.navigation.navigate('TabScreen')
    }

    setSelectedValue = (selectedValue) => {
        this.setState({
            selectedValue: selectedValue
        })
        global.city = selectedValue

    }

    componentDidMount() {
        try {
            http.GET('api/applanguage/get').then((res) => {
                if (res['data']['status']) {
                    //            //will get data in this    res['data']['result']             
                    // console.log('res>>>>>>>>>>>>>>lang', res['data']['result']);
                    this.setState({
                        lang: res['data']['result']
                    })
                } else {
                    console.log('res', res);
                    alert(res['data']['message']['message']);
                }
            }, err => alert(JSON.stringify(err)));

            http.GET('api/appcity/get').then((res) => {
                if (res['data']['status']) {
                    //            //will get data in this    res['data']['result']             
                    // console.log('res>>>>>>>>>>>>>>lang', res['data']['result']);
                    this.setState({
                        city: res['data']['result']
                    })
                } else {
                    alert(res['data']['message']['message']);
                }
            }, err => alert(JSON.stringify(err)));


        } catch ( error ) {
            console.log("error while register" + error);
        }



    }

    setSelectedValue1 = (selectedValue) => {
        this.setState({
            selectedValue1: selectedValue
        })
        global.Language = selectedValue

    }
    render() {
        const {FullTime, PartTime, Employed, Internship, StudentJobs, HelpingVacancies, Freelancer, name, show, show1} = this.state
        const PickerItem = this.state.lang !== "" ? (
            this.state.lang.map((item, id) => {
                return <Picker.Item key = {item.id} label={item.title} value={item.title}/>
            })) : (
            <Picker.Item label={item.title} value={item.title}/>
            )
        const CityItem = this.state.lang !== "" ? (
            this.state.city.map((item, id) => {
                return <Picker.Item key = {item.id} label={item.title} value={item.title}/>
            })) : (
            <Picker.Item label={item.title} value={item.title}/>
            )

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
            }}><CustomInput placeholder = {'start Date'} textChange = {(text) => this.setState({
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
            onSubmitEditing={() => this.setState({
                // show: !this.state.show
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
            onSubmitEditing={() => this.setState({
                // show1: !this.state.show1
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
            onChange={this.onChange1}
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
            >{CityItem}
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
            }}
            onValueChange={(itemValue, itemIndex) => this.setSelectedValue1(itemValue)}
            >{PickerItem}
      </Picker></View>
           </View>
            </ImageBackground>
        )
    }
}
;

export default withNavigationFocus(JobBasicType);
// {this.state.lang && this.state.lang.map(({item, key}) => {
//                return (
//                    <Picker.Item label = {this.state.lang ? item.title : ''} value = {this.state.lang ? item.title : ''} key={key} />
//                )
//            })}