import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
  Text,
  FlatList,
  Image,
  View,Alert
} from 'react-native';
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import {scale, snack,HideKeyboard} from './Util';
import CustomInput from '../Component/Input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  Background,
  themeColor,
  themeWhite,
} from '../Constant/index';
import SuggestionView from '../Component/SuggestionView';
import BackNext from '../Component/BackNext';

import styles from './Style';
import http from '../api';
import {library} from './IconManager';
import Texting from '../Constant/Text';

var mg = [];

const defaultProps = {
  name: '',
  Anywhere: false,
  dataCheck: [],
  show: false,
  suggesion: [],
  natHeight: 1,
};

class FavoriteCompany extends Component {
  constructor(props) {
    super(props);
    this.state = defaultProps;
    this.arrayholder = [];
  }

  next = () => {
    // mg = this.state.name && this.state.name.split(',');
    mg = [...new Set(this.state.suggesion)] || [];
    // console.log('mg', mg);
    global.Company = mg;
    global.Anywhere = this.state.Anywhere;

    // this.setState({
    //   ...defaultProps,
    // });
    // mg = [];
    
    this.props.navigation.navigate('ChooseTalent');
  };
  back = () => {
    // mg = this.state.name.split(',');
    mg = [...new Set(this.state.suggesion)];
    // console.log('mg', mg);
    global.Company = mg;
    global.Anywhere = this.state.Anywhere;
    this.props.navigation.goBack();
    global.reset = false
  };

  checking = () => {
    global.reset && this.arrayholder.filter(iterm => iterm.right = false);

    this.setState({
      suggesion:global.Company || [],
      Anywhere:global.Anywhere,
      show:false
    });
    // mg = [];
  };

