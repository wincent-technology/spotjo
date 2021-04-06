import React, {
    Component
  } from 'react';
  import {
    StatusBar,
    TextInput,
    View,
  } from 'react-native';
  import {
    withNavigationFocus
  } from 'react-navigation';
  import {
    scale
  } from '../src/Util';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../Component/responsive-ratio';
  import {
    themeWhite,
  } from '../Constant/index';
  
  import Texting from '../Constant/Text'
  class JobTaskRequirement extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: '',
        requiremnt: '',
      };
    }
  
    handleChange1 = (text) => {
      console.log('textArea', text);
      this.setState({
        requiremnt: text,
      });
      global.Task_Description_Req = this.state.requiremnt;
    };
  
    onKeyPress = (e) => {
      if (e.nativeEvent.key == "Enter")
        {
            
         
        }
  }
  
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
              <Texting
                style={{
                  fontSize: scale(18),
                  fontFamily: 'Roboto-Bold',
                  color: '#333',
                }} text='Task_Requirements'/>
                
            </View>
            <View
              style={{
                marginTop: hp(0),
              }}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                placeholder= {global.language == 'english' ? "Requirements" : 'Requirements'}
                style={{
                  height: hp(60),
                  width: wp(80),
                  marginBottom: 1,
                  backgroundColor: '#eee',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  textAlignVertical: 'top',
                }}
                onChangeText={(text) => this.handleChange1(text)}
              />
            </View>
          </View>
        </>
      );
    }
  }
  
  export default withNavigationFocus(JobTaskRequirement);
