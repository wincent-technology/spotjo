import React, {
    Component,
    useState
} from 'react';
import {
    SafeAreaView,
    StatusBar,
    ImageBackground,
    FlatList,
    Text,
    Image,
    TextInput,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
    leftVid,
    play,
    library
} from '../src/IconManager';
import {
    scale,
    snack
} from '../src/Util'
import {
    themeColor,
    themeWhite,
    TRANLINE
} from '../Constant/index'
import {
    Rating,
    NavigationHead
} from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
    FontBold,
    FontRegular,
    Background,
    interViewBack,
    cal,
    clock,
    workExp
} from '../Constant/index'
import ItemMV from './ItemMV'
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input'

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
class EditWorkExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            sum: [],
            fromDate: 'From',
            toDate: 'To',
            Start_date: Date.now(),
            from: false,
            to: false,
            EduTitle: '',
            EduUni: '',
        }
    }

    static navigationOptions = ({
        navigation
    }) => ({
        tabBarVisible: true,
        animationEnabled: true
    })
    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }
    save = () => {
        console.log('sum', this.state)
        global.Experience = this.state.sum;
        // let ni = this.state.array
        // var sumy = ni.reduce(function(a, b) {
        // return a + b;
        // }, 0);
        // console.log('summy', sumy)
        try {
            http.POST('api/user/editworkexp', {
                id: global.Id,
                workexp: global.Experience,
                // totalExp: 1
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('responce user', res['data']['result'])
                    this.props.navigation.navigate('JobEditProfile');
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']))
        } catch (error) {
            console.log(error)
        }
    }
    ads = () => {
        const {
            EduTitle,
            EduUni,
            fromDate,
            toDate,
            sum
        } = this.state
        let i = sum || [];

        i.push({
            'heading': EduTitle.toUpperCase(),
            'Company': EduUni.toUpperCase(),
            'From': fromDate,
            'To': toDate
        })
        this.setState({
            sum: i,
            show: !this.state.show,
            fromDate: '',
            toDate: '',
            EduTitle: '',
            EduUni: '',
        })

    }
    componentDidMount() {
        this.setState({
            sum: global.Experience
        });
    }

    Add = () => {
        this.setState({
            show: true
        })
    }
    remove = (item, index) => {
        console.log(index, item);
        const {
            sum
        } = this.state;
        let m = sum
        for (let i in m) {
            if (m[i].heading == item) {
                m.splice(i, 1)
            }
        }
        this.setState({
            sum: m,
        })
    }
    //function to add TextInput dynamically

    onChange = (event, selectedDate) => {

        // console.log('select date', new Date(selectedDate).toLocaleDateString());
        if (selectedDate === undefined) {
            this.setState({
                from: !this.state.from
            })
            return;
        } else {
            this.setState({
                fromDate: monthNames[new Date(selectedDate).getMonth()] + ' ' + new Date(selectedDate).getFullYear(),
                from: !this.state.from,
            });
        }
    };
    onChange1 = (event, selectedDate) => {
        if (selectedDate === undefined) {
            this.setState({
                to: !this.state.to
            })
            return;
        } else {
            this.setState({
                toDate: monthNames[new Date(selectedDate).getMonth()] + ' ' + new Date(selectedDate).getFullYear(),
                to: !this.state.to,
            });
        }
    };

    dateDiffInDays = (i, g) => {
        console.log(i, g);
        const a = i
        const b = g
        // global.CompanyExp = Math.floor(b - a)
        return Math.floor(b - a)
    }
    getValues = () => {
        console.log('Data', this.state.inputData);
    }

    render() {
        const {
            from,
            to,
            show
        } = this.state
        // console.log("sum", this.state.sum)
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
            <NavigationHead centerComponent='Work Experience' rightComponent="Save" onPress={() => this.Back()} onExit={() => this.save()}/>
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
                borderColor: 'gray',
                borderWidth: wp(0.6),
                alignItems: "center",
                backgroundColor: themeWhite,
                left: wp(30.5),
                top: wp(-11),
            }}><View><Image source={workExp} style={{
                height: scale(60),
                width: scale(60)
            }} resizeMode={'contain'}/></View></View>
            <View style={{
                alignItems: "center",
                top: hp(-4)
            }}><Text style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>Edit Work Experience</Text></View>
            {show && (<ImageBackground style={{
                width: wp('91%'),
                marginHorizontal: wp(2.3),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(7)),
                position: "absolute",zIndex:scale(50)
            }} source={interViewBack} resizeMode={'stretch'}>
            <View style={{
                zIndex: 1,
                top: scale(15),
                right: scale(15),
                height: scale(25),
                width: scale(25),
                position: "absolute",
            }}><TouchableWithoutFeedback onPress={() => this.setState({
                show: !this.state.show
            })}>
            <View style={{
                height: scale(25),
                width: scale(25),
                zIndex: 1
            }}  hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
            }}>
            <Icon2 name={'clear'} size={scale(20)} color={'#fff'}/></View>
            </TouchableWithoutFeedback>
            </View>
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
            }}>Add Experience</Text></View>
            <View style={{
                marginTop: hp(6)
            }}><CustomInput placeholder = {'Work Experience'} value={this.state.EduTitle} textChange = {(text) => this.setState({
                EduTitle: text
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
            /></View>
             <View style={{
                marginTop: hp(2)
            }}><CustomInput placeholder = {'Company'} value={this.state.EduUni}textChange = {(text) => this.setState({
                EduUni: text
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
            /></View>
             <View style={{
                marginTop: hp(2)
            }}>
            <View style={{
                backgroundColor: themeColor,
                width: wp(70),
                height: scale(40),
                borderColor: themeColor,
                alignItems: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
                flexDirection: "row"
            }} onStartShouldSetResponder={() => this.setState({
               from: !this.state.from
            })}><View  style={{
                marginLeft: scale(20),
                width: wp(50),
                alignItems: "flex-start"
            }}><Text style={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}>{this.state.fromDate}</Text></View>
            <View style={{
                marginLeft: scale(10),
                width: scale(20),
                height: scale(20),
                alignItems: "flex-end",
                justifyContent: "center",
                alignItems: "center"
            }}>
    <Image source={cal} style={{
                height: scale(20),
                width: scale(20)
            }}resizeMode={'contain'} /></View>
            </View></View>
            <View style={{
                marginTop: hp(2)
            }}>
            <View style={{
                backgroundColor: themeColor,
                width: wp(70),
                height: scale(40),
                borderColor: themeColor,
                alignItems: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
                flexDirection: "row"
            }} onStartShouldSetResponder={() => this.setState({
                to: !this.state.to
            })}><View  style={{
                marginLeft: scale(20),
                width: wp(50),
                alignItems: "flex-start"
            }}><Text style={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}>{this.state.toDate}</Text></View>
            <View style={{
                marginLeft: scale(10),
                width: scale(20),
                height: scale(20),
                alignItems: "flex-end",
                justifyContent: "center",
                alignItems: "center"
            }}>
    <Image source={cal} style={{
                height: scale(20),
                width: scale(20)
            }}resizeMode={'contain'} /></View>
            </View></View>
            {from && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.Start_date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            />
            )}{to && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.Start_date}
            mode={'date'}
            is24Hour={false}
            display="default"
            onChange={this.onChange1}
            />
            )}
            <View style={{
                top: hp(5)
            }}><TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.ads}>
            <View  style={{
                height: scale(40),
                width: scale(250),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: themeColor,
                borderRadius: scale(5)
            }}><Text style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeWhite,
                fontWeight: 'bold',
            }}>Add Now</Text></View>
            </TouchableWithoutFeedback></View>
           </View>
            </ImageBackground>)}
            <View style={{
                alignItems: "flex-end",
                right: wp(10),
                top: hp(-2)
            }}><CustomButton title={'Add Experience'}
            onPress={this.Add}
            containerStyle={{
                width: wp(30),
                color: 'black',
            // fontFamily: FontRegular
            }}
            buttonStyle={{
                backgroundColor: themeColor,
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
            extraData={this.state.sum}
            data = {this.state.sum}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMV
                item={item}
                index={index}
                remove={this.remove}
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

export default withNavigationFocus(EditWorkExperience);



// <View style={{
//                        width: wp(80),
//                        alignItems: "center",
//                        justifyContent: "space-around",
//                        marginHorizontal: wp(2),
//                        flexDirection: 'row',
//                        marginVertical: scale(5),

//                    }}>
//        <TouchableWithoutFeedback onPress={this.hourly(index)}>
//        {library(this.state.Hourly[index]['text'] ? 'check-box' : 'check-box-outline-blank', 25, themeWhite)}
//        </TouchableWithoutFeedback>
//        </View>