  componentDidMount() {
    let data = [];
    try {
      http.GET('api/appcomjson/get').then(
        (res) => {
          if (res['data']['status']) {
            console.log('data', data);
            this.setState({
              dataCheck: res['data']['result'],
            });
            let p = res['data']['result'];
            this.arrayholder = p.map((cell, i) => {
              let temp = {};
              temp = {cell, right: false};
              return temp;
            });
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
  choose = (choose, index) => {

   try {

    if (this.state.suggesion.length >=5)
    {
      Alert.alert("Detail", "You have added 5 Company", [{
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

    }else{
      mg.push(choose.cell);
      mg = [...new Set(mg)];
      console.log('mg', mg);
  
      let mni = [];
      let {dataCheck} = this.state;
    dataCheck.filter((iterm) => {
      if (iterm.cell == choose.cell) iterm.right = true;
    });

    mg.filter((i) => i != choose.cell || (i != '' && mni.push(i)));
    this.setState(
      {
        suggesion: mg,
        name: '',
        dataCheck
        // show: !this.state.show,
      });
    }
  }
  catch (e){
    console.log('e',e);
  }
  };
  cheks = (text) => {
try{
    if (text != '') {

    if (this.state.suggesion.length >=5)
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
  }else{

    var data = [];
    let newData = this.arrayholder.filter((item) => {
      const itemData =
        item.cell != null &&
        `${item.cell.toUpperCase()}   
                    ${item.cell.toUpperCase()} ${item.cell.toUpperCase()}`;
      const textData = text.toUpperCase();
      console.log('itemdata', itemData);
      return itemData != null && itemData.toString().indexOf(textData) > -1;
    });

    newData = newData.filter((item) => !mg.includes(item.cell));
    console.log('newData', newData);

    newData =
      newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
    if (newData.length) {
      this.setState({
        dataCheck: newData,
        name: text,
      });
    } else {
      this.setState({
        dataCheck: newData,
        name: text,
      });
    }
  }
}else {
  this.setState({
    name: text,
  });
}
}
catch (error){
  console.log('e',error);
}
}
  
  renderItem = (item, index) => {
    return (
      item.cell && (
        <View
          style={{
            width: 'auto',
            flexWrap: 'wrap',
            flexDirection: 'row',
            margin: 2,
          }}>
          <TouchableWithoutFeedback
            onPress={() =>
              !item.right
                ? this.choose(item, index)
                : this.suggestionTag(item, index)
            }>
            <View
              style={{
                alignItems: 'flex-start',
                borderWidth: item.cell != '' ? 1 : 0,
                borderColor: themeColor,
                borderRadius: 10,
                paddingHorizontal: 10,
                width: 'auto',
                backgroundColor: item.right ? 'white' : 'transparent',
                borderColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp(2.7),
                  color: item.right ? themeColor : themeWhite,
                }}>
                {item.cell}
              </Text>
              {item.right && (
                <View
                  style={{
                    // top: scale(-7),
                    left: scale(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {library('highlight-off', hp(2.6), themeColor)}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    );
  };
  suggestionTag = (elements, index) => {
    try {
    const {suggesion} = this.state;
    let m = suggesion;
    let {dataCheck} = this.state;

    dataCheck.filter((iterm) => {
      if (iterm.cell == elements.cell) iterm.right = false;
    });

    if (typeof elements == 'object') {
      elements = elements.cell;
    }

    for (let i in suggesion) {
      if (m[i] == elements) {
        m.splice(i, 1);
      }
    }
    mg = m;
    console.log('e', m)

    

    // this.arrayholder.filter((iterm) => {
    //   if (iterm.cell == elements) iterm.right = false;
    // });
    this.setState({
      suggesion: m,
    });
  }
  catch(e){
    console.log('e',e);
  }
  }

  render() {
    const {Anywhere, name, suggesion, dataCheck} = this.state;
    console.log('this.state.suggestion',suggesion,global.Company)
    return (
      <HideKeyboard>
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <View style={styles.MainFlex}>
            <NavigationEvents onDidFocus={this.checking} />

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
              <View style={styles.HeadingText}>
                <Texting
                  style={[
                    {
                      fontSize: hp(3.7),
                      textAlign: 'center',
                    },
                    styles.FontSty,
                  ]}
                  text="Favourite_Company"
                />
              </View>
              <View
                style={{
                  top: hp(4),
                }}>
                <CustomInput
                  value={this.state.name}
                  placeholder={
                    global.language == 'english'
                      ? 'Select Company'
                      : 'Select Company'
                  }
                  Company={global.language == 'english' ? 'All' : 'All'}
                  Anywhere={Anywhere}
                  autoFocus={true}
                  onSubmitEditing={() => this.setState({show:false})}
                  onPress={() =>
                    this.setState({
                      Anywhere: !this.state.Anywhere,
                    })
                  }
                  inputContainerStyle={{
                    borderRadius: hp(3),
                    height: hp(6.5),
                    width: '92%',
                    backgroundColor: '#fff',
                    borderBottomColor: '#E5E5E5',
                    borderBottomWidth: 0.3,
                  }}
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
                    height: 'auto',
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: scale(55),
                  }}  
                  onLayout={(e) =>
                    this.setState({natHeight: e.nativeEvent.layout.height})
                  }>
                  <FlatList
                    data={this.state.dataCheck}
                    keyboardShouldPersistTaps="always"
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={true}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    contentContainerStyle={{
                      justifyContent: 'flex-start',
                      paddingLeft: 30,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
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
              </View>

              {!this.state.show && <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flexGrow: 0,
                  marginTop: this.state.show ? this.state.natHeight : 1,
                  width: wp(87),
                  height:  hp(100) <= 650 ? scale(95) : 'auto'
                }}>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {Array.isArray(this.state.suggesion) &&
                    this.state.suggesion.map((elements, index) => (
                      <SuggestionView
                        onPress={() => this.suggestionTag(elements, index)}
                        elements={elements}
                        index={index}
                      />
                    ))}
                </ScrollView>
              </View>}
              
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <BackNext onBack={this.back} onNext={this.next}  show={!this.state.show} done={()=> this.setState({show:false})} />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
      </HideKeyboard>
    );
  }
}

export default withNavigationFocus(FavoriteCompany);
