import React, { Component } from 'react';
import { SafeAreaView,TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, Image, View, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale,snack } from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor, themeWhite, cal,clock,FontBold } from '../Constant/index'
import styles from '../src/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import GoogleSignIn from 'react-native-google-sign-in';
import axios from 'axios';

import {
    Rating,
    NavigationHead,
    StarRating
} from '../Component/ViewManager';
import RNCalendarEvents from "react-native-calendar-events";
import http from '../api';

class ShaduleInterview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            id: '',
            status: '',
            jobId: '',
            comId: '',
            userId: '',
            first_name:'',
            last_name:'',
            show: false,
            userHeading:'',
            show1: false,
            currentDate: Date.now(),
            interviewDate: 'Interview Date',
            interviewTime: 'Interview Time',
            date:'',
            dateend:"",user:'',
            dark: false,
          };
    }

    async componentDidMount () {
        console.log('thisprops',this.props.navigation.state.params);
         const {jobId,comId,userId,first_name,last_name} = this.props.navigation.state.params;
        this.setState({
            jobId,comId,userId,first_name,last_name
        })

        const store = await RNCalendarEvents.checkPermissions();
                if (store === 'authorize') {
                console.log('here')
                } else {
                RNCalendarEvents.requestPermissions()
                .then((res) => {
                console.log('here', res)
                if (res === 'authorized') {
                } else {
                console.log('err', res);
                }
                })
                .catch(() => {
                alert('This app needs calendar access');
                });
                        }
    }

    Configure = async() => {
      // await GoogleSignIn.hasPlayServices();

      try {
        await GoogleSignIn.configure({
              // webClientId: '1092597693304-mj60518d625rfgk4m1oufp9dca6g1r1a.apps.googleusercontent.com',
              webClientId:'644805459038-pmhlh0p7uh872r1bhcc6ft4j1f5evmjl.apps.googleusercontent.com',
              scopes: ['https://www.googleapis.com/auth/calendar.events','https://www.googleapis.com/auth/calendar'],
              shouldFetchBasicProfile: true,
              offlineAccess: true
          });
      } catch (error) {
        console.log('errrr',error)
      }
    }

    GoogleSignIn = async() => {
        this.Configure();
        // console.log('res',res);
     const user = await GoogleSignIn.signInPromise();
     console.log('user',user)
     this.setState({user});
     let start = this.state.date.slice(0,-1)
     let hours = new Date(this.state.date).getHours();
      let dm = new Date(new Date(this.state.date).setHours(hours - 5)).toISOString();
     let end = dm && dm.slice(0,-1)
     
console.log('end',end);

     if(this.state.user != ''){
      //  console.log('this',this.state.date.slice(0,-1),end,this.state.user.accessToken)
      const event = {
        subject: 'interView Scheduled for ' + this.state.first_name +' '+ this.state.last_name,
        body: {
          content: 'interView is scheduled for you !'
        },
        start: {
            dateTime: end,
            timeZone: 'Pacific Standard Time'
        },
        end: {
            dateTime: start,
            timeZone: 'Pacific Standard Time'
        },
        location: {
            displayName: global.Address
        },
        attendees: [
          {
            emailAddress: {
              address: user.email,
              name: this.state.first_name +' '+ this.state.last_name
            },
            type: 'required'
          }
        ],
      };
     axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      'summary': 'interView Scheduled for ' + this.state.first_name +' '+ this.state.last_name,
        'description':this.state.first_name + ' ' + this.state.last_name,
        'start': {
          'dateTime': end + '-07:00',
        },
        'end': {
          'dateTime': start + '-07:00',
        },
     },
       {headers: {
           'Authorization': 'Bearer ' + this.state.user.accessToken
       },
      
           }).then(res => {console.log('res>>>>>>>>',res)
            var i = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
        client_id=78055508-f184-40cd-bc71-56a8d908ce16&response_type=code&
        redirect_uri=https://login.microsoftonline.com/common/oauth2/nativeclient
        &response_mode=query&scope=user.read%20mail.read%20Calendars.ReadWrite&prompt=select_account&state=12345`
        this.props.navigation.navigate('Outlook',{
          source:i,event:event
        })

          }).catch(e => console.log('eeeeeeeee',JSON.stringify(e)))
         }



}


    next = () => {
        this.props.navigation.navigate('TabScreen')
    }
    Back = () => {
        this.props.navigation.goBack();
    };
    onChange = (event, selectedDate) => {
        console.log('select date', new Date(selectedDate).toLocaleDateString());
        if (selectedDate === undefined) {
          this.setState({
            show: !this.state.show,
          });
          return;
        } else {
          console.log('dateeeeeee',new Date(selectedDate).toLocaleDateString())
          this.setState({
            show: !this.state.show,
            interviewDate: new Date(selectedDate).toLocaleDateString(),
            date:new Date(selectedDate).toISOString()
          });
          // global.Start_date = new Date(selectedDate).toLocaleDateString()
        }
      };
      onChange1 = (event, selectedDate) => {
        // console.log('select date', new Date(selectedDate).toLocaleDateString());
        // if (selectedDate === undefined) {
        //   this.setState({
        //     show: !this.state.show1,
        //   });
        //   return;
        // } else {
        //   this.setState({
        //     show1: !this.state.show1,
        //     interviewDate: new Date(selectedDate).toLocaleDateString(),
        //     dateend:new Date(selectedDate).toISOString()
        //   });
        //   // global.Start_date = new Date(selectedDate).toLocaleDateString()
        // }

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
          interviewTime,date
        } = this.state;
        // console.log('date',(date).tiIso)
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
                  // console.log('res...interview. 255.', res['data']['result']);
                   let hours = new Date(this.state.date).getHours();
                  let dm = new Date(new Date(this.state.date).setHours(hours - 5)).toISOString();
                  let end = dm
                  RNCalendarEvents.findCalendars()
                            .then((calendars) => {
                                const calendar = calendars.find(cal => (cal.allowsModifications && cal.isPrimary));
                                console.log('calendaer',calendar)
                                if (!calendar) {
                                return;
                                }
                                RNCalendarEvents.saveEvent('InterView Scheduled', {
                                startDate: end,
                                endDate: this.state.date,
                                calendarId: calendar.id,
                                },
                                { sync: true })
                                .then(() => {
                                    this.GoogleSignIn()
                                    
                                    console.log('saved');
                                }).catch(e =>  console.log('e',e))
                            });
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

    render() {
        // const {FullTime, PartTime, Employed, Internship, StudentJobs, HelpingVacancies, Freelancer, name} = this.state
        return (<>
         <NavigationHead
                        centerComponent="Schedule an interview"
                        onPress={() => this.Back()}
                    />
          <View style={{height:1,width:"100%",backgroundColor:'gray',marginTop:10}}/>
                <View
                  style={{
                    width: wp(100),
                    height:
                      hp(100) - 100,
                      justifyContent:"center",alignItems:"center",
                    //   (StatusBar.currentHeight + scale(100) + hp(7)),
                  }}
                  ><View
                        style={{
                          backgroundColor: themeWhite,
                          width: wp(80),
                          height: scale(40),
                          borderBottomColor: '#333',
                          alignItems: 'center',
                          borderBottomWidth: scale(1),
                        //   borderRadius: scale(5),
                          flexDirection: 'row',
                        }}
                        onStartShouldSetResponder={() =>
                          this.setState({
                            show: !this.state.show,
                          })
                        }>
                        <View
                          style={{
                            marginLeft: 10,
                            width: wp(60),
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: '#333',
                              fontSize: scale(18),
                              fontFamily: 'Roboto-Bold',
                              fontWeight: 'bold',
                            }}>
                            {this.state.interviewDate}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: scale(20),
                            width: scale(20),
                            height: scale(20),
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={cal}
                            style={{
                              height: scale(20),
                              width: scale (20),
                            }}
                            tintColor={themeColor}
                            resizeMode={'contain'}
                          />
                        </View>
                      </View>
                    <View
                      style={{
                        marginTop: hp(2),
                      }}>
                      <View
                        style={{
                          backgroundColor: themeWhite,
                          width: wp(80),
                          height: scale(40),
                          borderBottomColor: '#333',
                          alignItems: 'center',
                          borderBottomWidth: scale(1),
                        //   borderRadius: scale(5),
                          flexDirection: 'row',
                        }}
                        onStartShouldSetResponder={() =>
                          this.setState({
                            show1: !this.state.show,
                          })
                        }>
                        <View
                          style={{
                            marginLeft: 10,
                            width: wp(60),
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: '#333',
                              fontSize: scale(18),
                              fontFamily: 'Roboto-Bold',
                              fontWeight: 'bold',
                            }}>
                            {this.state.interviewTime}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: scale(20),
                            width: scale(20),
                            height: scale(20),
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={clock}
                            style={{
                              height: scale(20),
                              width: scale(20),
                            }}
                            tintColor={themeColor}
                            resizeMode={'contain'}
                          />
                        </View>
                      </View>
                    </View>
                    {this.state.show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.currentDate}
                        mode={'date'}
                        is24Hour={true}
                        display="spinner"
                        onChange={this.onChange}
                      />
                    )}
                    {this.state.show1 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.currentDate}
                        mode={'time'}
                        is24Hour={false}
                        display="default"
                        onChange={this.onChange1}
                      />
                    )}
                </View>
                <View style={{
                bottom: 55,
                position: "absolute",width:wp(100),

            }}>
            <TouchableWithoutFeedback onPress={this.Shadule}>
            <View style={{
                marginHorizontal: wp(8),
                borderRadius: 15,height:50,
                justifyContent:"center",alignItems:"center",backgroundColor:themeColor
            }}>
            <Text style={{
                color: themeWhite,
                fontSize: scale(20),
                fontFamily: "Roboto-Bold"
            }}>Schedule Now</Text>
           </View>
            </TouchableWithoutFeedback>
            
            </View>
                </>
        )
    }
}
;

export default withNavigationFocus(ShaduleInterview);