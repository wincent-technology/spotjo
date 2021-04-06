import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {scale, snack} from '../src/Util';
import CustomInput from '../Component/Input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  vw,
  vh,
} from '../Component/responsive-ratio';
import {Background, themeColor, FontBold} from '../Constant/index';
import http from '../api';
import styles from '../src/Style';
import {library} from '../src/IconManager';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import BackNext from '../Component/BackNext'
import SuggestionView from '../Component/SuggestionView'
import Texting from '../Constant/Text'
import ListOfChoosed from '../Component/ListOfChoosed'
var mg = [];
class TalentCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataCheck: [],
      show: false,
      suggesion: [],
    };
    this.arrayholder = [];

    AsyncStorage.setItem('isCompanyLoggedInFirst', false);
  }

  next = () => {
    mg = [...new Set(this.state.suggesion)];
    global.Job_Title = mg;
    this.props.navigation.navigate('LocationCom');
  };

  back = () => {
    this.props.navigation.goBack();
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
      name: '',
      show: !this.state.show,
    });
  };

  componentDidMount() {
    var data = [];
    try {
      http.GET('api/userwejson/get').then(
        (res) => {
          if (res['data']['status']) {
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
  cheks = (text) => {
    var data = [];
    const newData = this.arrayholder.filter((item) => {
      const itemData =
        item != null &&
        `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.toString().indexOf(textData) > -1;
    });
    if (newData != '') {
      this.setState({
        dataCheck: newData,
        name: text,
      });
    } else {
      newData.push(text);
      this.setState({
        dataCheck: newData,
        name: text,
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

  render() {
    const {suggesion, dataCheck} = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={[
                {
                  top: scale(30),
                },
                styles.CenterLogo,
              ]}>
              <View>
                <Image
                  source={require('../Img/logo-spotjo.png')}
                  resizeMode={'contain'}
                  style={{
                    height: scale(150),
                    width: Dimensions.get('window').width / 2 + scale(80),
                  }}
                />
              </View>
              <View
                style={{
                  top: scale(20),
                }}>
                <Texting
                  style={[
                    {
                      fontSize: scale(24),
                      fontFamily: 'Roboto-Bold',
                    },
                    styles.FontSty,
                  ]} text='Which_talent_do_you_want' />
              </View>
              <View
                style={{
                  top: scale(20),
                }}>
                <CustomInput
                  placeholder={global.language == 'english' ? 'E.g (Java Developer)' : 'E.g (Java-Developer)'}
                  value={this.state.name}
                  inputContainerStyle={{borderRadius:scale(20),height:scale(45),width:'92%',backgroundColor:"#fff",borderBottomColor: "#E5E5E5",
        borderBottomWidth: 0.3,}}
                  textChange={(text) => {
                    this.setState({
                      show: text != '' ? true : false,
                    });
                    this.cheks(text);
                  }}
                  inputStyle={{
                    fontWeight: 'bold',
                    fontSize: scale(18),
                    color: themeColor,
                  }}
                  iconStyle={{
                    height: 25,
                    width: 25,
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: scale(1),
                  width: wp(87),
                  height: suggesion != [] && scale(70),
                }}>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {suggesion &&
                    suggesion.map((elements, index) => (
                    <SuggestionView onPress={() => this.suggestionTag(elements, index)} elements={elements} index={index} />
                    ))}
                </ScrollView>
              </View>
              {this.state.show && (
                <View
                  style={{
                    width: wp(87),
                    borderRadius: scale(5),
                    height: dataCheck.length != 1 ? hp(12) : hp(6),
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: scale(260),
                  }}>
                  <ListOfChoosed data={dataCheck} keyboardShouldPersistTaps="always" renderItem={({item, index}) => this.renderItem(item, index)} />
                </View>
              )}
            </View>
            <BackNext onBack={this.back} onNext={this.next} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(TalentCom);
