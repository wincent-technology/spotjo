import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Text,
    Image,
    View,
} from 'react-native';
import {
    withNavigationFocus,
    NavigationEvents
} from 'react-navigation';
import styles from '../src/Style';
import {
    left,
    library,
    icon,
    play,
    leftVid
} from '../src/IconManager';
import {
    themeColor,
    themeWhite,
    home,
    place,
    screen,
    edit,
    earth,
    dollor,
    user,
    bag,
    Background,
    sort,
    filter,
    TRANLINE,
    url,
    avtar,
    FontBold,
    cal,
    clock,
    interViewBack
} from '../Constant/index';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
    scale,
    snack
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Rating,
    NavigationHeader
} from '../Component/ViewManager.js';
// import ItemMV from './ItemMV'
import Swiper from 'react-native-deck-swiper'
import http from '../api'
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input'
import DateTimePicker from '@react-native-community/datetimepicker';



class UserPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            id: '',
            status: '',
            jobId: '',
            comId: '',
            userId: '',
            show: false,
            show1: false,
            currentDate: Date.now(),
            interviewDate: 'Interview Date',
            interviewTime: 'Interview Time',
            dark: false,
        }
    }

    checking = () => {
        const {
            params
        } = this.props.navigation.state;
        const item = params ? params.item : null;
        // console.log('other item', item.workexp[0].heading);
        this.setState({
            data: global.ig,
            id: params.index,
            status: params.status
        })
    }
    Back = () => {
        this.props.navigation.navigate('Admin');
    };


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
                interviewDate: new Date(selectedDate).toLocaleDateString()
            });
            // global.Start_date = new Date(selectedDate).toLocaleDateString()
        }
    }
    onChange1 = (event, selectedDate) => {
        let minute,
            hour;
        minute = new Date(selectedDate).getMinutes();
        hour = new Date(selectedDate).getHours();
        minute = minute > 10 ? minute : '0' + minute;
        hour = hour <= 12 ? hour + ':' + minute + ' ' + 'am' : hour - 12 + ':' + minute + ' ' + 'pm';

        console.log('event', event, new Date(selectedDate).getHours(), new Date(selectedDate).getMinutes())
        if (selectedDate === undefined) {
            this.setState({
                show1: !this.state.show1
            })
            return;
        } else {
            this.setState({
                show1: !this.state.show1,
                interviewTime: hour
            });
        }

    };
    Shadule = () => {
        const {
            jobId,
            comId,
            userId,
            interviewDate,
            interviewTime
        } = this.state;

        try {
            http.POST('api/schedule/interview', {
                companyId: global.Id,
                userId: userId,
                jobId: jobId,
                intDate: interviewDate,
                intTime: interviewTime
            }).then((res) => {
                if (res['data']['status']) {
                    snack(res['message'])
                    console.log('res...interview. 255.', res['data']['result'])
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']))
        } catch (error) {
            snack("error while register" + error)
        }
        this.setState({
            dark: !this.state.dark
        })
    }

    jaaveda = (status, item) => {
        console.log('hi')
        let Matched = [],
            Shortlisted = [],
            Interested = [],
            NotInterested = [],
            Rejected = [];

        console.log('status', status, item);
        try {
            http.POST('api/applyjob/comdec', {
                id: item,
                status: status
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('res.....', res['data']['result'])
                } else {
                    snack(res['data']['message'])
                }
            }, err => snack(err['message']))
        } catch (error) {
            snack("error while register" + error)
        }
    }

    onSwiped = (type, index) => {
        console.log(`on swiped ${type}`, index)
        console.log(global.ig[index])
        const status = global.ig[index]['status']
        const item = global.ig[index]['appid'];
        this.setState({
            id: index
        })
        console.log('index', index, status);
        if (index >= global.ig.length - 1) {
            console.log('hey');
            this.setState({
                fleg: !this.state.fleg
            })
        }

        if (type == 'left') {
            if (status == null) {
                // alert('NotInterested')
                // this.setState({
                //   left: true
                // })
                this.jaaveda('Not Interested', item);
            } else if (status == 'Matched') {
                // alert('rejected')
                // this.setState({
                //   left: false
                // })
                this.jaaveda('Rejected', item);
            }
        } else if (type == 'right') {
            if (status == null) {
                this.jaaveda('Interested', item);
            } else if (status == 'Matched') {
                for (let i in this.state.data) {
                    if (item == this.state.data[i].appid)
                        console.log('dfsdf', this.state.data)
                    this.setState({
                        jobId: this.state.data[i].jobId,
                        comId: this.state.data[i].comId,
                        userId: this.state.data[i].id,
                        dark: !this.state.dark
                    });
                }
            }
        } else if (type == 'top') {
            if (status == null) {
                this.jaaveda('Matched', item);
            } else if (status == 'Matched') {
                this.jaaveda('Shortlisted', item);
            } else if (status == 'Shortlisted') {
                this.jaaveda('Matched', item);
            }
        } else if (type == 'bottom') {
            if (status == 'Matched')
                this.jaaveda('Selected', item);
            // alert(' Short Listed ' + item)    }

        }
    }
    renderCard = (data, index) => {
        console.log('data>>>>>>>>?????????', data);
        return <ScrollView style={{
                alignSelf: "stretch",
            }}>
   <ImageBackground style={{

                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
                overflow: 'hidden'
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
  <View style={styles.CompanyProfileImageSize}>
    <Image
            source = {data.profile ? {
                uri: url + 'images/user/' + data.profile
            } :
                avtar
            }
            style={styles.imageStyle}
            resizeMode={'stretch'}
            />
  </View>
  <View style={styles.CompanyProfileSecongImage}>
    <Image
            source = {data.profile ? {
                uri: url + 'images/user/' + data.profile
            } :
                avtar
            }
            style={styles.imageStyle}
            resizeMode={'cover'}
            />
  </View>
  <View style={styles.CompanyProfileDetail}>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={home} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1} numberOfLines={1}>
        {data.first_name} {data.last_name}
      </Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={user} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>Employed</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={screen} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.Company}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={edit} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text
            style={{
                marginLeft: scale(10),
            }}>
        {data.skills != null && data.skills.map((item, index) => {
                console.log('item', item.name)
                return (
                    <Text key={index}
                    style={styles.ItemDetailLabel1}>
              {item.name} /
            </Text>
                );
            })}
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
         <Image source={bag} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.totalExp == 1 ? 0 : data.totalExp - 1} - {data.totalExp} Years / 
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={place} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {data.place} /
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={dollor} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.minSal} - {data.maxSal},000$</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.CompanyDetailProfileIcon}>
        <Image source={earth} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{data.email}</Text>
    </View>
  </View>
