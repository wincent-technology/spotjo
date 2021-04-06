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

class JobTaskDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      requiremnt: '',
    };
  }


  handleChange = (text) => {
    console.log('textArea', text);
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
            <Texting
              style={{
                fontSize: scale(18),
                fontFamily: 'Roboto-Bold',
                color: '#333',
              }} text='Task_Description'/>
                        </View>
          <View
            style={{
              marginTop: hp(0),
            }}>
            <TextInput
              multiline={true}
              numberOfLines={10}
              placeholder= {global.language == 'english' ? "Task" : 'Task'}
              style={{
                height: hp(60),
                width: wp(80),
                marginBottom: 1,
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