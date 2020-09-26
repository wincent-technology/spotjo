import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, FlatList, Text, Image, View, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, leftVid } from '../src/IconManager';
import { scale, snack } from '../src/Util'
import { themeColor, themeWhite, TRANLINE, educationCap } from '../Constant/index'
import { Rating, NavigationHead } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { FontBold, FontRegular, Background } from '../Constant/index'
import ItemMV from './ItemMV'
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../api';


var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

class EditEducation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            textInput: [],
            textCompany: [],
            textExp: [],
            inputData: [],
            sum: [],
            fromDate: [],
            toDate: [],
            Start_date: Date.now(),
            End_date: Date.now(),
            from: false,
            to: false,
        };
    }

    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }

    componentDidMount() {
        console.log(UserEducation);
        this.setState({
            sum: global.UserEducation || []
        });
    }
    save = () => {
        global.UserEducation = this.state.sum;
        try {
            http.POST('api/user/editeducation', {
                id: global.Id,
                education: global.UserEducation
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('responce user', res['data']['result'])
                    this.props.navigation.navigate('JobEditProfile');
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']))
        } catch ( error ) {
            snack(error)
        }
    // alert('video is coming soon');
    // alert('video is coming soon');
    // global.UserEducation = this.state.sum;
    // this.props.navigation.navigate('JobEditProfile');
    }
    Add = () => {
        this.setState({
            show: true
        })
    }
    addTextInput = (index) => {

        let textInput = this.state.textInput;

        textInput.push(<View style={styles.TextInputAddExpView}><TextInput style={styles.TextInputAddExp}
        onChangeText={(text) => this.addValues(text, index)}
        placeholderTextColor={'#fff'}
        placeholder={'Enter Title'}/>

        <TextInput style={styles.TextInputAddExp}
        onChangeText={(text) => this.addValuesComp(text, index)}
        placeholderTextColor={'#fff'}
        placeholder={'Enter University Name'}/>
        <View style={{
            width: wp(80),
            alignItems: "center",
            justifyContent: "space-around",
            marginHorizontal: wp(2),
            flexDirection: 'row',
            marginVertical: scale(5),

        }}>
        <View style={{
            backgroundColor: themeColor,
            width: wp(39),
            height: scale(40),
            borderColor: themeWhite,
            alignItems: "center",
            borderWidth: scale(1),
            borderRadius: scale(5),
            flexDirection: "row"
        }}>
        <TouchableWithoutFeedback onPress={() => this.setState({
            from: !this.state.from
        })}><View  style={{
            marginLeft: 10,
            width: wp(50),
            alignItems: "flex-start"
        }}><Text style={{
            color: 'white',
            fontSize: scale(16),
            fontFamily: "Roboto-Bold",
            fontWeight: "bold"
        }}>From : {new Date(this.state.Start_date).toLocaleDateString()}</Text></View></TouchableWithoutFeedback>
            </View>
            <View style={{
            backgroundColor: themeColor,
            width: wp(39),
            height: scale(40),
            borderColor: themeWhite,
            alignItems: "center",
            borderWidth: scale(1),
            borderRadius: scale(5),
            flexDirection: "row"
        }}>
        <TouchableWithoutFeedback onPress={() => this.setState({
            to: !this.state.to
        })}><View  style={{
            marginLeft: 10,
            width: wp(50),
            alignItems: "flex-start"
        }}><Text style={{
            color: 'white',
            fontSize: scale(16),
            fontFamily: "Roboto-Bold",
            fontWeight: "bold"
        }}>To : {new Date(this.state.End_date).toLocaleDateString()}</Text></View></TouchableWithoutFeedback>
            </View>
            
            </View>
            
        </View>);
        this.setState({
            textInput
        });
    }
    onChange = (event, selectedDate) => {

        if (selectedDate === undefined) {
            this.setState({
                from: !this.state.from
            })
            return;
        } else {
            let dataArray = this.state.fromDate;
            let checkBool = false;
            if (dataArray.length !== 0) {
                dataArray.forEach(element => {
                    if (element.index === index) {
                        element.text = text;
                        checkBool = true;
                    }
                });
            }
            if (checkBool) {
                this.setState({
                    fromDate: dataArray
                });
            } else {
                // dataArray.push(text);
                dataArray.push({
                    'text': monthNames[new Date(selectedDate).getMonth()] + ' ' + new Date(selectedDate).getFullYear()
                });

                this.setState({
                    fromDate: dataArray,
                    from: !this.state.from,
                    // Start_date: new Date(selectedDate).toLocaleDateString()


                });
            }
        }

    };
    onChange1 = (event, selectedDate) => {
        if (selectedDate === undefined) {
            this.setState({
                to: !this.state.to
            })
            return;
        } else {
            let dataArray = this.state.toDate;
            let checkBool = false;
            if (dataArray.length !== 0) {
                dataArray.forEach(element => {
                    if (element.index === index) {
                        element.text = text;
                        checkBool = true;
                    }
                });
            }
            if (checkBool) {
                this.setState({
                    toDate: dataArray
                });
            } else {
                // dataArray.push(text);
                dataArray.push({
                    'text': monthNames[new Date(selectedDate).getMonth()] + ' ' + new Date(selectedDate).getFullYear(),
                });

                this.setState({
                    toDate: dataArray,
                    to: !this.state.to,
                    End_date: new Date(selectedDate).toLocaleDateString()
                });
            }
        }

    };
    addValues = (text, index) => {
        let dataArray = this.state.inputData;
        let checkBool = false;
        if (dataArray.length !== 0) {
            dataArray.forEach(element => {
                if (element.index === index) {
                    element.text = text;
                    checkBool = true;
                }
            });
        }
        if (checkBool) {
            this.setState({
                inputData: dataArray
            });
        } else {
            // dataArray.push(text);
            dataArray.push({
                'text': text,
                'index': index
            });

            this.setState({
                inputData: dataArray
            });
        }
    }
    addValuesComp = (text, index) => {
        let dataArray = this.state.textCompany;
        let checkBool = false;
        if (dataArray.length !== 0) {
            dataArray.forEach(element => {
                if (element.index === index) {
                    element.text = text;
                    checkBool = true;
                }
            });
        }
        if (checkBool) {
            this.setState({
                textCompany: dataArray
            });
        } else {
            dataArray.push({
                'text': text,
                'index': index
            });

            // dataArray.push(text);
            this.setState({
                textCompany: dataArray
            });
        }
    }

    AddValueData = () => {
        // console.log('hello')
        let inputData = this.state.inputData;
        let textCompany = this.state.textCompany;
        let fromDate = this.state.fromDate;
        let toDate = this.state.toDate;

        let sum = this.state.sum || [];
        console.log("length", inputData.length, textCompany.length)
        if (inputData.length == textCompany.length == fromDate.length == toDate.length) {
            console.log("158")
            for (let i = 0; i < inputData.length; i++) {
                console.log('input', inputData[i]['text'])
                sum.push({
                    'heading': inputData[i]['text'],
                    'Company': textCompany[i]['text'],
                    'From': fromDate[i]['text'],
                    'To': toDate[i]['text']
                })
            }

            if (sum)
                this.setState({
                    sum: sum,
                    from: false,
                    to: false,
                    show: false,
                });
        }
    }


    render() {
        const {Hourly, Monthly, Yearly} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
            <NavigationHead centerComponent='Education' rightComponent="Save" onPress={() => this.Back()} onExit={() => this.save()}/>
                    <ImageBackground style={{
                width: wp('96%'),
                marginHorizontal: wp(2),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(5)),
                top: wp(15)
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
            <View style={{
                justifyContent: "flex-end",
                flexDirection: 'column',
                height: wp(22),
                width: wp(35),
                borderRadius: scale(20),
                borderColor: themeColor,
                borderWidth: wp(0.6),
                alignItems: "center",
                backgroundColor: themeWhite,
                left: wp(30.5),
                top: wp(-11),
            }}><View><Image source={educationCap} style={{
                height: scale(60),
                top: hp(-0.3),
                width: scale(100)
            }} resizeMode={'cover'} /></View></View>
            <View style={{
                alignItems: "center",
                top: hp(-4)
            }}><Text style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>Edit Education</Text></View>
            <Modal isVisible = {this.state.show}
            onBackButtonPress = {() => this.setState({
                show: false
            })}
            onBackdropPress={() => this.setState({
                show: false
            })}
            ><View style = {{
                height: hp(60),
                width: '96%',
                alignSelf: 'center',
                backgroundColor: '#fff',
                borderRadius: 25
            }}>
            {this.state.from && (
            <DateTimePicker
            testID="dateTimePicker"
            value={new Date(new Date(this.state.Start_date).toLocaleDateString())}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            />
            )}{this.state.to && (
            <DateTimePicker
            testID="dateTimePicker"
            value={new Date(new Date(this.state.End_date).toLocaleDateString())}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange1}
            />
            )}
            <ScrollView style={{
                // alignSelf: "stretch",
                // height: hp(70),
                // marginBottom: scale(20)
            }} nestedScrollEnabled>
            {this.state.textInput.map((value) => {
                return value
            })}
           </ScrollView>
            <View style={{
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-around",
            }}><CustomButton title={'Add'}
            onPress={() => this.addTextInput(this.state.textInput.length)}
            containerStyle={{
                width: wp(30),
                color: 'black',
                justifyContent: "center",
                alignItems: "center"
            // fontFamily: FontRegular
            }}
            buttonStyle={{
                backgroundColor: themeColor,
                width: wp(30),
                height: '33%',
                borderRadius: scale(2),
                borderWidth: 0
            }}
            titleStyle={{
                color: themeWhite,
                position: 'absolute',
                fontFamily: FontBold,
                fontSize: scale(12),
            }}
            /><CustomButton title={'done'}
            onPress={this.AddValueData}
            containerStyle={{
                width: wp(30),
                color: 'black',
                justifyContent: "center",
                alignItems: "center"
            // fontFamily: FontRegular
            }}
            buttonStyle={{
                backgroundColor: themeColor,
                width: wp(30),
                height: '33%',
                borderRadius: scale(2),
                borderWidth: 0
            }}
            titleStyle={{
                color: themeWhite,
                position: 'absolute',
                fontFamily: FontBold,
                fontSize: scale(12),
            }}
            /></View>
            </View>
                </Modal>
            <View style={{
                alignItems: "flex-end",
                right: wp(10),
                top: hp(-2)
            }}><CustomButton title={'Add Education'}
            onPress={this.Add}
            containerStyle={{
                width: '25%',
                color: 'black',
            // fontFamily: FontRegular
            }}
            buttonStyle={{
                backgroundColor: themeColor,
                height: '33%',
                borderRadius: scale(2),
                borderWidth: 0,
                elevation: 5
            }}
            titleStyle={{
                color: themeWhite,
                position: 'absolute',
                fontFamily: FontRegular,
                fontSize: scale(12),
            }}
            /></View>
          <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-22),
                height: hp('50%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
            <View style={{
                borderBottomWidth: scale(1),
                borderBottomColor: '#eee',
                width: '90%',
                alignItems: "center"
            }}/>
            <FlatList
            nestedScrollEnabled={true}
            style={{
                backgroundColor: themeWhite
            }}
            data = {this.state.sum}
            extraData={this.state.sum}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMV
                item={item}
                index={index}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('4%'),
                offset: hp('4%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
            </View></ImageBackground>
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
                </ImageBackground></SafeAreaView>
        )
    }
}

export default withNavigationFocus(EditEducation);