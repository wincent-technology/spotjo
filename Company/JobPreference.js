import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  ImageBackground,
  Dimensions,
  Platform,
  Text,
  Image,
  View,
  TextInput,
  FlatList,
  Picker,
  ScrollView,
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import {
  scale
} from '../src/Util';
import CustomInput from '../Component/Input';
import ToggleSwitch from '../Component/ToggleSwitch';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  switchColor,
  Background,
  themeColor,
  themeWhite,
  iconSearch,
  darkract,
  cal,
  clock,
  FontBold,
  FontRegular,
} from '../Constant/index';
import styles from '../src/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../api';
import {
  play,
  library
} from '../src/IconManager';
import Slider from 'rn-range-slider';
import MultiSelect from 'react-native-multiple-select';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';

var mg = [];

class JobBasicType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show1: false,
      show: false,
      currentDate: Date.now(),
      End_date: 'End Date',
      From_date: 'From Date',
      selectedValue: '',
      minYear: '0',
      maxYear: '20',
      lang: [],
      city: [],
      name: '',
      suggesion: [],
      citys: false,
    };
    this.arrayholder = [];
  }

  onChange1 = (event, selectedDate) => {
    if (selectedDate === undefined) {
      this.setState({
        show1: !this.state.show1,
      });
      return;
    } else {
      this.setState({
        show1: !this.state.show1,
        End_date: new Date(selectedDate).toLocaleDateString(),
      });
      global.End_date = new Date(selectedDate).toLocaleDateString();
    }
  };
  onChange = (event, selectedDate) => {
    if (selectedDate === undefined) {
      this.setState({
        show: !this.state.show,
      });
      return;
    } else {
      this.setState({
        show: !this.state.show,
        From_date: new Date(selectedDate).toLocaleDateString(),
      });
      // global.End_date = new Date(selectedDate).toLocaleDateString()
    }
  };
  next = () => {
    this.props.navigation.navigate('TabScreen');
  };

  setSelectedValue = (selectedValue) => {
    console.log('selectedValue', selectedValue);
    this.setState({
      selectedValue: selectedValue,
    });
    // global.City = selectedValue
  };

  choose(choose) {
    console.log('choose');
    mg.push(choose);
    mg = [...new Set(mg)];
    console.log('sfdsff', mg);
    global.City = mg;
    let mni = [];
    for (let i in mg) {
      if (mg[i] != choose || mg[i] != '') mni.push(mg[i]);
    }
    this.setState({
      suggesion: mni,
      name: '',
      citys: !this.state.citys,
    });
  }
  cheks = (text) => {
    var data = [];
    const newData = this.arrayholder.filter((item) => {
      const itemData =
        item != null &&
        `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
      const textData = text.toUpperCase();
      console.log('itemdata', itemData);
      return itemData != null && itemData.toString().indexOf(textData) > -1;
    });
    for (let i in newData) {
      data.push({
        name: newData[i],
        backGround: 'white',
      });
    }
    if (newData != '') {
      this.setState({
        city: newData,
        name: text,
      });
    } else {
      newData.push(text);
      this.setState({
        city: newData,
        name: text,
      });
    }
  };
  renderItem = (item, index) => {
    return (
      <View
        style={{
          width: wp(80),
          marginLeft: scale(34),
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
                width: wp(68),
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: scale(18),
                  color: themeColor,
                }}>
                {item}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  suggestionTag = (elements, index) => {
    const {
      suggesion,
      city
    } = this.state;
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
  componentDidMount() {
    try {
      http.GET('api/applanguage/get').then(
        (res) => {
          if (res['data']['status']) {
            //            //will get data in this    res['data']['result']
            // console.log('res>>>>>>>>>>>>>>lang', res['data']['result']);
            this.setState({
              lang: res['data']['result'],
            });
          } else {
            console.log('res', res);
            alert(res['data']['message']['message']);
          }
        },
        (err) => alert(JSON.stringify(err)),
      );

      http.GET('api/appcity/get').then(
        (res) => {
          if (res['data']['status']) {
            //            //will get data in this    res['data']['result']
            console.log('res>>>>>>>>>>>>>>city', res['data']['result']);

            let mn = [];

            for (let i in res['data']['result'])
              mn.push(res['data']['result'][i]['title']);

            this.setState({
              city: mn,
            });
            this.arrayholder = mn;

            // this.setState({
            //     city: mn
            // })
          } else {
            alert(res['data']['message']['message']);
          }
        },
        (err) => alert(JSON.stringify(err)),
      );
    } catch (error) {
      console.log('error while register' + error);
    }
  }

  // setSelectedValue1 = (selectedValue) => {
  //     this.setState({
  //         selectedValue1: selectedValue
  //     })
  //     global.Language = selectedValue

  // }
  render() {
    const {
      FullTime,
      PartTime,
      Employed,
      Internship,
      StudentJobs,
      HelpingVacancies,
      Freelancer,
      name,
      show,
      selectedValue,
      show1,
      suggesion,
    } = this.state;

    return (
      <>
            <StatusBar hidden={false} backgroundColor={themeColor} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              width: wp(96),
              marginVertical: hp(4),
            }}>
            <Text
              style={{
                fontSize: scale(18),
                fontFamily: 'Roboto-Bold',
                color: '#333',
              }}>
              Job Preferences
            </Text>
          </View>
          <View
            style={{
              marginTop: hp(2),
            }}></View>
          <View
            style={{
              marginTop: hp(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: scale(50),
                alignItems: 'center',
                // backgroundColor: themeColor,
                borderBottomWidth:1,
                borderColor:"#eee",
                marginBottom: hp(2),
                width: wp(70),
              }}>
              <View style={{alignItems: 'center', marginLeft: scale(10)}}>
                <Text
                  style={{
                    color: "#333",
                    fontSize: scale(18),
                    fontWeight: 'bold',
                    fontFamily: FontRegular,
                  }}>
                  Type
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Picker
                  selectedValue={this.state.selectedValue}
                  style={{
                    width: wp(50),
                    height: scale(40),
                    color: '#333',
                    fontSize: scale(22),
                    fontWeight: 'bold',
                    fontFamily: FontRegular,
                    left: scale(15),
                    transform: [
                      {
                        scaleX: 1.1,
                      },
                      {
                        scaleY: 1.1,
                      },
                    ],
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setSelectedValue(itemValue)
                  }>
                  <Picker.Item label={'Select Job Type'} value={''} />
                  <Picker.Item label={'Limited'} value={'Limited'} />
                  <Picker.Item label={'Unlimited'} value={'Unlimited'} />
                </Picker>
              </View>
            </View>
            <View
              style={{
                // backgroundColor: themeColor,
                width: wp(70),
                height: scale(40),
                // borderColor: themeColor,
                borderBottomWidth:1,
                borderColor:"#eee",
                alignItems: 'center',
                // borderWidth: scale(1),
                borderRadius: scale(5),
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
                  width: wp(50),
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: scale(18),
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 'bold',
                  }}>
                  {this.state.From_date}
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
                  tintColor={themeColor}
                  style={{
                    height: scale(20),
                    width: scale(20),
                  }}
                  resizeMode={'contain'}
                />
              </View>
            </View>
            {selectedValue == 'Limited' && (
              <View
                style={{
                  // backgroundColor: themeColor,
                  borderBottomWidth:1,
                borderColor:"#eee",
                  width: wp(70),
                  height: scale(40),
                  marginTop: hp(2),
                  // borderColor: themeColor,
                  alignItems: 'center',
                  // borderWidth: scale(1),
                  borderRadius: scale(5),
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  this.setState({
                    show1: !this.state.show1,
                  })
                }>
                <View
                  style={{
                    marginLeft: 10,
                    width: wp(50),
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: scale(18),
                      fontFamily: 'Roboto-Bold',
                      fontWeight: 'bold',
                    }}>
                    {this.state.End_date}
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
                    tintColor={themeColor}
                    style={{
                      height: scale(20),
                      width: scale(20),
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </View>
            )}
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                new Date(new Date(this.state.currentDate).toLocaleDateString())
              }
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          )}
          {show1 && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                new Date(new Date(this.state.currentDate).toLocaleDateString())
              }
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onChange1}
            />
          )}
          <ScrollView
            style={{
              width: wp(75),
              height:
                this.state.citys || suggesion != '' ? scale(100) : scale(50),
              borderRadius: scale(5),
              backgroundColor: 'transparent',
              marginTop: hp(2),
              zIndex: 1,
            }}>
            <CustomInput
              placeholder={'City'}

              textChange={(text) => {
                this.setState({
                  citys: text != '' ? true : false,
                });
                this.cheks(text);
              }}
              inputContainerStyle={{
                height: scale(40),
                // backgroundColor: themeColor,
                // width: "100%",
                borderColor: '#eee',
                borderBottomWidth: scale(1),
                borderRadius: scale(5),
              }}
              inputStyle={{
                color: '#333',
                fontSize: scale(18),
                fontFamily: 'Roboto-Bold',
                fontWeight: 'bold',
              }}
              containerStyle={{
                width: wp(75),
              }}
              placeholderTextColor={'#333'}
            />
            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: scale(-15),
                width: wp(75),
                height: suggesion != [] && scale(70),
              }}>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {suggesion &&
                  suggesion.map((elements, index) => (
                    <TouchableWithoutFeedback
                      onPress={() => this.suggestionTag(elements, index)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: scale(30),
                          borderRadius: scale(5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: scale(10),
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          padding: scale(5),
                          marginBottom: scale(2),
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: scale(10),
                          }}>
                          <Text
                            style={{
                              color: themeColor,
                              fontFamily: FontBold,
                            }}>
                            {elements}
                          </Text>
                        </View>
                        <View
                          style={{
                            top: scale(-7),
                            left: scale(5),
                          }}>
                          {library('highlight-off', scale(14), themeColor)}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
              </ScrollView>
            </View>
            {this.state.citys && (
              <View
                style={{
                  width: wp(70),
                  borderRadius: scale(5),
                  height: this.state.city.length != 1 ? hp(12) : hp(6),
                  backgroundColor: '#fff',
                  position: 'absolute',
                  marginLeft: scale(10),
                  top: scale(55),
                  alignItems: 'center',
                }}>
                <FlatList
                  nestedScrollEnabled
                  style={{
                    marginTop: scale(2),
                  }}
                  data={this.state.city}
                  showsHorizontalScrollIndicator={false}
                  removeClippedSubviews={true}
                  renderItem={({item, index}) => this.renderItem(item, index)}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={70}
                  getItemLayout={(data, index) => ({
                    length: hp('1%'),
                    offset: hp('1%') * index,
                    index,
                  })}
                  keyExtractor={(item, index) => index + ''}
                />
              </View>
            )}
          </ScrollView>
          
          <View
            style={{
              width: wp(70),
              height: scale(90),
              // marginTop: hp(1),
              borderRadius: scale(5),
              borderBottomWidth:1,
              borderColor:"#eee",paddingBottom:10,
              // backgroundColor: themeColor,
            }}>
            <Text
                style={{
                  left: scale(15),
                  fontSize: scale(15),
                  fontFamily: FontRegular,
                  color: '#333',alignItems:"flex-start",
                  fontWeight: 'bold',marginBottom:5,
                }}>
               Select Experience
              </Text>
            <View style={{
              justifyContent:"space-between",width:wp(70),flexDirection:"row"
            }}>
              <Text
                style={{
                  // left: scale(15),
                  fontSize: scale(15),
                  fontFamily: FontRegular,
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                {' '}
                {this.state.minYear} Min Exp
              </Text>
              <Text
                style={{
                  // right: scale(5),
                  // position: 'absolute',
                  fontSize: scale(15),
                  fontFamily: FontRegular,
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                Max Exp {this.state.maxYear}y+
              </Text>
            </View>
            <Slider
              style={{
                width: wp(70),
                flex: 1,
                height: scale(10),
                alignSelf: 'center',
                marginTop: scale(-30),
              }}
              gravity={'bottom'}
              floatingLabel
              min={0}
              max={20}
              step={1}
              selectionColor={themeColor}
              blankColor="#333"
              labelBackgroundColor={themeWhite}
              labelTextColor="#333"
              labelBorderColor={themeWhite}
              onValueChanged={(low, high, fromUser) => {
                global.minYear = low;
                global.maxYear = high;
                this.setState({
                  minYear: low,
                  maxYear: high,
                });
              }}
            />
          </View>
        </View>
      </>
    );
  }
}

export default withNavigationFocus(JobBasicType);
// {this.state.lang && this.state.lang.map(({item, key}) => {
//                return (
//                    <Picker.Item label = {this.state.lang ? item.title : ''} value = {this.state.lang ? item.title : ''} key={key} />
//                )
//            })}