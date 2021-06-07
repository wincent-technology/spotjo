import React, {Component} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableWithoutFeedback,TouchableOpacity
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {scale, snack} from '../src/Util';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {play} from '../src/IconManager'
import {Background, FontBold, FontRegular, themeColor} from '../Constant/index';
import DocumentPicker from 'react-native-document-picker';
import {readFile} from 'react-native-fs';
import XLSX from 'xlsx';
import http from '../api';
import Modal from 'react-native-modal';
import Texting from '../Constant/Text'
import BackNext from '../Component/BackNext'
  import * as Animatable from 'react-native-animatable';

const input = (res) => res;

var Month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

class BulkUploadResume extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      bottomModal: false,
    };
    this.text = React.createRef()

  }

  next = () => {
    this.text.current.zoomIn(1000)

  }

  Upload = async () => {
    try {
      const fileSelected = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      readFile(fileSelected.uri, 'ascii')
        .then((fileSelected) => {
          const getFile = XLSX.read(input(fileSelected), {
            type: 'binary',
            cellDates: true,
          });
          const Sheets0 = getFile.SheetNames[0];
          const ws0 = getFile.Sheets[Sheets0];
          const data = XLSX.utils.sheet_to_row_object_array(ws0, {raw: true});
          data.filter((i) => {
            let eng = i.skillEnglish.split(',');
            let ger = i.skillGermen.split(',');
            let skillRet = i.skillRating.split(',');
            let dE = i.degreeEnglish.split(',');
            let dG = i.degreeGermen.split(',');
            let eF = new Date(i.educationFrom).toLocaleDateString().split(',');
            let eR = i.educationRating + ''.split(',');
            let eT = new Date(i.educationTo).toLocaleDateString().split(',');
            let uE = i.uniEnglish.split(',');
            let uG = i.uniGermen.split(',');
            let wC = i.wrkexpCompany.split(',');
            let wF = new Date(i.wrkexpFrom).toLocaleDateString().split(',');
            let wrat = i.wrkexpRating + ''.split(',');
            let wR = i.wrkexpRole.split(',');
            let wT = new Date(i.wrkexpTo).toLocaleDateString().split(',');

            i['workExp'] = [];
            i['skill'] = [];
            i['education'] = [];

            for (let j in eng)
              i.skill.push({
                english: eng[j],
                german: ger[j],
                rating: skillRet[j],
              });

            for (let j in eF)
              i.education.push({
                Degree: {english: dE[j], german: dG[j]},
                University: {english: uE[j], german: uG[j]},
                rating: eR[j],
                From:
                  Month[new Date(eF[j]).getMonth()] +
                  ' ' +
                  new Date(eF[j]).getFullYear(),
                To:
                  Month[new Date(eT[j]).getMonth()] +
                  ' ' +
                  new Date(eT[j]).getFullYear(),
              });

            for (let j in wF)
              i.workExp.push({
                Role: wR[j],
                Company: wC[j],
                rating: wrat[j],
                From:
                  Month[new Date(wF[j]).getMonth()] +
                  ' ' +
                  new Date(wF[j]).getFullYear(),
                To:
                  Month[new Date(wT[j]).getMonth()] +
                  ' ' +
                  new Date(wT[j]).getFullYear(),
              });

            delete i.skillEnglish, delete i.skillGermen;
            delete i.skillRating;
            delete i.degreeEnglish;
            delete i.degreeGermen;
            delete i.educationFrom;
            delete i.educationRating;
            delete i.educationTo;
            delete i.uniEnglish;
            delete i.uniGermen;
            delete i.wrkexpCompany;
            delete i.wrkexpFrom;
            delete i.wrkexpRating;
            delete i.wrkexpRole;
            delete i.wrkexpTo;
          });

          http
            .POST('api/user/upload/resume', {
              data: data,
            })
            .then((res) => {
              if (res['data']['status']) {
                this.setState({bottomModal: true, data: res['data']['result']});

                console.log('resource', res['data']);
                snack(res['data']['message']);
              }
            })
            .catch((e) => console.log('e', e));
        })
        .catch((err) => {
          console.log(err.message, err.code);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
      this.setState({loader: false});
    }
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "96%",
          marginHorizontal:'2%',
          backgroundColor: "#ccc",
        }}
      />
    );
  }

  renderItem = (item, index) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          margin: 5,
        }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontFamily: FontBold, color: themeColor,fontSize:hp(2.7)}}>{index + 1} ) </Text>
          <Text style={{fontFamily: FontBold, color: themeColor,fontSize:hp(2.1)}}>
            Status : {item.Status}
          </Text>
        </View>
        <View>
          <Text style={{fontFamily: FontRegular,fontSize:hp(2)}}>
            Company Email : {item.comEmail}
          </Text>
        </View>
        <View>
          <Text style={{fontFamily: FontRegular,fontSize:hp(2)}}>
            User Email : {item.userEmail}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Modal
              testID={'modal'}
              isVisible={this.state.bottomModal}
              onBackdropPress={() =>
                this.setState({
                  bottomModal: false,
                })
              }
              onBackButtonPress={() =>
                this.setState({
                  bottomModal: false,
                })
              }
              swipeDirection={['down']}
              // scrollOffsetMax={400 - 300} // content height - eight
              propagateSwipe={true}
              animationInTiming={500}
              animationOutTiming={500}
              style={{justifyContent: 'flex-end', margin: 0}}
              useNativeDriver={true}>
              <View
                style={{
                  // height: hp(70),
                  backgroundColor: 'rgba(255,255,255,1)',
                  borderTopRightRadius: scale(20),
                  borderTopLeftRadius: scale(20),

                }}>
                <View style={{alignItems:"center",top:-40,backgroundColor:"transparent"}}>
                <TouchableOpacity 
                style={{height:hp(4),width:hp(4),justifyContent:"center",
                alignItems:'center',backgroundColor:"white",
                borderRadius:hp(2),borderWidth:1,borderColor:"white"}} onPress={()=> this.setState({bottomModal:false})} hitSlop={{left:100,right:100,top:20,bottom:20}}>
                {play('close',hp(3),'gray')}
                </TouchableOpacity>
                </View>
                <FlatList
                  data={this.state.data}
                  removeClippedSubviews={true}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  ItemSeparatorComponent = { this.FlatListItemSeparator }
                  updateCellsBatchingPeriod={70}
                  getItemLayout={(data, index) => ({
                    length: hp('10%'),
                    offset: hp('10%') * index,
                    index,
                  })}
                  renderItem={({item, index}) => this.renderItem(item, index)}
                  keyExtractor={(item, index) => index + ''}
                />
              </View>
            </Modal>
            <Text style={styles.LookingFor}>Upload Resume</Text>
            <View
              style={{
                marginTop: hp(2),
              }}>
              <TouchableWithoutFeedback
                style={styles.CompanyLoginOpportunityView}
                onPress={this.Upload}>
                <Animatable.View
                ref={this.text}
                  style={[
                    styles.CompanyLoginalentView,
                    {
                      borderRadius: scale(5),
                      justifyContent: 'center',
                    },
                  ]}>
                  <View>
                    <Texting style={styles.CompanyOppoTalentText} text='Select_Excel_File'/>
                  </View>
                </Animatable.View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
        <View style={{marginTop:hp(85),width:'100%'}}>
        <BackNext onBack={()=>this.props.navigation.goBack()} onNext={this.next} show={true}/>
        </View>
      </SafeAreaView>
    );
  }
}
export default withNavigationFocus(BulkUploadResume);
