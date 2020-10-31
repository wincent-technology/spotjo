import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  FlatList,
  Text,
  Image,
  View,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {scale, snack} from '../src/Util';
import {
  FontBold,
  iconSearch,
  TRANLINE,
  switchColor,
  themeColor,
  themeWhite,
  Background,
  IC_ARR_UP,
  IC_ARR_DOWN,
  minimumSalary,
  salaryType,
  company,
  skill,
  skillCategory,
  skillLavel,
  Filterjobtype,
  searchType,
  blanks,
  Fulls,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import ToggleSwitch from '../Component/ToggleSwitch';
import CustomInput from '../Component/Input';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
  CheckBox,
  DropDownItem,
  NavigationHead,
  StarRating,
} from '../Component/ViewManager.js';
import http from '../api';
import Itemskill from './Itemskill';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
// import Slider from 'react-native-range-slider'
import Slider from 'rn-range-slider';

var radio_props = [
  {
    label: '  By Distance',
    value: 0,
  },
  {
    label: '  By Location',
    value: 1,
  },
];

var mg = [];

class FilterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Hourly: true,
      Monthly: false,
      Yearly: false,
      ByDistance: false,
      ByLocation: false,
      flag: true,
      name: '',
      company: '',
      addSkill: [],
      FullTime: false,
      PartTime: false,
      salary: 0,
      salaryMax: 150000,
      Employed: false,
      Internship: false,
      StudentJobs: false,
      HelpingVacancies: false,
      Freelancer: false,
      dataCheck: [],
      Trainee: false,
      Novice: false,
      Proficient: false,
      Expert: false,
      suggesion: [],
      show: false,
    };
    this.arrayholder = [];
  }

  save = () => {
    mg = [...new Set(this.state.suggesion)];
    console.log('mg', mg);
    try {
      http
        .POST('api/user/filter', {
          Hourly: this.state.Hourly,
          Monthly: this.state.Monthly,
          Yearly: this.state.Yearly,
          ByDistance: this.state.ByDistance,
          ByLocation: this.state.ByLocation,
          Company: mg,
          skill: this.state.addSkill,
          FullTime: this.state.FullTime,
          PartTime: this.state.PartTime,
          salMin: this.state.salary,
          salMax: this.state.salaryMax,
          Employed: this.state.Employed,
          Internship: this.state.Internship,
          StudentJobs: this.state.StudentJobs,
          HelpingVacancies: this.state.HelpingVacancies,
          Freelancer: this.state.Freelancer,
          location: global.Job_Location,
          Trainee: this.state.Trainee,
          Novice: this.state.Novice,
          Proficient: this.state.Proficient,
          Expert: this.state.Expert,
        })
        .then(
          (res) => {
            console.log('ress', res['data']);
            if (res['data']['status']) {
              console.log('nwe api >>>>>>', res['data']['result']);
              global.all = res['data']['result'];
              // this.props.navigation.navigate('TabScreen', {
              //     otherParam: res['data']['result'],
              // })
              this.props.navigation.goBack();
            } else {
              snack('Data Not Found');
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  };
  Back = () => {
    console.log('hi');
    this.props.navigation.goBack();
  };
  Exit = () => {
    this.props.navigation.goBack();
  };
  addsSkill = (text) => {
    var i = text.toUpperCase();
    let gems = this.state.addSkill;
    // var in =  this.state.addSkill;
    gems.push({
      name: i,
      rating: 1,
    });
    this.setState({
      addSkill: gems,
    });
  };
  handleChange = (value, index) => {
    var arr = [];
    arr = this.state.addSkill;
    arr[index].rating = value;
    this.setState({
      addSkill: arr,
    });
  };

  componentDidMount() {
    let data = [];
    try {
      http.GET('api/appcomjson/get').then(
        (res) => {
          if (res['data']['status']) {
            // for (let i in res['data']['result']) {
            //     data.push({
            //         'name': res['data']['result'][i],
            //         'backGround': 'white'
            //     })
            // }
            // console.log('data', data)
            this.setState({
              dataCheck: res['data']['result'],
            });
            this.arrayholder = res['data']['result'];
            //            //will get data in this    res['data']['result']
          } else {
            snack(res['data']['message']);
          }
        },
        (err) => snack(err['message']),
      );
    } catch (error) {
      snack(error);
    }
  }
  choose = (choose) => {
    console.log('choose');
    mg.push(choose);
    mg = [...new Set(mg)];
    console.log('sfdsff', mg);
    let mni = [];
    for (let i in mg) {
      if (mg[i] != choose || mg[i] != '') mni.push(mg[i]);
    }
    this.setState({
      suggesion: mni,
      company: '',
      show: !this.state.show,
    });
  };
  cheks = (text) => {
    var data = [];
    const newData =
      this.arrayholder &&
      this.arrayholder.filter((item) => {
        console.log('item', item);
        const itemData =
          item != null &&
          `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData != null && itemData.toString().indexOf(textData) > -1;
      });
    // for (let i in newData) {
    //     data.push({
    //         'name': newData[i],
    //         'backGround': 'white'
    //     })
    // }
    if (newData != '') {
      this.setState({
        dataCheck: newData,
        company: text,
      });
    } else {
      newData.push(text);
      this.setState({
        dataCheck: newData,
        company: text,
      });
    }
  };
  suggestionTag = (elements, index) => {
    const {suggesion, dataCheck} = this.state;
    let m = suggesion;
    for (let i in suggesion) {
      if (m[i] == elements) {
        m.splice(i, 1), mg.splice(i, 1);
      }
    }
    this.setState({
      suggesion: m,
    });
  };
  remove = (item, index) => {
    console.log(index, item);
    const {addSkill} = this.state;
    let m = addSkill;
    for (let i in m) {
      if (m[i].name == item) {
        m.splice(i, 1);
      }
    }
    this.setState({
      addSkill: m,
    });
  };
  renderItem = () => {
    let result;
    result = this.state.dataCheck.map((item, index) => (
      <View
        style={{
          width: wp(70),
          marginLeft: scale(44),
        }}>
        <TouchableWithoutFeedback onPress={() => this.choose(item)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                width: wp(60),
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: scale(18),
                  color: themeWhite,
                }}>
                {item}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    ));

    return result;
  };

  render() {
    const {
      suggesion,
      dataCheck,
      show,
      Trainee,
      Novice,
      Proficient,
      Expert,
      Hourly,
      Monthly,
      Yearly,
      ByDistance,
      ByLocation,
      name,
      addSkill,
      Employed,
      Internship,
      StudentJobs,
      HelpingVacancies,
      Freelancer,
      skillCategorylist,
      FullTime,
      PartTime,
    } = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <NavigationHead
            centerComponent="Edit Filter"
            rightComponent="Exit"
            onPress={() => this.Back()}
            onExit={() => this.Exit()}
          />
          <View style={styles.FilterMainView}>
            <ImageBackground
              style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 50 + hp(5)),
              }}
              source={require('../Img/ract.png')}
              resizeMode={'stretch'}>
              <ScrollView
                style={styles.FilterScroll}
                nestedScrollEnabled={true}>
                <DropDownItem
                  style={[
                    styles.FilterDropDown,
                    {
                      marginTop: scale(15),
                    },
                  ]}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={minimumSalary}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Minimum Salary</Text>
                    </View>
                  }>
                  <View style={styles.FilterMinimumSalary}>
                    <View style={styles.FilterMinimumSalaryMin}>
                      <Text style={styles.FilterMinText}>
                        {this.state.salary}
                      </Text>
                      <Text style={styles.FilterMaxText}>
                        {this.state.salaryMax}+
                      </Text>
                    </View>
                    <Slider
                      style={styles.FilterMinimumSalarySlider}
                      gravity={'center'}
                      min={0}
                      max={150000}
                      step={1}
                      selectionColor={themeColor}
                      blankColor="#B0b0b0"
                      labelBackgroundColor={themeColor}
                      labelBorderColor={'#b0b0b0'}
                      onValueChanged={(low, high, fromUser) => {
                        this.setState({
                          salary: low,
                          salaryMax: high,
                        });
                      }}
                      // style={styles.FilterMinimumSalarySlider}
                      // minimumValue={0}
                      // maximumValue={150}
                      // onValueChange={ value => {
                      //     this.setState({
                      //         salary: Math.round(value),
                      //     });
                      // }}
                      // minimumTrackTintColor={themeColor}
                      // maximumTrackTintColor={themeColor}
                    />
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={salaryType}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Salary Type</Text>
                    </View>
                  }>
                  <View style={styles.SalaryTypeView}>
                    <CheckBox
                      selected={Hourly}
                      style={styles.CheckBoxLabel}
                      textStyle={styles.CheckBoxLabelFont}
                      onPress={() => {
                        this.setState({
                          Hourly: !Hourly,
                        });
                      }}
                      text="Hourly"
                    />
                    <CheckBox
                      selected={Monthly}
                      textStyle={styles.CheckBoxLabelFont}
                      style={styles.CheckBoxLabel}
                      onPress={() => {
                        this.setState({
                          Monthly: !Monthly,
                        });
                      }}
                      text="Monthly"
                    />
                    <CheckBox
                      selected={Yearly}
                      textStyle={styles.CheckBoxLabelFont}
                      style={styles.CheckBoxLabel}
                      onPress={() => {
                        this.setState({
                          Yearly: !Yearly,
                        });
                      }}
                      text="Yearly"
                    />
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={company}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Company</Text>
                    </View>
                  }>
                  <View>
                    <CustomInput
                      editable={false}
                      value={this.state.company}
                      placeholder={global.Company}
                      textChange={(text) => {
                        this.setState({
                          show: text != '' ? true : false,
                        });
                        this.cheks(text);
                      }}
                      inputContainerStyle={{
                        backgroundColor: themeColor,
                        // width: "100%",
                        height: scale(40),
                        borderColor: themeColor,
                        justifyContent: 'center',
                        borderWidth: scale(1),
                        borderRadius: scale(5),
                      }}
                      inputStyle={{
                        color: 'white',
                        fontSize: scale(18),
                        fontFamily: 'Roboto-Bold',
                        fontWeight: 'bold',
                      }}
                      placeholderTextColor={themeWhite}
                      containerStyle={{
                        width: wp(85),
                        marginBottom: scale(-17),
                        // position: "absolute"
                      }}
                      iconName={iconSearch}
                      iconStyle={{
                        height: 25,
                        width: 25,
                      }}
                      iconColor={'#fff'}
                    />
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={skill}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Skill</Text>
                    </View>
                  }>
                  <View
                    style={
                      {
                        // width: "80%",
                      }
                    }>
                    <CustomInput
                      placeholder={'Add Skill'}
                      textChange={(text) =>
                        this.setState({
                          name: text,
                        })
                      }
                      inputContainerStyle={{
                        backgroundColor: themeColor,
                        height: scale(40),
                        // width: "100%",
                        borderColor: themeColor,
                        borderWidth: scale(1),
                        borderRadius: scale(5),
                      }}
                      inputStyle={{
                        color: 'white',
                        fontSize: scale(18),
                        fontFamily: 'Roboto-Bold',
                        fontWeight: 'bold',
                      }}
                      containerStyle={{
                        width: wp(85),
                      }}
                      placeholderTextColor={themeWhite}
                      iconName={iconSearch}
                      iconStyle={{
                        height: 25,
                        width: 25,
                      }}
                      iconColor={'#fff'}
                      onSubmitEditing={(event) =>
                        this.addsSkill(event.nativeEvent.text)
                      }
                    />
                    <ScrollView
                      style={{
                        backgroundColor: 'transparent',
                        marginTop: '-5%',
                        marginBottom: 20,
                        height: scale(50),
                      }}
                      contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: wp(80),
                      }}>
                      {this.state.addSkill.map((item, index) => {
                        return (
                          <View style={styles.itemsHiddenView}>
                            <View
                              style={
                                ([styles.itemsHiddenSView],
                                {marginLeft: scale(15)})
                              }>
                              <Icon2
                                name={'highlight-off'}
                                size={scale(20)}
                                color={themeColor}
                                onPress={() => {
                                  this.remove(item.name, index);
                                }}
                              />
                            </View>
                            <View style={styles.itemsHiddenTView}>
                              <Text
                                style={styles.addSkillFont}
                                numberOfLines={1}>
                                {item.name}
                              </Text>
                            </View>
                            <View style={styles.itemsHiddenViewRate}>
                              <StarRating
                                emptyStar={blanks}
                                fullStar={Fulls}
                                // halfStar={'star-half'}
                                iconSet={'MaterialIcons'}
                                disabled={false}
                                maxStars={5}
                                starSize={scale(20)}
                                rating={item.rating}
                                selectedStar={(rating) =>
                                  this.handleChange(rating, index)
                                }
                                fullStarColor={'orange'}
                              />
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={skillCategory}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Skill Category</Text>
                    </View>
                  }>
                  <View
                    style={{
                      marginHorizontal: '1%',
                      top: 10,
                    }}>
                    <ScrollView
                      style={{
                        marginTop: '-5%',
                        marginBottom: 20,
                        // height: scale(50),
                      }}
                      contentContainerStyle={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      nestedScrollEnabled={true}>
                      <View
                        Style={{
                          flex: 1,
                          flexDirection: 'column',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: wp(80),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: wp(35),
                              marginLeft: wp(5),
                            }}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                width: wp(25),
                              }}>
                              <Text
                                style={{
                                  fontSize: scale(16),
                                }}>
                                Employed
                              </Text>
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                width: wp(10),
                              }}>
                              <Icon2
                                name={
                                  Employed
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                                }
                                size={scale(20)}
                                color={themeColor}
                                onPress={() =>
                                  this.setState({
                                    Employed: !this.state.Employed,
                                  })
                                }
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: wp(35),
                              marginLeft: wp(5),
                            }}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                width: wp(25),
                              }}>
                              <Text
                                style={{
                                  fontSize: scale(16),
                                }}>
                                Internship
                              </Text>
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                width: wp(10),
                              }}>
                              <Icon2
                                name={
                                  Internship
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                                }
                                size={scale(20)}
                                color={themeColor}
                                onPress={() =>
                                  this.setState({
                                    Internship: !this.state.Internship,
                                  })
                                }
                              />
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: wp(80),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: wp(35),
                              marginLeft: wp(5),
                            }}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                width: wp(25),
                              }}>
                              <Text
                                style={{
                                  fontSize: scale(16),
                                }}
                                numberOfLines={1}>
                                StudentJobs
                              </Text>
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                width: wp(10),
                              }}>
                              <Icon2
                                name={
                                  StudentJobs
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                                }
                                size={scale(20)}
                                color={themeColor}
                                onPress={() =>
                                  this.setState({
                                    StudentJobs: !this.state.StudentJobs,
                                  })
                                }
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: wp(35),
                              marginLeft: wp(5),
                            }}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                width: wp(25),
                              }}>
                              <Text
                                style={{
                                  fontSize: scale(16),
                                }}>
                                Freelancer
                              </Text>
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                width: wp(10),
                              }}>
                              <Icon2
                                name={
                                  Freelancer
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                                }
                                size={scale(20)}
                                color={themeColor}
                                onPress={() =>
                                  this.setState({
                                    Freelancer: !this.state.Freelancer,
                                  })
                                }
                              />
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: wp(80),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: wp(35),
                              marginLeft: wp(5),
                            }}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                width: wp(25),
                              }}>
                              <Text
                                style={{
                                  fontSize: scale(16),
                                }}
                                numberOfLines={1}>
                                HelpingVacancies
                              </Text>
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                width: wp(10),
                              }}>
                              <Icon2
                                name={
                                  HelpingVacancies
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                                }
                                size={scale(20)}
                                color={themeColor}
                                onPress={() =>
                                  this.setState({
                                    HelpingVacancies: !this.state
                                      .HelpingVacancies,
                                  })
                                }
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={skillLavel}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Skill Level</Text>
                    </View>
                  }>
                  <View
                    Style={{
                      flex: 1,
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(80),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(35),
                          marginLeft: wp(5),
                        }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: wp(25),
                          }}>
                          <Text
                            style={{
                              fontSize: scale(16),
                            }}>
                            Trainee
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            width: wp(10),
                          }}>
                          <Icon2
                            name={
                              Trainee ? 'check-box' : 'check-box-outline-blank'
                            }
                            size={scale(20)}
                            color={themeColor}
                            onPress={() =>
                              this.setState({
                                Trainee: !this.state.Trainee,
                              })
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(35),
                          marginLeft: wp(5),
                        }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: wp(25),
                          }}>
                          <Text
                            style={{
                              fontSize: scale(16),
                            }}>
                            Novice
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            width: wp(10),
                          }}>
                          <Icon2
                            name={
                              Novice ? 'check-box' : 'check-box-outline-blank'
                            }
                            size={scale(20)}
                            color={themeColor}
                            onPress={() =>
                              this.setState({
                                Novice: !this.state.Novice,
                              })
                            }
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(80),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(35),
                          marginLeft: wp(5),
                        }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: wp(25),
                          }}>
                          <Text
                            style={{
                              fontSize: scale(16),
                            }}>
                            Proficient
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            width: wp(10),
                          }}>
                          <Icon2
                            name={
                              Proficient
                                ? 'check-box'
                                : 'check-box-outline-blank'
                            }
                            size={scale(20)}
                            color={themeColor}
                            onPress={() =>
                              this.setState({
                                Proficient: !this.state.Proficient,
                              })
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(35),
                          marginLeft: wp(5),
                        }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: wp(25),
                          }}>
                          <Text
                            style={{
                              fontSize: scale(16),
                            }}>
                            Expert
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            width: wp(10),
                          }}>
                          <Icon2
                            name={
                              Expert ? 'check-box' : 'check-box-outline-blank'
                            }
                            size={scale(20)}
                            color={themeColor}
                            onPress={() =>
                              this.setState({
                                Expert: !this.state.Expert,
                              })
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={Filterjobtype}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Job Type</Text>
                    </View>
                  }>
                  <View
                    style={{
                      width: '80%',
                      marginLeft: '10%',
                      height: scale(50),
                      marginTop: scale(-30),
                      marginBottom: scale(5),
                    }}>
                    <View style={styles.PersonalInfoChoose}>
                      <View style={styles.PersonalInfoRowChoose}>
                        <View
                          style={[
                            styles.PersonalInfoStartChoose,
                            {
                              flexDirection: 'row',
                              width: '40%',
                            },
                          ]}>
                          <Text
                            style={{
                              marginRight: scale(5),
                              fontSize: scale(18),
                              color: '#000',
                            }}>
                            Fulltime
                          </Text>
                          <View style={styles.SwitchView}>
                            <ToggleSwitch
                              isOn={FullTime}
                              onColor={switchColor}
                              offColor="#b4b4b4"
                              size="small"
                              onToggle={(toggle) =>
                                this.setState({
                                  FullTime: toggle,
                                })
                              }
                            />
                          </View>
                        </View>
                        <View
                          style={[
                            styles.PersonalInfoEndChoose,
                            {
                              flexDirection: 'row',
                            },
                          ]}>
                          <Text
                            style={{
                              marginRight: scale(5),
                              fontSize: scale(18),
                              color: '#000',
                            }}>
                            Part-time
                          </Text>
                          <View style={styles.SwitchView}>
                            <ToggleSwitch
                              isOn={PartTime}
                              onColor={switchColor}
                              offColor="#b4b4b4"
                              size="small"
                              onToggle={(toggle) =>
                                this.setState({
                                  PartTime: toggle,
                                })
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </DropDownItem>
                <DropDownItem
                  // key={i}
                  style={styles.FilterDropDown}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View style={styles.FilterDropDownInnerView}>
                      <View style={styles.fliterIcon}>
                        <Image
                          source={searchType}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <Text style={styles.DropDownHeader}>Search Type</Text>
                    </View>
                  }>
                  <View
                    style={[
                      styles.RadioSearchType,
                      {
                        flexDirection: 'row',
                      },
                    ]}>
                    <CheckBox
                      selected={ByDistance}
                      style={styles.CheckBoxLabel}
                      textStyle={styles.CheckBoxLabelFont}
                      onPress={() => {
                        this.setState(
                          {
                            ByDistance: !ByDistance,
                          },
                          () => {
                            this.props.navigation.navigate('UserScreenMap');
                          },
                        );
                      }}
                      text="By Distance"
                    />
                    <CheckBox
                      selected={ByLocation}
                      style={styles.CheckBoxLabel}
                      textStyle={styles.CheckBoxLabelFont}
                      onPress={() => {
                        this.setState({
                          ByLocation: !ByLocation,
                        });
                      }}
                      text="By Location"
                    />
                  </View>
                </DropDownItem>
                <View
                  style={[
                    {
                      marginTop: scale(80),
                    },
                    styles.SaveFilterButton,
                  ]}>
                  <TouchableWithoutFeedback
                    style={[
                      {
                        width: wp('80%'),
                      },
                      styles.SaveFilterButton,
                    ]}
                    onPress={this.save}>
                    <View
                      style={[
                        styles.SaveFilterButtonView,
                        styles.SaveFilterButton,
                      ]}>
                      <Text
                        style={[
                          {
                            fontSize: scale(20),
                          },
                          styles.FontSty,
                        ]}>
                        Save Filter
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
          <View style={styles.TranLingImage}>
            <Image
              source={TRANLINE}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(FilterUser);
