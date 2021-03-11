import React, {
  PureComponent
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
  View,ScrollView,
} from 'react-native';
import {
  withNavigationFocus
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
  Background,
  sort,
  filter,
  TRANLINE,
  overlayimage,
  rightWrongBack,
  rite,
  FontBold,
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
  NavigationHead
} from '../Component/ViewManager.js';
import CreateJobIndexButton from '../Component/CreateJobIndexButton'
import ItemMV from '../src/ItemMV';
import DeviceInfo from 'react-native-device-info';
import JobBasicType from './JobBasicType';
import JobPreference from './JobPreference';
import JobTaskDescription from './JobTaskDescription';
import JobTaskRequirement from './JobTaskRequirement';
import JobHiddenCritearia from './JobHiddenCritearia';
import CompanyEditEducation from './CompanyEditEducation';
import CompanyAddSalary from './CompanyAddSalary';
import CompanyAddSkillJob from './CompanyAddSkilJob';
import CompanyAddLanguage from './CompanyAddLanguage';


import PreviewJob from './PreviewJob';
import Swiper from 'react-native-swiper';
import http from '../api';

// import PostedJobList from './PostedJobList';
// import styles from './Style'

class CreateJob extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Type: true,
      flagInterView: false,
      flagMatches: false,
      index: 0,
    };
  }

  back = () => {
    console.log('hey back');
    if (this.state.index > 0) this.refs.swiper.scrollBy(-1);
  };
  Back = () => {
    this.props.navigation.goBack();
  };

  Exit = () => {
    this.props.navigation.navigate('AdminDashboard');
  };
  next = () => {
    if (this.state.index < 8) {this.refs.swiper.scrollBy(1);
      this.state.index == 3 && this.myScroll.scrollTo({ x: wp(100), animated: true });
    }
  };
  callApi = () => {
    try {
      http
        .POST('api/appjob/add', {
          companyId: global.Id,
          minExp: global.minYear,
          maxExp: global.maxYear,
          Job_title: global.Job_Title,
          Company: global.Company,
          Anywhere: global.Anywhere || false,
          salMin: global.minSalary,
          salMax: global.maxSalary,
          salRating: global.salaryrating,
          Job_Location: global.City,
          FullTime: global.FullTime,
          PartTime: global.PartTime,
          Employed: global.Employed,
          Internship: global.Internship,
          StudentJobs: global.StudentJobs,
          HelpingVacancies: global.HelpingVacancies,
          Freelancer: global.Freelancer,
          jobEnd: global.End_date,
          City: global.City || [],
          Task_Description: global.Task_Description,
          Task_Description_Req: global.Task_Description_Req,
          Skill: global.addSkill,
          Education: global.Education,
          LanguageSkill: global.LanguageSkill,
          latitude: global.let,
          longitude: global.long,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              console.log('rrrrrrrrr', res['data']['result']);
              global.City = [];
              this.props.navigation.navigate('AdminDashboard');
              // this.callPostedJob();
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  };

  callPostedJob = () => {
    try {
      http.GET('api/job/get').then(
        (res) => {
          if (res['data']['status']) {
            console.log(
              '>>>>>>>>>>>>',
              JSON.stringify(res['data']['result'][3]['description']),
            );
          } else {
            console.log('res', res);
            alert(res[0]['data']['message']['message']);
          }
        },
        (err) => alert(JSON.stringify(err)),
      );
    } catch (error) {
      console.log('error while register' + error);
    }
  };
  componentDidMount() {
    this.callPostedJob();
  }
  render() {
    const {
      index
    } = this.state;
    return (
      <View style={styles.backGround}>
        <StatusBar hidden={true} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHead
            centerComponent={
              this.state.index != 8 ? 'Create Job' : 'Preview Job'
            }
            rightComponent="Exit"
            onPress={() => this.Back()}
            onExit={() => this.Exit()}
          />
          <View
            style={{
              // height: hp(100) - hp(5),
              height:hp(100)-100 ,
              // width: wp(96),
              marginHorizontal: wp(2)
              // top: hp(4),
            }}>
            <Swiper
              // showsButtons={true}
              ref={'swiper'}
              dotColor={themeColor}
              index={index}
              onIndexChanged={(index) =>
                this.setState({
                  index: index,
                })
              }
              paginationStyle={{
                top: hp(-90)+50
                // position: 'absolute',
              }}>
              <View>
                <JobBasicType />
              </View>
              <View>
                <JobPreference />
              </View>
              <View>
                <JobTaskDescription />
              </View>
              <View>
              <JobTaskRequirement/>
              </View>
              <View>
                <CompanyAddSkillJob />
              </View>
              <View>
                <CompanyAddSalary />
              </View>
              <View>
                <CompanyEditEducation />
              </View>
              <View>
                <CompanyAddLanguage />
              </View>
              <View>
                <PreviewJob />
              </View>
            </Swiper>
            <View
              style={{
                flexDirection: 'row',
                width: wp(100),
                justifyContent:"space-between",
                // top: hp(76) - hp(5),
                bottom:70,
                position: 'absolute',
                zIndex: 999,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  width: wp(20),
                  marginLeft: wp(10),
                }}>
                <TouchableOpacity
                  style={styles.Size}
                  onPress={this.back}
                  hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                  <View style={styles.Size}>
                    <Text
                      style={[
                        styles.FontSty,

                        {
                          fontSize: scale(22),
                          color:themeColor
                        }
                      ]}>
                      {this.state.index == 8 ? '' : <Text>Back</Text>}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  // right: wp(7),
                  width: wp(20),
                  marginRight: wp(10),
                }}>
                <TouchableOpacity
                  onPress={this.next}
                  hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                  <View>
                    <Text
                      style={[styles.FontSty,
                        {
                          fontSize: scale(22),
                          color:themeColor
                        }
                      ]}
                      numberOfLines={1}>
                      {this.state.index == 7? (
                        <Text numberOfLines={1}>Preview</Text>
                      ) : this.state.index == 8 ? (
                        ''
                      ) : (
                        <Text>Next</Text>
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
          </View>
          <View
            style={{
              bottom: 40,
              height: hp(6),
              width: wp(100),elevation:20,backgroundColor:"white"
              // left: wp(-2),
            }}>
             
              {this.state.index < 8 ? (
                <ScrollView 
                 horizontal={true} contentContainerStyle={{justifyContent:"center",alignItems:'center'}}
                 ref={(ref) => {
            this.myScroll = ref
          }}>
                <CreateJobIndexButton name='Type' index={this.state.index == 0 && this.state.index}/>
                <CreateJobIndexButton name='Preferences' index={this.state.index == 1 && this.state.index}/>
                <CreateJobIndexButton name='Description' index={this.state.index == 2 && this.state.index}/>
                <CreateJobIndexButton name='Requirements' index={this.state.index == 3 && this.state.index}/>
                <CreateJobIndexButton name='Skills' index={this.state.index == 4 && this.state.index}/>
                <CreateJobIndexButton name='Salary' index={this.state.index == 5 && this.state.index}/>
                <CreateJobIndexButton name='Education' index={this.state.index == 6 && this.state.index}/>
                <CreateJobIndexButton name='Language' index={this.state.index == 7 && this.state.index}/>
                <CreateJobIndexButton name='Preview' index={this.state.index == 8 && this.state.index}/>
                </ScrollView>
              ) : (
                <View
                  style={{
                    height: hp(6),
                    width: wp(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableWithoutFeedback onPress={this.callApi}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={rite}
                        style={{
                          height: scale(30),
                          width: scale(30),
                          marginRight: scale(5),
                        }}
                        resizeMode={'contain'}
                      />
                      <Text
                        style={{
                          fontSize: scale(22),
                          fontFamily: FontBold,
                          color: themeColor,
                        }}>
                        Go Live
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default CreateJob;