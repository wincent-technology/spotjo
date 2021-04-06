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
import {scale, snack} from './Util';
import CustomInput from '../Component/Input';
import BackNext from '../Component/BackNext'
import SuggestionView from '../Component/SuggestionView'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  vw,
  vh,
} from '../Component/responsive-ratio';
import {Background, themeColor, FontBold, themeWhite} from '../Constant/index';
import http from '../api';
import styles from './Style';
import {library} from './IconManager';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Texting from '../Constant/Text'
// Array.prototype.move = function(from, to) {
//   this.splice(to, 0, this.splice(from, 1)[0]);
// };

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}

var mg = [];
class TalentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataCheck: [],
      show: false,
      suggesion: [],
      natHeight:1
    };
    this.arrayholder = [];
    
  }

  next = () => {
    // mg = this.state.name.split(',')
    mg = [...new Set(this.state.suggesion)];
    console.log('mg', mg);

    global.Job_Title = mg;
    this.props.navigation.navigate('FavoriteLocation');
  };

  back = () => {
    this.props.navigation.goBack();
  };

  renderItem = (item, index) => {
    return (
    <View
        style={{
          width: 'auto',
          flexWrap:'wrap',flexDirection:"row",margin:2
        }}>
        <TouchableWithoutFeedback onPress={() => !item.right ? this.choose(item,index):this.suggestionTag(item,index)}>
            <View
              style={{
                alignItems: 'flex-start',borderWidth:item.cell != '' ? 1 : 0,borderColor:themeColor,
                borderRadius:10,paddingHorizontal:10,
                width: 'auto',backgroundColor:item.right ? 'white':"transparent",borderColor:"#fff",flexDirection:"row",justifyContent:"center",alignItems:"center"
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: scale(18),
                  color:item.right ? themeColor : themeWhite,
                }}>
                {item.cell}
              </Text>
              { item.right && <View
                            style={{
                              // top: scale(-7),
                              left: scale(5),justifyContent:"center",alignItems:"center"
                            }}>
                            {library('highlight-off', scale(17), themeColor)}
                          </View>}
            </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  choose = (choose,index) => {

    mg.push(choose.cell);
    mg = [...new Set(mg)];
console.log('mg',mg)

    let mni = [];
    mg.filter((i) => i != choose.cell || i != '' && mni.push(i) )
    this.setState({
      suggesion: mg,
      name: '',
      show: !this.state.show,
    },()=> {
      // if (this.arrayholder.length /2 == this.state.suggesion.length)
      // {
      //   // return
      //   this.arrayholder.push({cell : '',right:false})
      //   this.arrayholder.push({cell : '',right:false})
      // }

      // let Toind = (((this.state.suggesion.length * 2) / 2 - 1) * 2 / (2-1) + 1)

      // this.arrayholder.filter((item,index)=> {
      //   if (index == Toind)
      //     {
      //       console.log('item',index)
      //       this.arrayholder[index].right == true  ? Toind + 2 :Toind
      //     }
      // })

    this.arrayholder.filter(iterm => {
        if(iterm.cell == choose.cell)
        iterm.right = true
      })

      // console.log('tpind',Toind)
          // this.arrayholder.swap(index, Toind)
    });

  };

  componentDidMount() {
    var data = [];
    try {
      http.GET('api/apptaljson/get').then(
        (res) => {
          if (res['data']['status']) {
            console.log('result', res['data']['result']);
            this.setState({
              dataCheck: res['data']['result'],
            });
            let p = res['data']['result'];
          this.arrayholder = p.map((cell,i) => {
              let temp = {}
              temp = {cell,right:false}
              return temp
            })
            
            // console.log('this.srray',this.arrayholder);
          } else {
            snack(res['data']['message']);
          }
        },
        (err) => snack(err['message']),
      );
    } catch (error) {
      snack(error);
    }
  //   this.arrayholder = [{
  //     'cell':'one',
  //     'right':false
  // },
  // {
  //     'cell':'two',
  //     'right':false
  // },
  // {
  //     'cell':'three',
  //     'right':false
  // },{
  //     'cell':'four',
  //     'right':false
  // },{
  //     'cell':'five',
  //     'right':false
  // },{
  //     'cell':'six',
  //     'right':false
  // }]
  }
  cheks = (text) => {
    if (text != '') {
      let newData = this.arrayholder.filter((item) => {
        const itemData =
          item != null &&
          `${item.cell.toUpperCase()}   
                    ${item.cell.toUpperCase()} ${item.cell.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData != null && itemData.toString().indexOf(textData) > -1;
      });

      newData = newData.filter(item => !mg.includes(item.cell))
      console.log('newData',newData)
      
      
      newData = newData.length && newData.length < 10 ? newData : newData.slice(0,10);
      if (newData.length) {
        this.setState({
          dataCheck:newData,
          name: text,
        });
      } else {
        this.setState({
          name: text,
        });
      }
    } else {
      this.setState({
        name: text,
      });
    }
  };

  suggestionTag = (elements, index) => {

    console.log('el',elements)
     if (typeof(elements) == 'object')
     {
       elements =elements.cell
     }

    const {suggesion} = this.state;
    let m = suggesion;
    for (let i in suggesion) {
      if (m[i] == elements) {
        m.splice(i, 1);
      }
   }
    mg = m;

    this.arrayholder.filter((iterm) => {
      if(iterm.cell == elements)
      iterm.right = false
    })

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

      console.log('suggesion',this.state.suggesion)
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
                  ]} text='Whats_your_Talent' />
              </View>
              <View
                style={{
                  top: scale(20),
                }}>
                <CustomInput
                  value={this.state.name}
                  placeholder={global.language == 'english' ? 'E.g (Java Developer)' : 'E.g (Java-Developer)'}
                  inputContainerStyle={{borderRadius:scale(20),height:scale(45),width:'92%',backgroundColor:"#fff",borderBottomColor: "#E5E5E5",
        borderBottomWidth: 0.3,}}
                  textChange={(text) => {
                    this.setState({
                      show: text != '' ? true : false,
                    });
                    this.cheks(text);
                  }}
                  // autoCompleteType='name'
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
                  flexGrow:0,
                  marginTop:this.state.show ? this.state.natHeight : 1,
                  width: wp(87),
                  height:suggesion != [] && scale(95),
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
                    height: 'auto',
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: scale(260),
                  }} onLayout={(e)=> this.setState({natHeight:e.nativeEvent.layout.height})}>
                  <FlatList
                    data={dataCheck}
                    keyboardShouldPersistTaps="always"
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={true}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    contentContainerStyle={{flexGrow:1,justifyContent:"flex-start",paddingLeft:30,flexDirection:'row',flexWrap:"wrap"}}
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
            <BackNext onBack={this.back} onNext={this.next} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(TalentScreen);

{/* <View
              style={{
                flexDirection: 'row',
                width: wp(86),
                position:"absolute",
                bottom: 5,
                marginLeft:wp(7),
                justifyContent:"space-between",
              }}>
              <View
                style={{
                  width: wp(40),
                  justifyContent:"center",
                  alignItems:"center",
                }}>
                  <View style={{
                  width: wp(20),
                  justifyContent:"center",
                  alignItems:"center",
                  borderTopWidth:1,
                  borderTopColor:"#fff",
                  height:45,
                }}>
                  <TouchableOpacity
                  style={[styles.Size],{justifyContent:"center",alignItems:"center",}}
                  onPress={this.back}
                  hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}>
                  <View style={{justifyContent:"center",alignItems:"center",paddingTop:5}}>
                    <Text
                      style={[
                        {
                          fontSize: scale(20),
                        },
                        styles.FontSty,
                      ]}>
                      Back
                    </Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
              <View 
                style={{width:1,height:30,marginVertical:10,backgroundColor:"white"}}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent:"center",
                  width: wp(40),
                }}>
                 <View style={{
                  width: wp(20),
                  justifyContent:"center",
                  alignItems:"center",
                  borderTopWidth:1,
                  borderTopColor:"#fff",
                  height:45,
                }}>
                  <TouchableOpacity
                  style={[styles.Size],{justifyContent:"center",alignItems:"center"}}
                  onPress={this.next}
                  hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}>
                  <View
                    style={{justifyContent:"center",alignItems:"center",paddingTop:5}}>
                    <Text
                      style={[
                        {
                          fontSize: scale(20),
                        },
                        styles.FontSty,
                      ]}>
                      Next
                    </Text>
                  </View>
                </TouchableOpacity>
                </View>
                
              </View>
            </View> */}