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
import SuggestionView from '../Component/SuggestionView'
import ListOfChoosed from '../Component/ListOfChoosed'
var mg = [];
import Texting from '../Constant/Text'

class JobPreference extends Component {
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
  renderItem = (item,) => {
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
  render() {
    const {
      
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
                width: wp(70),
                height: scale(40),
                borderBottomWidth:1,
                borderColor:"#eee",
                alignItems: 'center',
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
                  borderBottomWidth:1,
                borderColor:"#eee",
                  width: wp(70),
                  height: scale(40),
                  marginTop: hp(2),
                  alignItems: 'center',
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
                    <SuggestionView onPress={() => this.suggestionTag(elements, index)} 
                    elements={elements} index={index} />
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
                <ListOfChoosed style={{
                    marginTop: scale(2),
                  }} data={this.state.city} renderItem={({item, index}) => this.renderItem(item, index)} />
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
            <Texting
                style={{
                  left: scale(15),
                  fontSize: scale(15),
                  fontFamily: FontRegular,
                  color: '#333',alignItems:"flex-start",
                  fontWeight: 'bold',marginBottom:5,
                }} text='Select_Experience'/>
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
                {this.state.minYear} <Texting text='Min_Exp' />
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
                <Texting text='Max_Exp'/> {this.state.maxYear}y+
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

export default withNavigationFocus(JobPreference);
// {this.state.lang && this.state.lang.map(({item, key}) => {
//                return (
//                    <Picker.Item label = {this.state.lang ? item.title : ''} value = {this.state.lang ? item.title : ''} key={key} />
//                )
//            })}