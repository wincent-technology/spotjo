import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  ImageBackground,
  TextInput,
  Dimensions,
  Text,
  Image,
  View,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {scale} from '../src/Util';
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
} from '../Constant/index';
import styles from '../src/Style';

class JobTaskDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      requiremnt: '',
    };
  }

  next = () => {
    this.props.navigation.navigate('TabScreen');
  };

  handleChange = (text) => {
    // event.persist();
    console.log('textArea', text);
    this.setState({
      name: text,
    });
    global.Task_Description = this.state.name;
  };

  handleChange1 = (text) => {
    // event.persist();
    console.log('textArea', text);
    this.setState({
      requiremnt: text,
    });
    global.Task_Description_Req = this.state.requiremnt;
  };
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
      requiremnt,
    } = this.state;
    return (
      <ImageBackground
        style={{
          width: wp('96%'),
          height: hp('100%') - (StatusBar.currentHeight + 100 + hp(4)),
          // justifyContent: "center",
          // alignItems: 'center'
        }}
        source={darkract}
        resizeMode={'stretch'}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              width: wp(96),
              marginTop: hp(4),
              marginBottom: hp(2),
            }}>
            <Text
              style={{
                fontSize: scale(18),
                fontFamily: 'Roboto-Bold',
                color: themeWhite,
              }}>
              Task Description
            </Text>
          </View>
          <View
            style={{
              marginTop: hp(0),
            }}>
            <TextInput
              multiline={true}
              numberOfLines={10}
              placeholder="Task"
              style={{
                height: hp(30),
                width: wp(72),
                marginBottom: 1,
                borderTopLeftRadius: scale(10),
                borderTopRightRadius: scale(10),
                backgroundColor: 'white',
                alignSelf: 'center',
                textAlignVertical: 'top',
              }}
              onChangeText={(text) => this.handleChange(text)}
            />
            <TextInput
              multiline={true}
              numberOfLines={10}
              placeholder="Requiremnts"
              style={{
                height: hp(30),
                width: wp(72),
                borderBottomLeftRadius: scale(10),
                borderBottomRightRadius: scale(10),
                backgroundColor: 'white',
                alignSelf: 'center',
                textAlignVertical: 'top',
              }}
              onChangeText={(text) => this.handleChange1(text)}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default withNavigationFocus(JobTaskDescription);
