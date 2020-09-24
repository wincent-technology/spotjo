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
import { play } from '../src/IconManager'



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
        console.log('select date', new Date(selectedDate).toLocaleDateString());
        if (selectedDate === undefined) {
            this.setState({
                show: !this.state.show
            })
            return;
        } else {

            this.setState({
                show: !this.state.show,
                Start_date: new Date(selectedDate).toLocaleDateString()
            });
            global.Start_date = new Date(selectedDate).toLocaleDateString()
        }

    };
    onChange1 = (event, selectedDate) => {
        if (selectedDate === undefined) {
            this.setState({
                show1: !this.state.show1
            })
            return;
        } else {
            this.setState({
                show1: !this.state.show1,
                End_date: new Date(selectedDate).toLocaleDateString()
            });
            global.End_date = new Date(selectedDate).toLocaleDateString()
        }

    };
    next = () => {
        this.props.navigation.navigate('TabScreen')
    }

    setSelectedValue = (selectedValue) => {
        console.log('selectedValue', selectedValue);
        this.setState({
            selectedValue: selectedValue
        })
        global.City = selectedValue

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
            }}><View style={{
                backgroundColor: themeColor,
                width: wp(70),
                height: scale(40),
                borderColor: themeColor,
                alignItems: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
                flexDirection: "row"
            }} onStartShouldSetResponder={() => this.setState({
                show: !this.state.show
            })}><View  style={{
                marginLeft: 10,
                width: wp(50),
                alignItems: "flex-start"
            }}><Text style={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}>{new Date(this.state.Start_date).toLocaleDateString()}</Text></View>
            <View style={{
                marginLeft: 10,
                width: wp(10),
                alignItems: "flex-end"
            }}>
    {play('calendar-sharp', scale(20), themeWhite)}</View>
            </View></View>
             <View style={{
                marginTop: hp(2)
            }}><View style={{
                backgroundColor: themeColor,
                width: wp(70),
                height: scale(40),
                borderColor: themeColor,
                alignItems: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
                flexDirection: "row"
            }} onStartShouldSetResponder={() => this.setState({
                show1: !this.state.show1
            })}><View  style={{
                marginLeft: 10,
                width: wp(50),
                alignItems: "flex-start"
            }}><Text style={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}>{new Date(this.state.End_date).toLocaleDateString()}</Text></View>
            <View style={{
                marginLeft: 10,
                width: wp(10),
                alignItems: "flex-end"
            }}>
    {play('calendar-sharp', scale(20), themeWhite)}</View>
            </View></View>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={new Date(new Date(this.state.Start_date).toLocaleDateString())}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            />
            )}{show1 && (
            <DateTimePicker
            testID="dateTimePicker"
            value={new Date(new Date(this.state.End_date).toLocaleDateString())}
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
                width: wp(65),
                height: scale(40),
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
                width: wp(65),
                height: scale(40),
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