import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  View,Alert
} from 'react-native';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import {scale, snack,HideKeyboard} from '../src/Util';
import CustomInput from '../Component/Input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {Background, themeColor, FontBold, themeWhite} from '../Constant/index';
import http from '../api';
import styles from '../src/Style';
import {library} from '../src/IconManager';
import AsyncStorage from '@react-native-community/async-storage';
import BackNext from '../Component/BackNext';
import SuggestionView from '../Component/SuggestionView';
import Texting from '../Constant/Text';
import ListOfChoosed from '../Component/ListOfChoosed';
var mg = [];

const defaultProps = {
  name: '',
  dataCheck: [],
  show: false,
  suggesion: [],
};

class TalentCom extends Component {
  constructor(props) {
    super(props);
    this.state = defaultProps;
    this.arrayholder = [];


    AsyncStorage.setItem('isCompanyLoggedInFirst', false);
  }


  checking = () => {
    
    // console.log('this.sa',mg)
    let {dataCheck} = this.state;
    global.reset && this.arrayholder.filter(iterm => iterm.right = false);

    this.setState({
      suggesion:global.Job_Title,
      dataCheck
    });
    
    mg = [];
  };

  next = () => {
    mg = [...new Set(this.state.suggesion)];
    global.Job_Title = mg;
    // this.setState({
    //   ...defaultProps,
    // });

    mg = [];
    this.props.navigation.navigate('LocationCom');
    global.reset = false

  };

  back = () => {
    this.props.navigation.goBack();
  };
  renderItem = (item, index) => {
    return (
      <View
        style={{
          width: 'auto',
          flexWrap: 'wrap',
          flexDirection: 'row',
          margin: 2,
        }}>
        <TouchableWithoutFeedback
          onPress={() =>  !item.right
                ? this.choose(item, index)
                : this.suggestionTag(item, index)}>
          <View
            style={{
              alignItems: 'flex-start',
              borderWidth: item.cell != '' ? 1 : 0,
              borderColor: themeColor,
              borderRadius: 10,
              paddingHorizontal: 10,
              width: 'auto',
              backgroundColor: item.right ? themeWhite : 'transparent',
              borderColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp(2.7),
                color: item.right ? themeColor : themeWhite,
                paddingRight:15
              }}>
              {global.language == 'english' ? item.cell && item.cell.english != undefined ? item.cell.english : '' :
               item.cell && item.cell.german != undefined ? item.cell.german : ''}
            </Text>
                {/* <View
                  style={{
                    // top: scale(-7),
                    left: scale(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {item.right && library('highlight-off', hp(2.6), themeColor)}
                </View> */}
          </View>
        </TouchableWithoutFeedback>
      </View>

    );
  };

  choose = (choose) => {
    try{
      if (this.state.suggesion.length >=5 )
      {
        Alert.alert("Detail", "You have added 5 Skill", [{
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
      }, {
          text: "Done",
          onPress: () => this.setState({show:false})
      }], {
          cancelable: false
      });
        return
  
      }
  else{
      mg.push(choose);
      mg = [...new Set(mg)];
      console.log('mg', mg);
      let {dataCheck} = this.state;
      dataCheck.filter((iterm) => {
        if (iterm.cell == choose.cell) iterm.right = true;
      });
      
      let mni = [];
      mg.filter((i) => i.cell != choose.cell || (i != '' && mni.push(i)));
  
      console.log('mg',mg)
      this.setState(
        {
          suggesion: mg,
          name: '',
          dataCheck
          // show: !this.state.show,
        }
      );
  }
  }
  catch (e){
    console.log('e',e);
  }
  };

  // checking = () => {
  //   this.setState({
  //     ...defaultProps,
  //   });
  //   mg = [];
  // };

