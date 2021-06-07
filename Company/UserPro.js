import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,Dimensions,Linking,Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
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
  company,icons_jobType_blue,skillCategory,workExp,placeIcon,icons_salerytype,mobile,Mail,
  themeWhite,
  homeic,
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
  interViewBack,
  Listed,
  detailed,backgroundCorner,blanks,Fulls,WhiteVideo,facebook,linkedin,whatsapp
} from '../Constant/index';
import ListShow from '../Component/ListShow'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  NoData,
  scale,
  snack
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  StarRating,
  NavigationHeader
} from '../Component/ViewManager.js';
// import ItemMV from './ItemMV'
import Swiper from 'react-native-deck-swiper';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Share from 'react-native-share';
import TopHeader from '../Component/TopHeader';
import ModalSort from '../Component/ModalSort'
const {
  height,
  width
} = Dimensions.get('window');
import Texting from '../Constant/Text'
import { G } from 'react-native-svg';
const wrapper = {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}
import JobSelectId from '../Component/JobSelectId'
import RadioButton from '../Component/Radios'

const LanguageCheck = global.language == 'english' ? true : false


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
      userHeading:'',
      show1: false,
      currentDate: Date.now(),
      interviewDate: 'Interview Date',
      interviewTime: 'Interview Time',
      dark: false,
      fleg:false,
      openModal:false,
      relevance:false,
      Date:false,
      selectedIndex : 0,
      JobSelect : false,
      JobIdSelected:''

    };
  }


  Sort = () => {
    this.setState({
      srt:true,
      openModal:!this.state.openModal

    })
  }

  date = () => {
    this.setState({
      Date:!this.state.Date,
      relevance:false
    })
       let data = this.state.data;
    data = this.state.Date ? data.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1) : data.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1);
    
    this.setState({data,openModal:!this.state.openModal})
    
  }
  relevance = () => {

    this.setState({relevance:!this.state.relevance,Date:false})
    let data = this.state.data;
    if (global.CompanyGuest.length === 0)
    {
    
      alert('please select some skills for relevance search')
      this.props.navigation.navigate('FilterUser')
      
    }
     else
     { 
    data = global.CompanyGuest.map(skill => data.filter(item => item.skills.filter(item => item.english === skill.cell.english)))
    console.log('data',data[0]);
    data = data[0];
     }
    this.setState({data,openModal:false})
  }

  checking = () => {
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    // console.log('other item>>>> 98', global.ig);

    this.setState({
      data: global.ig,
      id: params.index,
      status: params.status,
      fleg: this.state.fleg == true ? !this.state.fleg : this.state.fleg,
    }, () => {
      console.log('id',this.props.navigation.state.params,params.index,global.ig)
      this.swiper.jumpToCardIndex(params.index);
    });
  };
  timeConversion = (a,b,c,d,e) => {
    let result = []
    console.log('a',a,b,c,d,e)
   if (a == 1) result.push('Employed')
   if (b == 1) result.push('FreeLancer')
   if (c == 1) result.push('Helping Vacancies')
   if (d == 1) result.push('Internship')
   if (e == 1) result.push('StudentJob')
  
   result = result.reduce((name,arr,index) => name + (result.length != 1 && index != 0 ? ' / ' + arr : arr),'')
    return result.length ? result : 'Fresher'
  }
  whatsap = (mobile) => {
    if (mobile === '000')
     {alert('Contact Number is not given')
      return}
      else{
  let url =
        "whatsapp://send?text=" +
       '' +
        "&phone=91" +
        mobile;
      Linking.openURL(url)
        .then(data => {
          console.log("WhatsApp Opened successfully " + data);
        })
        .catch(() => {
          alert("Make sure WhatsApp installed on your device");
        });
      }
}

  Back = () => {
    if (this.state.status == 'undefined')
      this.props.navigation.navigate('FirstJobList');
    else this.props.navigation.navigate('Admin');
  };

  onChange = (event, selectedDate) => {
    console.log('select date', new Date(selectedDate).toLocaleDateString());
    if (selectedDate === undefined) {
      this.setState({
        show: !this.state.show,
      });
      return;
    } else {
      this.setState({
        show: !this.state.show,
        interviewDate: new Date(selectedDate).toLocaleDateString(),
      });
      // global.Start_date = new Date(selectedDate).toLocaleDateString()
    }
  };
  onChange1 = (event, selectedDate) => {
    let minute, hour;
    minute = new Date(selectedDate).getMinutes();
    hour = new Date(selectedDate).getHours();
    minute = minute > 10 ? minute : '0' + minute;
    hour =
      hour <= 12 ?
      hour + ':' + minute + ' ' + 'am' :
      hour - 12 + ':' + minute + ' ' + 'pm';

    console.log(
      'event',
      event,
      new Date(selectedDate).getHours(),
      new Date(selectedDate).getMinutes(),
    );
    if (selectedDate === undefined) {
      this.setState({
        show1: !this.state.show1,
      });
      return;
    } else {
      this.setState({
        show1: !this.state.show1,
        interviewTime: hour,
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
      http
        .POST('api/schedule/interview', {
          companyId: global.Id,
          userId: userId,
          jobId: jobId,
          intDate: interviewDate,
          intTime: interviewTime,
          status: 'Interview',
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              snack(res['message']);
              console.log('res...interview. 255.', res['data']['result']);
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack('error while register' + error);
    }
    this.setState({
      dark: !this.state.dark,
    });
  };

  InterviewOperation = (status) => {
    console.log('0000000000000000', status);
    const {
      jobId,
      comId,
      userId
    } = this.state;

    try {
      http
        .POST('api/schedule/interview', {
          companyId: global.Id,
          userId: userId,
          jobId: jobId,
          status: status,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              snack(res['message']);
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack('error while register' + error);
    }
  };

  Filter = () => {
    this.setState({
      fil:true
    })
    this.props.navigation.navigate('FilterUser');
  };

  jaaveda = (status, item) => {
    console.log('status',status)
    if (!global.JobID)
    {
      Alert.alert("INFO", "Please Select job first", [{
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "Yes",
        onPress: () => {
          this.Filter()
        }
      }])
    }
    else{
    console.log('hi');
    let Matched = [],
      Shortlisted = [],
      Interested = [],
      NotInterested = [],
      Rejected = [];

    console.log('status', status, item);
    try {
      http
        .POST('api/applyjob/comdec', {
          id: item,
          status: status,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              console.log('res.....', res['data']['result']);
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack('error while register' + error);
    }
  }
  };

  onSwiped = (type, index) => {
if (this.state.JobSelect){
  // this.setState({JobIdSelected:''})

    console.log(`on swiped ${type}`, index);
    console.log(',,,,', this.state.status);
    const {
      status
    } = this.state;
    const item = global.ig[index]['appid'];
    this.setState({
      id: index,
    });
    if (index >= global.ig.length - 1) {
      this.setState({
        fleg: !this.state.fleg,
      });
    }

    if (type == 'left') {
      if (status == null || status == 'undefined') {
        // alert('NotInterested')
        // this.setState({
        //   left: true
        // })
        this.jaaveda('Rejected', item);
      } else if (status == 'Interview') {
        for (let i in this.state.data) {
          if (item == this.state.data[i].appid)
            console.log('dfsdf inter 262', this.state.data[i]);
          // console.log('dfsdf', this.state.data)
          this.setState({
              jobId: this.state.data[i].jobId,
              comId: this.state.data[i].comId,
              userId: this.state.data[i].userId,
            },
            () => this.InterviewOperation('Rejected'),
          );
        }
      }
    } else if (type == 'right') {
      if (status == null) {
        for (let i in this.state.data) {
          if (item == this.state.data[i].appid)
            console.log('dfsdf null ', this.state.data[i]);
          this.setState({
            jobId: this.state.data[i].jobId,
            comId: this.state.data[i].comId,
            userId: this.state.data[i].id,
            dark: !this.state.dark,
            fleg: !this.state.fleg,
          },()=> {
            this.props.navigation.navigate('ShaduleInterView',{
              jobId:this.state.jobId,
              comId:this.state.comId,
              userId:this.state.userId,
              first_name:this.state.data[i].first_name,
              last_name:this.state.data[i].last_name
            })
          });
        }
      } else if (status == 'Interview') {
        for (let i in this.state.data) {
          if (item == this.state.data[i].appid)
            console.log('dfsdf', this.state.data[i]);
          this.setState({
              jobId: this.state.data[i].jobId,
              comId: this.state.data[i].comId,
              userId: this.state.data[i].userId,
            },
            () => this.InterviewOperation('Selected'),
          );
        }
      } 
      else if (status == null || status == 'undefined') {
        this.jaaveda('Selected', item);
      } 
    } else if (type == 'top') {
      if (status == null || status == 'undefined') {
        this.setState({
            id: index,
          },
          () => this.Sharing(),
        );
      }
    } else if (type == 'bottom') {
      if (status == null  || status == 'undefined') this.jaaveda('Shortlisted', item);
      // alert(' Short Listed ' + item)    }
    }
  }
  else {
    this.setState({JobSelect:true})
  }

  };

  Sharing = async () => {
    let path = url + 'images/user/';
    console.log('path', global.ig[this.state.id].profile);
    let pt = path + global.ig[this.state.id].profile;
    const shareOptions = {
      title: 'Share via',
      subject: 'Spotjo',
      message: `Hey there \n I wish you are interesed in this job please check it \n Name: -${
        global.ig[this.state.id].first_name
      }  ${global.ig[this.state.id].last_name}\n Email: -${
        global.ig[this.state.id].email
      }\n City: -${global.ig[this.state.id].place}\n Mobile: -${
        global.ig[this.state.id].mobile
      }\n Salary: -${global.ig[this.state.id].minSal} - ${
        global.ig[this.state.id].maxSal
      },000 \n`,
      url: pt,
      failOnCancel: false,
    };
    try {
      await Share.open(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };
  renderCard = (data,) => {
    this.setState({userHeading:data.Role})
    return (
      <ScrollView
        style={{
          alignSelf: 'stretch',
        }}>
        <View onStartShouldSetResponder={() => true}>
        <ImageBackground
          style={{
            width: wp('96%'),
            height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
            // paddingBottom:15
          }}
          source={require('../Img/ract.png')}
          resizeMode={'stretch'}>
          <ScrollView removeClippedSubviews={true} 
          style={{height:hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
          alignSelf:"stretch",marginBottom:15}} nestedScrollEnabled = {true}>
          <View style={{
                top: hp(2),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: '#333',
                fontSize: hp(3),
                fontFamily: "Roboto-Bold"
            }}>{data.first_name || 'Unknown'} {data.last_name || 'Unknown'}</Text></View>
            <View style={{
                flexDirection: "row",
                alignItems: "flex-start",alignItems:"center"
            }}>
   <ImageBackground style={{
                marginTop: hp(4),
                marginLeft: wp(7),
                width: wp(28),
                height: wp(28),
                justifyContent: "center",
                alignItems: "center",

                zIndex: 5
            }}
            source={backgroundCorner}><Image 
            source={data.profile
                    ? {
                        uri: url + 'images/user/' + data.profile,
                      }
                    : avtar
                          }
            style={{
                height: wp(26),
                width: wp(26),
                borderRadius:wp(1.5)

            }} resizeMode={'contain'}/></ImageBackground>
            <View style={{
                flexDirection: "column",
                height: wp(27),
                width: wp(50),justifyContent:"center",alignItems:"center",
                marginTop: hp(3) ,marginHorizontal:wp(2)
            }}>
            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('VideoPlayer', {
                vid: url + '/images/user/' + data.video
            })}><View style={{
                flexDirection: "column",
                // height: hp(9),
                width: wp(26),
                alignItems: "center",
                justifyContent: "center"
            }}><Image source={WhiteVideo}  tintColor={themeColor}resizeMode={'contain'} style={{
                height: scale(50),
                width: scale(50),
            }}/><View style={{marginTop:scale(-8)}}><Texting style={{
                color: themeColor,
                fontFamily: "Roboto-Regular",
                fontSize: hp(1.5)
            }} text='Company_Profile' /></View>
            </View></TouchableWithoutFeedback>
            <View style={{height:1,width:wp(40),backgroundColor:"#333",marginVertical:scale(7)}}/>
            <View style={{marginTop:scale(5)}}>
            <StarRating
            emptyStar={blanks}
            starStyle={{marginLeft:5}}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={hp(2.5)}
            rating={global.JobID && global.JobID.length != 0 ? 3 : 0}
            // selectedStar={(rating) => this.handleLanguage(rating, index)}
            fullStarColor={'orange'}
            /></View>
            </View>
            </View>
            <View style={{
                marginLeft: wp(5),
                marginTop: hp(1),
                height: hp(3),
                width: wp(32),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row'
            }}><TouchableOpacity onPress={() => alert('hi facebook')}><Image source={facebook} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7)
            }}/></TouchableOpacity>
            <TouchableOpacity onPress={()=>alert('hi linkedin')}><Image source={linkedin} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7),
                marginHorizontal: wp(1)
            }}/></TouchableOpacity><TouchableOpacity onPress={()=>this.whatsap(data.mobile || '000')}><Image source={whatsapp} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7)
            }}/></TouchableOpacity>
            </View>
          <View style={styles.CompanyProfileDetail}>
          <ListShow name={data.Company || 'Unknown'} image={company} />
          <ListShow name={this.timeConversion(data.isEmployed,data.isFreelancer,data.isHelping,data.isInternship,
      data.isStudentJob)} image={icons_jobType_blue} />
          <ListShow name={data.Role || 'Unknown'} image={skillCategory} />
          <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={workExp}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {data.totalExp != '' && data.totalExp != null
                  ? data.totalExp-1
                  : 0 } 
                 -{ data.totalExp != '' && data.totalExp != null
                  ? data.totalExp
                  : 0 }
                {' '}Years {' '}
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80),backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <ListShow name={data.place || 'Unknown' + ' / 100%'} image={placeIcon} />
                      <ListShow name={data.distinguish == 'Company' ? data.comContact : data.mobile || 'Unknown'} image={mobile} />
                      <ListShow name={data.distinguish == 'Company' ? data.comEmail:data.email || 'Not Avialable'} image={Mail} />
          </View></ScrollView>
        </ImageBackground></View>
        </ScrollView>
    );
  };


  renderItemJob = (item,index) => {
    return <View style={{backgroundColor:themeWhite,height:'auto',width:wp(90),padding:5}}>
        
     <TouchableOpacity style={{height:hp(6),justifyContent:"center",borderBottomWidth:0.5}}>
     <View style={{flexDirection:"row",justifyContent:"space-around"}}>
         <Text style={{width:wp(50),fontFamily:FontBold}} numberOfLines={1}>{item.name}</Text>
         <RadioButton
                             innerColor={themeColor}
                             outerColor={'#afadaf'}
                             animation={'bounceIn'}
                             isSelected={this.state.selectedIndex === index}
                             onPress={() => this.onPress(item,index)}
                         />
     </View>
     </TouchableOpacity>
   </View>
  }

  onPress = ( item,index) =>  {
    this.setState({
      selectedIndex:index,
      JobIdSelected:item.id
    })
    setTimeout(() => {
      this.setState({  JobSelect:false});
    }, 1000);
}

  render() {
    const {
      data,
      dark,
      show1,
      show,
      id,
      left
    } = this.state;
    console.log(global.JobID)
    return (
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />
          <StatusBar hidden={true} backgroundColor={themeWhite} />
          <ModalSort isVisible={this.state.openModal} onBackdropPress={()=>this.setState({openModal:false})} 
          relevance={()=>this.relevance()} bydate={()=> this.date()} date={this.state.Date} rel={this.state.relevance}/>
          <JobSelectId data={global.JobID} nodata={()=> {global.JobID.length == 0 && this.props.navigation.navigate('FilterUser')
          this.setState({JobSelect:false})
          }} isVisible={this.state.JobSelect} renderItem={({item,index}) => this.renderItemJob(item,index)} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text={global.ig && this.state.userHeading}
          />
          <TopHeader data={global.ig && data.length} sort={this.Sort} srtTint={this.state.srt} Filter={this.Filter} detailedTint={true} Listed={() => this.Back()}/>

          {global.ig ? (
            <View style={styles.CompanyProfileMainImage1}>
              {!this.state.fleg ? (
                <Swiper
                  ref={(swiper) => {
                    this.swiper = swiper;
                  }}
                  cardStyle={{
                    width: wp('96%'),
                   flex:1,marginBottom:10
                  }}
                  // overlayOpacityHorizontalThreshold={10}
                  // overlayOpacityVerticalThreshold={10}
                  inputOverlayLabelsOpacityRangeX={[wp(-100) / 3, -1, 0, 1, wp(100) / 3]}
                  inputCardOpacityRangeX={[wp(-75) / 3, -1.5, 0, 1.5, wp(75) / 3]}
                  overlayOpacityHorizontalThreshold={1}
                  backgroundColor={'transparent'}
                  cardHorizontalMargin={0}
                  cardVerticalMargin={0}
                  onSwiped={(index) => this.onSwiped('general', index)}
                  onSwipedLeft={(index) => this.onSwiped('left', index)}
                  onSwipedRight={(index) => this.onSwiped('right', index)}
                  onSwipedTop={(index) => this.onSwiped('top', index)}
                  onSwipedBottom={(index) => this.onSwiped('bottom', index)}
                  cards={global.ig}
                  cardIndex={this.state.id}
                  stackSize={2}
                  showSecondCard={true}
                  renderCard={this.renderCard}
                  animateOverlayLabelsOpacity
                  animateCardOpacity
                  swipeBackCard
                  overlayLabels={
                    this.state.status == null
                      ? {
                          bottom: {
                            title: 'Shortlisted',
                            style: {
                              label: {
                                borderColor: themeColor,
                                color: themeColor,
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          },
                          left: {
                            title: 'rejected',
                            style: {
                              label: {
                                borderColor: 'red',
                                color: 'red',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          },
                          right: {
                            title: 'Interview',
                            style: {
                              label: {
                                borderColor: 'green',
                                color: 'green',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          },
                          top: {
                            title: 'Share',
                            style: {
                              label: {
                                borderColor: '#fcba03',
                                color: '#fcba03',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                               wrapper,
                            },
                          },
                        }
                      : this.state.status == 'undefined'
                      ? {
                          top: {
                            title: 'Share',
                            style: {
                              label: {
                                borderColor: '#fcba03',
                                color: '#fcba03',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                               wrapper,
                            },
                          },
                          left: {
                            title: 'rejected',
                            style: {
                              label: {
                                borderColor: 'red',
                                color: 'red',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          },
                          right: {
                            title: 'Selected',
                            style: {
                              label: {
                                borderColor: 'green',
                                color: 'green',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          },
                          bottom: {
                            title: 'Shortlisted',
                            style: {
                              label: {
                                borderColor: themeColor,
                                color: themeColor,
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          }
                        }
                      : {
                          left: {
                            title: 'rejected',
                            style: {
                              label: {
                                borderColor: 'red',
                                color: 'red',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          },
                          right: {
                            title: 'Selected',
                            style: {
                              label: {
                                borderColor: 'green',
                                color: 'green',
                                borderWidth: 5,
                                fontSize: 32,
                                borderRadius: 5,
                                textAlign: 'center',
                              },
                              wrapper,
                            },
                          },
                        }
                  }
                />
              ) : (
                <NoData text={'No_More_JobSeeker'} />
              )}
            </View>
          ) : (
            <NoData />
          )}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(UserPro);