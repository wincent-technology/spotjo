import React, {
  Component
} from 'react';
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
} from '../Constant/index';
import styles from '../src/Style';
import {
  color
} from 'react-native-reanimated';

class JobTaskDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      requiremnt: '',
    };
  }


  handleChange = (text) => {
    // event.persist();
    console.log('textArea', text);
    // if (text === `\n`)
    // text = '• '

    this.setState({
      name: text ,
    });

    global.Task_Description = this.state.name;
  };

 

  render() {
    return (
      <>
            <StatusBar hidden={false} backgroundColor={themeWhite} />
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
                color: '#333',
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
                height: hp(60),
                width: wp(80),
                marginBottom: 1,
                // borderTopLeftRadius: scale(10),
                // borderTopRightRadius: scale(10),
                backgroundColor: '#eee',
                alignSelf: 'center',
                fontWeight: 'bold',
                textAlignVertical: 'top',
              }}
              value={this.state.name}
              onKeyPress={this.onKeyPress}
              onChangeText={(text) => this.handleChange(text)}
            />
            
          </View>
        </View>
      </>
    );
  }
}

export default withNavigationFocus(JobTaskDescription);


{/* <TextInput
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
                fontWeight: 'bold',
              }}
              onChangeText={(text) => this.handleChange1(text)}
            /> */}