  componentDidMount() {
    var data = [];
    
    try {
      http.GET('api/skill/get').then(
        (res) => {
          if (res['data']['status']) {
            this.setState({
              dataCheck: res['data']['result'],
            });
            let p = res['data']['result'];
            this.arrayholder = p.map((cell, i) => {
              let temp = {};
              temp = {cell, right: false, rating: 5};
              return temp;
            });
            //will get data in this    res['data']['result']
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
    if (global.role == 'Super Admin'){

    
    try{
      if (text != '') {
     
       if (this.state.suggesion.length >=5)
       {
       c
         return
       }else{
           let newData = this.arrayholder.filter((item) => {
             const itemData = global.language == 'english'
             ? item.cell
               ? item.cell.english
               : `${item}`
             : item.cell
             ? item.cell.german
             : `${item}`;
           const textData = text.toUpperCase();
           return (
             itemData != null &&
             itemData.toUpperCase().toString().indexOf(textData) > -1
           );
           });
     
           newData = newData.filter((item) => !mg.includes(item.cell));
     
           newData = newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
           // console.log('length',newData)
           if (newData.length) {
             this.setState({
               dataCheck: newData,
               name: text,
             });
           } else {
             let d = [{
               'cell' : {
                 'english':text,
                 'german':text  
               },
               'rating':5,
               'right':false
             }]
     
             this.setState({
               name: text,
               dataCheck:d
             });
           }
         } 
       }else {
           this.setState({
             name: text,
           });
         }
       }
       catch (e){
         console.log('e',e);
       }
      }
      else {
        Alert.alert("Register", "please validate the otp", [{
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
      }, {
          text: "ok",
          onPress: () => {}
      }], {
          cancelable: false
      });
      }
  };
  suggestionTag = (elements, index) => {
    console.log('el', elements);
    try{
      const {suggesion} = this.state;
      let m = suggesion;
  
      let {dataCheck} = this.state;
  
      dataCheck.filter((iterm) => {
        if (iterm.cell == elements.cell) iterm.right = false;
      });
  
      for (let i in suggesion) {
        if (m[i] == elements) {
          m.splice(i, 1);
        }
      }
      mg = m;
  
      this.arrayholder.filter((iterm) => {
        if (iterm.cell == elements) iterm.right = false;
      });
  
      // let mp =this.arrayholder
      // let i = index
      //   const map = function (mp,index){
      //     if (index + 2 < mp.length && mp[index + 2].right == true)
      //         {mp.swap(index,index+2);
      //         i = index + 2
      //       i < mp.length && map(mp,i)
      //       }
      //   }
      //   i < this.arrayholder.length ? map(mp,i) : i = index
  
      this.setState({
        suggesion: m,
        // dataCheck:this.arrayholder,
      });
    }
    catch (e){
      console.log('e',e);
    }
    // console.log('suggesion', this.state.suggesion);
  };

  render() {
    const {suggesion, dataCheck} = this.state;
    return (
      <HideKeyboard>
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <NavigationEvents onDidFocus={this.checking} />
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={[
                {
                  top: hp(5),
                },
                styles.CenterLogo,
              ]}>
              <View>
                <Image
                  source={require('../Img/logo-spotjo.png')}
                  resizeMode={'contain'}
                  style={{
                    height: hp(20),
                    width: Dimensions.get('window').width / 2 + scale(80),
                  }}
                />
              </View>
              <View
                style={{
                  top: hp(4),
                }}>
                <Texting
                 style={[
                    {
                      fontSize: hp(3.7),
                      fontFamily: 'Roboto-Bold',
                    },
                    styles.FontSty,
                  ]}
                  text="Which_talent_do_you_want"
                />
              </View>
              <View
                style={{
                  top: hp(4),
                }}>
                <CustomInput
                  placeholder={
                    global.language == 'english'
                      ? 'E.g (Java Developer)'
                      : 'E.g (Java-Developer)'
                  }
                  value={this.state.name}
                  inputContainerStyle={{
                    borderRadius: hp(3),
                    height: hp(6.5),
                    width: '92%',
                    backgroundColor: '#fff',
                    borderBottomColor: '#E5E5E5',
                    borderBottomWidth: 0.3,
                  }}
                  autoFocus={true}
                  onSubmitEditing={() => this.setState({show:false})}
                  textChange={(text) => {
                    this.setState({
                      show: text != '' ? true : false,
                    });
                    this.cheks(text);
                  }}
                  inputStyle={{
                    fontWeight: 'bold',
                    fontSize: hp(2.7),
                    color: themeColor,
                  }}
                  iconStyle={{
                    height: hp(3),
                    width: hp(3),
                  }}
                />
                {this.state.show && (
                <View
                  style={{
                    width: wp(87),
                    borderRadius: scale(5),
                    height: hp(48),
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: scale(55),
                  }}
                  onLayout={(e) =>
                    this.setState({natHeight: e.nativeEvent.layout.height})
                  }>
                  <ListOfChoosed
                    contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: 'flex-start',
                      paddingLeft: 30,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                    data={dataCheck}
                    keyboardShouldPersistTaps="always"
                    renderItem={({item, index}) => this.renderItem(item, index)}
                  />
                </View>
              )}
              </View>
              {!this.state.show && (<View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flexGrow: 0,
                  // marginTop: -20,
                  width: wp(87),
                  // marginLeft:wp(4),
                  // height: this.state.natHeight / 2 + this.state.natHeight / 3
                  height:'auto'
                }}>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {suggesion &&
                    suggesion.map((elements, index) => (
                      <SuggestionView
                        onPress={() => this.suggestionTag(elements, index)}
                        elements={global.language == 'english' ? elements.cell.english : elements.cell.german}
                        index={index}
                      />
                    ))}
                </ScrollView>
              </View> )}
            </View>
            <BackNext onBack={this.back} onNext={this.next} show={!this.state.show} done={()=> this.setState({show:false})}/>
          </View>
        </ImageBackground>
      </SafeAreaView></HideKeyboard>
    );
  }
}

export default withNavigationFocus(TalentCom);