</ImageBackground>
        </ScrollView>
    }


    render() {
        const {
            data,
            dark,
            show1,
            show,
            id,
            left
        } = this.state
        console.log('this.state', this.state.status)
        return <SafeAreaView style={styles.backGround}>
            <NavigationEvents onDidFocus={this.checking}/>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHeader onPress={() => this.Back()} text={data.heading}/>
       <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - {data.length}</Text>
           </View>
            <View style={styles.JobListUpperButtonView}><TouchableWithoutFeedback>
            <View style={[{
                marginRight: scale(15)
            }, styles.JobListUpperButtonIcon]}>
            <Image source ={sort} style={{
                height: scale(20),
                width: scale(16)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Sort</Text>
            </View>
            </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={this.Filter}>
            <View style={styles.JobListUpperButtonIcon}>
            <Image source ={filter} style={{
                height: scale(19),
                width: scale(14),
                marginTop: scale(1)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Filter</Text>
            </View>
            </TouchableWithoutFeedback>
   </View></View><View style={styles.CompanyProfileMainImage1}>
       {!this.state.fleg ? (<Swiper
            ref={swiper => {
                this.swiper = swiper
            }}
            cardStyle={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
            }}
            // overlayOpacityHorizontalThreshold={10}
            // overlayOpacityVerticalThreshold={10}
            backgroundColor={'transparent'}
            cardHorizontalMargin={0}
            cardVerticalMargin={0}
            onSwiped={(index) => this.onSwiped('general',index)}
            onSwipedLeft={(index) => this.onSwiped('left', index)}
            onSwipedRight={(index) => this.onSwiped('right', index)}
            onSwipedTop={(index) => this.onSwiped('top', index)}
            onSwipedBottom={(index) => this.onSwiped('bottom', index)}
            cards={global.ig}
            cardIndex={id}
            stackSize={2}
            showSecondCard={true}
            renderCard={this.renderCard}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            overlayLabels={this.state.status == null ? {
                left: {
                    title:'Not Interested',
                    style: {
                        label: {
                            borderColor: 'red', color: 'red', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },
                right: {
                    title: 'Interested',
                    style: {
                        label: {
                            borderColor: 'green', color: 'green', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },
                top: {
                    title: 'Matched',
                    style: {
                        label: {
                            borderColor: '#fcba03', color: '#fcba03', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                             // marginTop: (hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)))/2,
                              // marginLeft: -48, 
                        }
                    }
                }
            } : this.state.status =='Matched' ? {
              bottom: {
                    title: 'Selected',
                    style: {
                        label: {
                            borderColor: themeColor, color: themeColor, borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },
                left: {
                    title:'Rejected',
                    style: {
                        label: {
                            borderColor: 'red', color: 'red', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },
                right: {
                    title: 'interview',
                    style: {
                        label: {
                            borderColor: 'green', color: 'green', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                        }
                    }
                },
                top: {
                    title: 'Shortlisted',
                    style: {
                        label: {
                            borderColor: '#fcba03', color: '#fcba03', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                             // marginTop: (hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)))/2,
                              // marginLeft: -48, 
                        }
                    }
                }
            }: this.state.status =='Shortlisted' ? {
                top: {
                    title: 'Matched',
                    style: {
                        label: {
                            borderColor: '#fcba03', color: '#fcba03', borderWidth: 5,
                             fontSize: 32, borderRadius: 5, textAlign: 'center'
                        },
                        wrapper: {
                            flexDirection: 'column', alignItems: 'center',
                             justifyContent: 'center',
                             // marginTop: (hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)))/2,
                              // marginLeft: -48, 
                        }
                    }
                }
            } : {}}
            /> ) :(<View  style = {{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop:(hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)))/2,
                    marginHorizontal:wp(20),
                    position:"absolute"
                }}>
            <Text style={{
                    textAlign: 'center',
                    fontFamily: FontBold,
                    color: themeWhite,
                    fontSize: scale(18),
                    width: wp(60)
                }}>No More Jobs...😞</Text><NavigationEvents onDidFocus={this.checking}/>
            </View>)}
            {dark && (<ImageBackground style={{
               width: wp('90%'),
                height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(7)),
                marginHorizontal: wp(2.7),
            }} source={interViewBack} resizeMode={'stretch'}>
            <View style={{
                zIndex: 1,
                top: scale(15),
                right: scale(15),
                height: scale(25),
                width: scale(25),
                position: "absolute",
            }}><TouchableWithoutFeedback onPress={() => this.setState({
                dark: !this.state.dark
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
            }}>Schedule InterView</Text></View>
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
            }}>{this.state.interviewDate}</Text></View>
            <View style={{
                marginLeft: scale(20),
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
                show1: !this.state.show
            })}><View  style={{
                marginLeft: 10,
                width: wp(50),
                alignItems: "flex-start"
            }}><Text style={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}>{this.state.interviewTime}</Text></View>
            <View style={{
                marginLeft: scale(20),
                width: scale(20),
                height: scale(20),
                alignItems: "flex-end",
                justifyContent: "center",
                alignItems: "center"
            }}>
    <Image source={clock} style={{
                height: scale(20),
                width: scale(20)
            }}resizeMode={'contain'} /></View>
            </View></View>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.currentDate}
            mode={'date'}
            is24Hour={true}
            display="spinner"
            onChange={this.onChange}
            />
            )}{show1 && (
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.currentDate}
            mode={'time'}
            is24Hour={false}
            display="default"
            onChange={this.onChange1}
            />
            )}
            <View style={{
                top: hp(22)
            }}><TouchableWithoutFeedback style={styles.OpportunityView} onPress={this.Shadule}>
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
            }}>Schedule Now</Text></View>
            </TouchableWithoutFeedback></View>
           </View>
            </ImageBackground>)}
        </View>
         <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
        </ImageBackground>
      </SafeAreaView>

    }
}

export default withNavigationFocus(UserPro);