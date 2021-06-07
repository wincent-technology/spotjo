import React, {
  PureComponent
} from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,ScrollView,
  Keyboard
} from 'react-native';
import styles from '../src/Style';
import {
  themeColor,
  themeWhite,
  Background,
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
import {
  NavigationHead
} from '../Component/ViewManager.js';
import CreateJobIndexButton from '../Component/CreateJobIndexButton'
import JobBasicType from './JobBasicType';
import JobPreference from './JobPreference';
import JobTaskDescription from './JobTaskDescription';
import JobTaskRequirement from './JobTaskRequirement';
import CompanyEditEducation from './CompanyEditEducation';
import CompanyAddSalary from './CompanyAddSalary';
import CompanyAddSkillJob from './CompanyAddSkilJob';
import CompanyAddLanguage from './CompanyAddLanguage';
import PreviewJob from './PreviewJob';
import JobSalaryType from './JobSalaryType'
import Swiper from 'react-native-swiper';
import http from '../api';
import Texting from '../Constant/Text'
class CreateJob extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Type: true,
      flagInterView: false,
      flagMatches: false,
      index: 0,
      groom :false
    };
  }

  back = () => {
    console.log('hey back',this.state.index);
    if (this.state.index > 0) this.refs.swiper.scrollBy(-1);
  };
  Back = () => {
    this.props.navigation.goBack();
  };

  Exit = () => {
    this.props.navigation.navigate('AdminDashboard');
  };
  next = () => {
    console.log('global',global.Job_Title)
    
    if (this.state.index < 9) {this.refs.swiper.scrollBy(1);
      this.state.index == 3 && this.myScroll.scrollTo({ x: wp(100), animated: true });
    }
  };

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  callApi = () => {
    try {
      http
        .POST('api/appjob/add', {
          companyId: global.Id,
          minExp: global.minYear,
          maxExp: global.maxYear,
          Job_title:  global.Job_Title + '(m/v/d)',
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

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      groom: true,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      groom: false,
    });
  };

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
              this.state.index != 9 ? 'Create Job' : 'Preview Job'
            }
            rightComponent="Exit"
            onPress={() => this.Back()}
            onExit={() => this.Exit()}
          />
          <View
            style={{
              flex:1,
              marginHorizontal: wp(2)
            }}>
            <Swiper
              ref={'swiper'}
              dotColor={'lightgray'}
              index={this.state.index}
              activeDotColor={themeColor}
              onIndexChanged={(index) =>
                this.setState({
                  index: index,
                })
              }
              paginationStyle={{
                position: "absolute", top: 0, bottom: undefined
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
                <JobSalaryType />
              </View>
              <View>
                <PreviewJob />
              </View>
            </Swiper>
            {!this.state.groom && <View
              style={{
                flexDirection: 'row',
                width: wp(100),
                justifyContent:"space-between",
                bottom:hp(10),
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
                          fontSize: hp(3),
                          color:themeColor
                        }
                      ]}>
                      {this.state.index == 9 ? '' : <Texting text='Back'/>}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: 'center',
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
                          fontSize: this.state.index == 8 ? hp(2.5) : hp(3),
                          color:themeColor
                        }
                      ]}
                      numberOfLines={1}>
                      {this.state.index == 8? (
                        <Texting  style = {{
                          fontSize: hp(2.5),
                          color:themeColor
                        }} numberOfLines={1} text='Preview'/>
                      ) : (
                        <Texting 
                        style = {{
                          fontSize: hp(3),
                          color:this.state.index == 9 ? themeWhite : themeColor
                        }}
                        text='Next' />
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>}
          </View>
          <View>
          </View>
          {/* </ScrollView> */}
          {!this.state.groom && <View
            style={{
              bottom: 45,
              height: hp(5.5),
              width: wp(100),elevation:20,backgroundColor:"white"
              // left: wp(-2),
            }}>
             
              {this.state.index < 9 ? (
                <ScrollView 
                 horizontal={true} contentContainerStyle={{justifyContent:"center",alignItems:'center'}}
                 ref={(ref) => {
            this.myScroll = ref
          }}>
                <CreateJobIndexButton name='Type' index={this.state.index == 0 && this.state.index} tps={true}/>
                <CreateJobIndexButton name='Preferences' index={this.state.index == 1 && this.state.index}/>
                <CreateJobIndexButton name='Description' index={this.state.index == 2 && this.state.index}/>
                <CreateJobIndexButton name='Requirements' index={this.state.index == 3 && this.state.index}/>
                <CreateJobIndexButton name='Skills' index={this.state.index == 4 && this.state.index}/>
                <CreateJobIndexButton name='Salary' index={this.state.index == 5 && this.state.index}/>
                <CreateJobIndexButton name='Education' index={this.state.index == 6 && this.state.index}/>
                <CreateJobIndexButton name='Language' index={this.state.index == 7 && this.state.index}/>
                <CreateJobIndexButton name='SalaryType' index={this.state.index == 8 && this.state.index}/>
                <CreateJobIndexButton name='Preview' index={this.state.index == 9 && this.state.index}/>
                </ScrollView>
              ) : (
                <View
                  style={{
                    height: hp(5.5),
                    width: wp(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableWithoutFeedback onPress={this.callApi}>
                    <View
                      style={{
                        flexDirection: 'row',marginTop:hp(-0.5)
                      }}>
                      <Image
                        source={rite}
                        style={{
                          height: hp(3.5),
                          width: hp(3.5),
                          marginRight: scale(5),
                        }}
                        resizeMode={'contain'}
                      />
                      <Texting
                        style={{
                          fontSize: hp(3),
                          fontFamily: FontBold,
                          color: themeColor,
                        }} text='Go_Live'/>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}
          </View>}
        </ImageBackground>
      </View>
    );
  }
}

export default CreateJob;