import React, {PureComponent} from 'react';
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
  View,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
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
import {scale, snack} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {Rating, NavigationHead} from '../Component/ViewManager.js';
import ItemMV from '../src/ItemMV';
import DeviceInfo from 'react-native-device-info';
import JobBasicType from './JobBasicType';
import JobPreference from './JobPreference';
import JobTaskDescription from './JobTaskDescription';
import JobHiddenCritearia from './JobHiddenCritearia';
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
    if (this.state.index < 4) this.refs.swiper.scrollBy(1);
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
    const {index} = this.state;
    return (
      <View style={styles.backGround}>
        <StatusBar hidden={true} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <NavigationHead
            centerComponent={
              this.state.index != 4 ? 'Create Job' : 'Preview Job'
            }
            rightComponent="Exit"
            onPress={() => this.Back()}
            onExit={() => this.Exit()}
          />
          <View
            style={{
              height: hp(100) - hp(5),
              width: wp(96),
              marginHorizontal: wp(2),
              top: hp(4),
            }}>
            <Swiper
              // showsButtons={true}
              ref={'swiper'}
              dotColor={themeWhite}
              index={index}
              onIndexChanged={(index) =>
                this.setState({
                  index: index,
                })
              }
              paginationStyle={{
                top: hp(-95),
                position: 'absolute',
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
                <JobHiddenCritearia />
              </View>
              <View>
                <PreviewJob />
              </View>
            </Swiper>
            <View
              style={{
                flexDirection: 'row',
                width: wp(100),
                top: hp(76) - hp(5),
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
                        {
                          fontSize: scale(18),
                        },
                        styles.FontSty,
                      ]}>
                      {this.state.index == 4 ? '' : <Text>Back</Text>}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  // right: wp(7),
                  width: wp(55),
                }}>
                <TouchableOpacity
                  style={styles.Size}
                  onPress={this.next}
                  hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                  <View
                    style={[
                      styles.Size,
                      {
                        alignItems: 'flex-end',
                      },
                    ]}>
                    <Text
                      style={[
                        {
                          fontSize: scale(18),
                        },
                        styles.FontSty,
                      ]}
                      numberOfLines={1}>
                      {this.state.index == 3 ? (
                        <Text numberOfLines={1}>Preview</Text>
                      ) : this.state.index == 4 ? (
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
            <View
              style={{
                bottom: 47,
                height: 5,
                width: '100%',
                position: 'absolute',
              }}>
              <Image
                source={TRANLINE}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />
            </View>
          </View>
          <View
            style={{
              bottom: scale(50) + hp(6),
              height: hp(6),
              width: wp(105),
              left: wp(-2),
            }}>
            <ImageBackground
              source={rightWrongBack}
              style={styles.imageStyle}
              resizeMode={'stretch'}>
              {this.state.index != 4 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp(6),
                    width: wp(103),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableWithoutFeedback>
                    <View
                      style={{
                        flexDirection: 'column',
                        // width: wp(20)
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                            color: this.state.index == 0 ? themeColor : '#000',
                            // textDecorationLine: this.state.index == 0 ? 'underline' : 'none'
                          }}>
                          Type{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                          }}>
                          {'>'}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: scale(1),
                          marginTop: scale(1),
                          width: 'auto',
                          backgroundColor:
                            this.state.index == 0 ? '#000' : '#fff',
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View
                      style={{
                        flexDirection: 'column',
                        // width: wp(20)
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                            color: this.state.index == 1 ? themeColor : '#000',
                            // textDecorationLine: this.state.index == 0 ? 'underline' : 'none'
                          }}>
                          Preferences{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                          }}>
                          {'>'}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: scale(1),
                          marginTop: scale(1),
                          width: 'auto',
                          backgroundColor:
                            this.state.index == 1 ? '#000' : '#fff',
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View
                      style={{
                        flexDirection: 'column',
                        // width: wp(20)
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                            color: this.state.index == 2 ? themeColor : '#000',
                            // textDecorationLine: this.state.index == 0 ? 'underline' : 'none'
                          }}>
                          Description{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                          }}>
                          {'>'}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: scale(1),
                          marginTop: scale(1),
                          width: 'auto',
                          backgroundColor:
                            this.state.index == 2 ? '#000' : '#fff',
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View
                      style={{
                        flexDirection: 'column',
                        // width: wp(20)
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                            color: this.state.index == 3 ? themeColor : '#000',
                            // textDecorationLine: this.state.index == 0 ? 'underline' : 'none'
                          }}>
                          Criteria
                        </Text>
                      </View>
                      <View
                        style={{
                          height: scale(1),
                          marginTop: scale(1),
                          width: 'auto',
                          backgroundColor:
                            this.state.index == 3 ? '#000' : '#fff',
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ) : (
                <View
                  style={{
                    height: hp(6),
                    width: wp(103),
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
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default CreateJob;
