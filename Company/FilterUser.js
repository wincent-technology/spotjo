import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
  Image,
  View,Alert
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
  library,
  icon,
  play,
  leftVid
} from '../src/IconManager';
import {
  scale,
  snack
} from '../src/Util';
import {
  FontBold,
  iconSearch,
  TRANLINE,
  switchColor,
  themeColor,
  themeWhite,
  Background,
  IC_ARR_UP,
  IC_ARR_DOWN,
  minimumSalary,
  salaryType,
  company,
  skill,
  skillCategory,
  skillLavel,
  Filterjobtype,
  searchType,
  blanks,
  Fulls,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import ToggleSwitch from '../Component/ToggleSwitch';
import CustomInput from '../Component/Input';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
  CheckBox,
  DropDownItem,
  NavigationHead,
  StarRating,
} from '../Component/ViewManager.js';
import http from '../api';
import Itemskill from './Itemskill';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
// import Slider from 'react-native-range-slider'
import Slider from 'rn-range-slider';
import Texting from '../Constant/Text'
import ApplyFilterButton from '../Component/ApplyFilterButton'
import ListOfChoosed from '../Component/ListOfChoosed'
import SuggestionView from '../Component/SuggestionView'
import Modal from 'react-native-modal'

var mg = [];

let Items = global.language == 'english' ? true : false
const Categoryskill = ({name, ...props}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderColor: props.bool ? themeColor : '#000',
        backgroundColor: props.bool ? themeColor : themeWhite,
        width: name == 'Helping_Vacancies' ? 'auto' : '44%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(30),
        borderWidth: 1,
        paddingHorizontal: scale(10),
      }}>
      <Texting
        style={[
          {color: !props.bool ? '#000' : '#fff'},
          styles.CheckBoxLabelFont,
        ]}
        text={name}
      />
    </TouchableOpacity>
  );
};

const defaultState = {
  Hourly: false,
  Monthly: false,
  Yearly: false,
  ByDistance: false,
  ByLocation: false,
  flag: true,
  name: '',
  company: '',
  addSkill: [],
  FullTime: false,
  PartTime: false,
  salary: 0,
  salaryMax: 150000,
  Employed: false,
  Internship: false,
  StudentJobs: false,
  HelpingVacancies: false,
  Freelancer: false,
  dataCheck: [],
  Trainee: false,
  Novice: false,
  Proficient: false,
  Expert: false,
  suggesion: [],
  show: false,
  skillCheck: [],
  suggestionSkill: [],
  showSkill: false,
  natHeight: 1,
  keyboardShown: false,
  RollCheck: [],
  showRole: false,
  suggesionRole: [],
  modalData:[],
  showJob:false,
  dataCheckJob:[],
  suggesionJob:[]

}


const Compon = ({...props}) => {
  return (
    <ScrollView style={{alignSelf: 'stretch'}} nestedScrollEnabled>
      <CustomInput
        value={props.value}
        placeholder={
          global.language == 'english' ? 'Select Job' : 'Select Job'
        }
        textChange={props.textChange}
        inputContainerStyle={{
          borderRadius: hp(3),
          height: hp(6.5),
          width: '100%',
          backgroundColor: themeColor,
          borderBottomColor: '#E5E5E5',
          borderBottomWidth: 0.3,
        }}
        inputStyle={{
          color: 'white',
          fontSize: hp(2.7),
          fontFamily: 'Roboto-Bold',
          fontWeight: 'bold',
        }}
        placeholderTextColor={themeWhite}
        containerStyle={{
          width: wp(85),
          marginBottom: scale(-17),
        }}
        iconName={iconSearch}
        iconStyle={{
          height: hp(3),
          width: hp(3),
        }}
        iconColor={'#fff'}
      />
      <View style={props.style}>
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {props.scrl}
        </ScrollView>
      </View>
      {props.show && (
        <View style={props.styleFlat} onLayout={props.onLayout}>
          <FlatList
            nestedScrollEnabled
            style={{flex: 1}}
            data={props.dataCheck}
            contentContainerStyle={{
              justifyContent: 'flex-start',
              paddingLeft: 30,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            renderItem={props.renderItem}
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
    </ScrollView>
  );
};

class FilterUser extends Component {
  constructor(props) {
    super(props);

    this.state = JSON.parse(JSON.stringify(defaultState));
    this.arrayholder = [];
    this.arrayholders = [];
    this.arrayholderRole = [];
    this.arrayholderJob = [];
    this.slider = React.createRef();
    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      this.checking()
      // do something like this.setState() to update your view
    })

  }


  componentWillUnmount () {
    this.navigationWillFocusListener.remove()
  }


  checking = () => {
    let temp = {}
    let modalData = global.Job_Location.map(item => {
      temp={
      ...item,
      flag:false
      }
return temp
    })
    this.setState({modalData})
    // global.reset = false
  }

  save = () => {
    mg = [...new Set(this.state.suggesion)];
    console.log('mg', global.Job_Location);
    let {modalData} = this.state;
    let d = modalData.filter(item => item.flag == true);
    console.log('d',d)
    // console.log('mg', this.state);
    // global.CompanyGuest = this.state.suggestionSkill 
    // global.Role = this.state.suggesionRole
    // global.CompanyGuest = mg
    let sk = this.state.suggestionSkill.map(item => {
      let temp = {}
      temp.name = Items ? item.cell.english : item.cell.german,
        temp.rating = item.rating
      return temp
    })

    global.objective = this.state;
    global.JobID = this.state.suggesionJob

    

    try {
      http
        .POST('api/user/filter', {
          Hourly: this.state.Hourly,
          Monthly: this.state.Monthly,
          Yearly: this.state.Yearly,
          ByDistance: this.state.ByDistance,
          ByLocation: this.state.ByLocation,
          Company: mg,
          skill: sk,
          selectLanguage:global.language,
          FullTime: this.state.FullTime,
          PartTime: this.state.PartTime,
          salMin: this.state.salary,
          salMax: this.state.salaryMax,
          Employed: this.state.Employed,
          Internship: this.state.Internship,
          StudentJobs: this.state.StudentJobs,
          HelpingVacancies: this.state.HelpingVacancies,
          Freelancer: this.state.Freelancer,
          location: global.Job_Location,
          Trainee: this.state.Trainee,
          Novice: this.state.Novice,
          Proficient: this.state.Proficient,
          Expert: this.state.Expert,
        })
        .then(
          (res) => {
            // console.log('ress', res['data']);
            if (res['data']['status']) {
              console.log('nwe api >>>>>>', res['data']['result']);
              // global.all = res['data']['result'];
              // this.props.navigation.navigate('TabScreen', {
              //     otherParam: res['data']['result'],
              // })
              let data = []
              let From,
                To,
                tmpobj,
                jobs = res['data']['result'];

              for (let i = 0; i < jobs.length; i++) {

                if (jobs[i]['workexp']) {
                  for (let j = 0; j < jobs[i]['workexp'].length; j++) {
                    tmpobj = JSON.parse(JSON.stringify(jobs[i]));

                    From = jobs[i]['workexp'][j]['From'].split(' ');
                    To = jobs[i]['workexp'][j]['To'].split(' ');

                    tmpobj.Company = jobs[i]['workexp'][j]['Company'];
                    tmpobj.Role = jobs[i]['workexp'][j]['Role'];
                    tmpobj.totalExp = To[1] - From[1];

                    data.push(tmpobj);
                  }
                }else{
                tmpobj = JSON.parse(JSON.stringify(jobs[i]));
                data.push(tmpobj)}
              }
              let i = data.map(item => {
                return {...item,
                heart:false}});

              console.log("data >>>", data);
              global.all = i
              i && this.props.navigation.goBack();
            } else {
              snack('Data Not Found');
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  };
  Back = () => {
    console.log('hi');
    this.props.navigation.goBack();
  };
  Exit = () => {
    this.props.navigation.goBack();
  };

  handleChange = (value, index) => {
    var arr = [];
    arr = this.state.suggestionSkill;
    console.log('suggestionskill', this.state.suggestionSkill, value, index)
    arr[index].rating = value;
    this.setState({
      suggestionSkill: arr,
    });

    console.log('suggestionskill', this.state.suggestionSkill)
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardShown: true
    });
    console.log('Keyboard Shown');
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboardShown: false
    });
    console.log('Keyboard Hidden'); 
  }

  componentDidMount() {

    this.setState(global.objective);

    this.setState({
      suggestionSkill:global.Job_Title,
      FullTime: global.FullTime,
      PartTime: global.PartTime,
      Employed: global.Employed,
      Internship: global.Internship,
      StudentJobs: global.StudentJobs,
      HelpingVacancies: global.HelpingVacancies,
      Freelancer: global.Freelancer,
    })
    console.log('this.slid',this.slider.current)
     this.slider.current.high = this.state.salaryMax;
     this.slider.current.low = this.state.salary;





     let temp = {}
     let modalData = global.Job_Location.map(item => {
       temp={
       ...item,
       flag:false
       }
 return temp
     })
     this.setState({modalData})


    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    try {
      http.POST('api/applogcom/job', {
        companyId: global.Id,
      }).then(
        (res) => {
          if (res['data']['status']) {

            let {dataCheckJob} = this.state;
            dataCheckJob = res['data']['result'].map(item => {
            let temp = {}
              temp.name = item.title;
              temp.id = item.id
              return temp
            });
            console.log('result',dataCheckJob)

            this.setState({
              dataCheckJob
            });
            let p = dataCheckJob;
            this.arrayholderJob = p.map((cell, i) => {
              let temp = {};
              temp = {cell, right: false};
              return temp;
            });

            console.log('sdfasfsdf',this.arrayholderJob)
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

    try {
      http.GET('api/skill/get').then(
        (res) => {
          if (res['data']['status']) {
            this.setState({
              skillCheck: res['data']['result'],
            });
            let p = res['data']['result'];
            this.arrayholders = p.map((cell, i) => {
              let temp = {}
              temp = { cell, right: false, rating: 5 }
              return temp
            })
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
    try{
    http.GET('api/apptaljson/get').then(
      (res) => {
        if (res['data']['status']) {
          console.log('result', res['data']['result']);
          this.setState({
            RollCheck: res['data']['result'],
          });
          let p = res['data']['result'];
          this.arrayholderRole = p.map((cell, i) => {
            let temp = {};
            temp = {cell, right: false};
            return temp;
          });

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
  }


 ///////////////////
  //Modal Function//
  //////////////////

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
  ListHeader = () => {
    //View to set in Header
    let headerFooterStyle = {
      width: '100%',
      height: hp(6.5),
      backgroundColor:themeColor,
      borderTopRightRadius: scale(20),
                  borderTopLeftRadius: scale(20),
      // backgroundColor: '#606070',
    }
    let textStyle = {
      textAlign: 'center',
      color: '#fff',
      fontSize: hp(2.7),
      padding: 7,
    }
    return (
      <View style={headerFooterStyle}>
        <Text style={textStyle}>
            {this.state.modalData.length  ? 'Please Select Location From List' : 'Not location found'} 
        </Text>
      </View>
    );
  };

  renderItemModal = (item, index) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          margin: 5,
        }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontFamily: FontBold, color: themeColor,fontSize:hp(2.7)}}>{index + 1} ) </Text>
        <CheckBox text={item.place} textStyle={{fontFamily: FontBold, color: themeColor,fontSize:hp(2.8)}} size={hp(3)} style={{justifyContent:'space-between',width:wp(90)}} selected={item.flag} onPress={()=> this.selectcity(item,index)} />
        </View>
      </View>
    );
  };

  selectcity = (item,index) => {
    let {modalData} = this.state;
    modalData[index].flag = !modalData[index].flag
    this.setState({modalData})
  }


  // choose = (choose) => {
  //   console.log('choose');
  //   mg.push(choose);
  //   mg = [...new Set(mg)];
  //   console.log('sfdsff', mg);
  //   let mni = [];
  //   for (let i in mg) {
  //     if (mg[i] != choose || mg[i] != '') mni.push(mg[i]);
  //   }
  //   this.setState({
  //     suggesion: mni,
  //     company: '',
  //     show: !this.state.show,
  //   });
  // };
  // cheks = (text) => {
  //   var data = [];
  //   const newData =
  //     this.arrayholder &&
  //     this.arrayholder.filter((item) => {
  //       console.log('item', item);
  //       const itemData =
  //         item != null &&
  //         `${item.toUpperCase()}   
  //                   ${item.toUpperCase()} ${item.toUpperCase()}`;
  //       const textData = text.toUpperCase();
  //       return itemData != null && itemData.toString().indexOf(textData) > -1;
  //     });
  //   // for (let i in newData) {
  //   //     data.push({
  //   //         'name': newData[i],
  //   //         'backGround': 'white'
  //   //     })
  //   // }
  //   if (newData != '') {
  //     this.setState({
  //       dataCheck: newData,
  //       company: text,
  //     });
  //   } else {
  //     newData.push(text);
  //     this.setState({
  //       dataCheck: newData,
  //       company: text,
  //     });
  //   }
  // };

  // Role checks and suggestion 
  // Block

  renderItemRole = (item, index) => {
    return (
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
              ? this.chooseRole(item, index)
              : this.suggestionTagRole(item, index)
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
                {library('highlight-off', hp(2.5), themeColor)}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  cheksRole = (text) => {
    if (text != '') {
      let newData = this.arrayholderRole.filter((item) => {
        const itemData =
          item != null &&
          `${item.cell.toUpperCase()}   
                  ${item.cell.toUpperCase()} ${item.cell.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData != null && itemData.toString().indexOf(textData) > -1;
      });

      newData = newData.filter((item) => !mg.includes(item.cell));
console.log('new',newData)
      newData =
        newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
      if (newData.length) {
        this.setState({
          RollCheck: newData,
          nameRole: text,
        });
      } else {
        this.setState({
          nameRole: text,
        });
      }
    } else {
      this.setState({
        nameRole: text,
      });
    }
  };

  suggestionTagRole = (elements, index) => {
    console.log('el', elements);
    if (typeof elements == 'object') {
      elements = elements.cell;
    }

    const {suggesionRole} = this.state;
    let m = suggesionRole;
    for (let i in suggesionRole) {
      if (m[i] == elements) {
        m.splice(i, 1);
      }
    }
    mg = m;

    this.arrayholderRole.filter((iterm) => {
      if (iterm.cell == elements) iterm.right = false;
    });
    this.setState({
      suggesionRole: m,
    });
  };

  chooseRole = (choose, index) => {
    let mgs = this.state.suggesionRole;
    mgs.push(choose.cell);
    mgs = [...new Set(mgs)];
    console.log('mg', mgs);

    let mni = [];
    mgs.filter((i) => i != choose.cell || (i != '' && mni.push(i)));
    this.setState(
      {
        suggesionRole: mgs,
        nameRole: '',
        showRole: !this.state.showRole,
      },
      () => {
        this.arrayholderRole.filter((iterm) => {
          if (iterm.cell == choose.cell) iterm.right = true;
        });
      },
    );
  };

  chooseskill = (choose, index) => {

    try {
      if (this.state.suggestionSkill.length >=5)
      {
        Alert.alert("Detail", "You have added 5 Skill", [{
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
      }, {
          text: "Done",
          onPress: () => this.setState({showSkill:false})
      }], {
          cancelable: false
      });
        return
  
      }
  else{
    let mgs = this.state.suggestionSkill
    mgs.push(choose);
    mgs = [...new Set(mgs)];
    console.log('mg', mgs)
    let {skillCheck } = this.state

    skillCheck.filter((iterm) => {
      if (iterm.cell == choose.cell) iterm.right = true;
    });
    let mni = [];
    mgs.filter((i) => i.cell != choose.cell || i != '' && mni.push(i))

    this.setState({
      suggestionSkill: mgs,
      name: '',
      skillCheck,
      showSkill: !this.state.showSkill,
    });
  }
}
catch(e){
  console.log('e',e);
}
  };



  chekskill = (text) => {

    try{
      if (text != ''){
  if (this.state.suggestionSkill.length >=5)
    {
      Alert.alert("Detail", "You have added 5 Skill", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "Done",
        onPress: () => this.setState({showSkill:false})
    }], {
        cancelable: false
    });
    this.setState({showSkill:false})
    return
    } else {

    let newData = this.arrayholders.filter(item => {
      const itemData = Items ? item && item.cell ? item.cell.english : `${item}` : item && item.cell ? item.cell.german : `${item}`
      const textData = text.toUpperCase();
      return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;
    });
    const { suggestionSkill } = this.state
    newData = newData.filter(item => !suggestionSkill.includes(item))
    newData = newData.length && newData.length < 10 ? newData : newData.slice(0, 10);

    if (newData.length) {
      this.setState({
        skillCheck: newData,
        name: text,
      });
    }else {
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
        skillCheck:d
      });
    }
  };
}
else {
  this.setState({
    name: text,
  });
}
    }
    catch(e){
      console.log('e',e);
    }
  };

  suggestionTagskill = (elements, index) => {

    const { suggestionSkill } = this.state;
    let m = suggestionSkill;
    for (let i in suggestionSkill) {
      if (m[i] == elements) {
        m.splice(i, 1);
      }
    }
    mg = m;

    // this.arrayholders.filter((iterm) => {
    //   if (iterm.cell == elements)
    //     iterm.right = false
    // })

    // let mp = this.arrayholders
    // let i = index
    // const map = function (mp, index) {
    //   if (index + 2 < mp.length && mp[index + 2].right == true) {
    //     mp.swap(index, index + 2);
    //     i = index + 2
    //     i < mp.length && map(mp, i)
    //   }
    // }
    // i < this.arrayholders.length ? map(mp, i) : i = index

    this.setState({
      suggestionSkill: m,
      // skillCheck: this.arrayholders,
    });
  };
  suggestionTag = (elements, index) => {
    const {
      suggesion,
      dataCheck
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
  remove = (item, index) => {
    const { suggestionSkill } = this.state;
    let m = suggestionSkill;
    console.log('m',m)
    for (let i in suggestionSkill) {
      if (m[i].cell == item) {
        m.splice(i, 1);
      }
    }
    mg = m;
    this.setState({
      suggestionSkill: m,
      // skillCheck: this.arrayholders,
    });
  };

  chooseJob = (choose, index) => {
    console.log('jo',choose);
    let mgJob = this.state.suggesionJob;
    mgJob.push(choose.cell);
    mgJob = [...new Set(mgJob)];
    // global.JobID = choose.cell.id
    let mni = [];
    mgJob.filter((i) => i != choose.cell.name || (i != '' && mni.push(i)));
    this.setState(
      {
        suggesionJob: mgJob,
        company: '',
        showJob: !this.state.showJob,
      },
      () => {
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

        this.arrayholderJob.filter((iterm) => {
          if (iterm.cell == choose.cell) iterm.right = false;
        });

        // console.log('tpind',Toind)
        //     this.arrayholder.swap(index, Toind)
      },
    );
  };

  cheksJob = (text) => {
    let newData = this.arrayholderJob.filter((item) => {
      console.log('item', item);
      const itemData =
        item.cell.name != null &&
        item.cell.name &&
        `${item.cell.name.toUpperCase()}   
                    ${item.cell.name.toUpperCase()} ${item.cell.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData != null && itemData.toString().indexOf(textData) > -1;
    });
    newData = newData.filter(
      (item) => !this.state.suggesionJob.includes(item.cell),
    );

    newData =
      newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
    if (newData.length) {
      this.setState({
        dataCheckJob: newData,
        company: text,
      });
    } else {
      this.setState({
        company: text,
      });
    }
  };

  suggestionTagJob = (elements, index) => {
    const {suggesionJob} = this.state;
    let m = suggesionJob;
    m = suggesionJob.filter((i) => i != elements)

    
    this.arrayholderJob.filter((iterm) => {
      if (iterm.cell == elements) iterm.right = false;
    });

   

    this.setState({
      suggesionJob: m,
      // dataCheck:this.arrayholder,
    });
  };

  renderItemJob = (item, index) => {
    return (
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
              ? this.chooseJob(item, index)
              : this.suggestionTagJob(item, index)
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
                fontSize: scale(18),
                color: item.right ? themeColor : themeWhite,
              }}>
              {item.cell.name}
            </Text>
            {item.right && (
              <View
                style={{
                  // top: scale(-7),
                  left: scale(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {library('highlight-off', scale(17), themeColor)}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };


  renderItems = (item, index) => {
    return (
      <View
        style={{
          width: 'auto',
          flexWrap: 'wrap', flexDirection: "row", margin: 2
        }}>
        <TouchableWithoutFeedback onPress={() => !item.right ? this.chooseskill(item, index) : this.suggestionTagskill(item, index)}>
          <View
            style={{
              alignItems: 'flex-start', borderWidth: item.cell != '' ? 1 : 0, borderColor: themeColor,
              borderRadius: 10, paddingHorizontal: 10,
              width: 'auto', backgroundColor: item.right ? 'white' : "transparent", borderColor: "#fff", flexDirection: "row", justifyContent: "center", alignItems: "center"
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp(2.7),
                color: item.right ? themeColor : themeWhite,
                width: 'auto'
              }} >
              {global.language ==  'english' ? item.cell.english : item.cell.german}
            </Text>
            {item.right && <View
              style={{
                // top: scale(-7),
                right: scale(5), justifyContent: "center", alignItems: "center"
              }}>
              {library('highlight-off', hp(2.5), themeColor)}
            </View>}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    const {
      Hourly,
      Monthly,
      Yearly,
      ByDistance,
      ByLocation,
      name,
      Employed,
      Internship,
      StudentJobs,
      HelpingVacancies,
      Freelancer,
      FullTime,
      PartTime, showSkill,showRole,suggesion,suggesionRole,RollCheck,suggesionJob,dataCheckJob
    } = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={false} backgroundColor={themeWhite} barStyle='dark-content' />
          <Modal
              testID={'modal'}
              isVisible={this.state.ByLocation}
              onBackdropPress={() =>
                this.setState({
                  ByLocation: false,
                })
              }
              onBackButtonPress={() =>
                this.setState({
                  ByLocation: false,
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
                <View style={{alignItems:"center",top:-40,marginBottom : -34,backgroundColor:"transparent"}}>
                <TouchableOpacity 
                style={{height:hp(4),width:hp(4),justifyContent:"center",
                alignItems:'center',backgroundColor:"white",
                borderRadius:hp(2),borderWidth:1,borderColor:"white"}} onPress={()=> this.setState({bottomModal:false})} hitSlop={{left:100,right:100,top:20,bottom:20}}>
                {play('close',hp(3),'gray')}
                </TouchableOpacity>
                </View>
                <FlatList
                  data={this.state.modalData}
                  removeClippedSubviews={true}
                  initialNumToRender={5}
                  maxToRenderPerBatch={10}
                  ItemSeparatorComponent = { this.FlatListItemSeparator }
                  ListHeaderComponent={this.ListHeader}
                  updateCellsBatchingPeriod={70}
                  getItemLayout={(data, index) => ({
                    length: hp('10%'),
                    offset: hp('10%') * index,
                    index,
                  })}
                  renderItem={({item, index}) => this.renderItemModal(item, index)}
                  keyExtractor={(item, index) => index + ''}
                />
              </View>
            </Modal>
          <NavigationHead
            centerComponent="Edit Filter"
            rightComponent="Exit"
            onPress={() => this.Back()}
            onExit={() => this.Exit()}
          />
          <View style={{ height: 1, width: "100%", backgroundColor: 'gray', marginTop: 3 }} />
          <View style={styles.FilterMainView}>
            <ScrollView
              style={styles.FilterScroll}
              nestedScrollEnabled={true}>
              <DropDownItem
                style={[
                  styles.FilterDropDown,
                  {
                    marginTop: scale(5),
                  },
                ]}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={minimumSalary}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text='Minimum_Salary' />
                  </View>
                }>
                <View style={styles.FilterMinimumSalary}>
                  <View style={styles.FilterMinimumSalaryMin}>
                    <Text style={styles.FilterMinText}>
                      {this.state.salary}
                    </Text>
                    <Text style={styles.FilterMaxText}>
                      {this.state.salaryMax}+
                      </Text>
                  </View>
                  <Slider
                    style={styles.FilterMinimumSalarySlider}
                    gravity={'center'}
                    min={0}
                    max={150000}
                    step={1}
                    ref={this.slider}
                    selectionColor={themeColor}
                    blankColor="#B0b0b0"
                    labelBackgroundColor={themeColor}
                    labelBorderColor={'#b0b0b0'}
                    onValueChanged={(low, high, fromUser) => {
                      this.setState({
                        salary: low,
                        salaryMax: high,
                      });
                    }}
                  // style={styles.FilterMinimumSalarySlider}
                  // minimumValue={0}
                  // maximumValue={150}
                  // onValueChange={ value => {
                  //     this.setState({
                  //         salary: Math.round(value),
                  //     });
                  // }}
                  // minimumTrackTintColor={themeColor}
                  // maximumTrackTintColor={themeColor}
                  />
                </View>
              </DropDownItem>
              <DropDownItem
                // key={i}
                style={styles.FilterDropDown}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                HeaderStyle={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={salaryType}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text='Salary_Type' />
                  </View>
                }>
                <View style={{
                  flexDirection: 'row',
                  marginBottom: scale(10),
                  marginLeft: scale(10),
                  alignItems: "center",
                  flexWrap: "wrap"
                  // paddingHorizontal:"5%"
                }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", height: hp(6), width: "100%" }}>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        Hourly: !Hourly,
                      });
                    }} style={{ borderColor: Hourly ? themeColor : '#000', backgroundColor: Hourly ? themeColor : themeWhite, width: "44%", justifyContent: "center", alignItems: "center", borderRadius: scale(30), borderWidth: 1, paddingHorizontal: scale(10) }}>
                      <Texting style={[{ color: Hourly ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='Hourly' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        Monthly: !Monthly,
                      });
                    }} style={{ borderColor: Monthly ? themeColor : '#000', backgroundColor: Monthly ? themeColor : themeWhite, width: "44%", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: scale(30), paddingHorizontal: scale(10), marginRight: "8%" }}>
                      <Texting style={[{ color: Monthly ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='Monthly' />
                    </TouchableOpacity>

                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", height: hp(6), width: "100%", marginTop: scale(15) }}>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        Yearly: !Yearly,
                      });
                    }} style={{ borderColor: Yearly ? themeColor : '#000', backgroundColor: Yearly ? themeColor : themeWhite, width: "44%", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: scale(30), paddingHorizontal: scale(10) }}>
                      <Texting style={[{ color: Yearly ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='Yearly' />
                    </TouchableOpacity>
                  </View>
                </View>
              </DropDownItem>
              <DropDownItem
                // key={i}
                style={styles.FilterDropDown}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={skill}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text='Skill' />
                  </View>
                }>
                <ScrollView style={{ alignSelf: "stretch", height: hp(30) }} nestedScrollEnabled
                >
                  <CustomInput
                  value={name}
                    placeholder={'Add Skill'}
                    textChange={(text) => {
                      this.setState({
                        showSkill: text != '' ? true : false,
                      });
                      this.chekskill(text);
                    }}
                    inputContainerStyle={{
                      backgroundColor: themeColor,
                      height: hp(6.5),
                      // width: "100%",
                      borderColor: themeColor,
                      borderWidth: scale(1),
                      borderRadius: scale(5),
                    }}
                    inputStyle={{
                      color: 'white',
                      fontSize:  hp(2.7),
                      fontFamily: 'Roboto-Bold',
                      fontWeight: 'bold',
                    }}
                    containerStyle={{
                      width: wp(85),
                    }}
                    placeholderTextColor={themeWhite}
                    iconName={iconSearch}
                    iconStyle={{
                      height: hp(3),
                      width: hp(3),
                    }}
                    iconColor={'#fff'}
                  />
                  {showSkill && (
                    <View
                      style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flexGrow: 0,
                        flex: 1,
                        marginTop: this.state.showSkill ? -10 : 1,
                        width: wp(80),
                        marginHorizontal: wp(2.5),
                        backgroundColor: themeColor
                      }}
                    >
                      <FlatList
                        nestedScrollEnabled
                        data={this.state.skillCheck}
                        style={{ flex: 1 }}
                        keyboardShouldPersistTaps="always"
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: "flex-start", flexDirection: 'row', paddingLeft: 30, flexWrap: "wrap" }}
                        removeClippedSubviews={true}
                        renderItem={({ item, index }) => this.renderItems(item, index)}
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
                  {!showSkill && (

                    <FlatList
                      data={this.state.suggestionSkill}
                      extraData={this.state.suggestionSkill}
                      nestedScrollEnabled
                      style={{ flex: 1 }}
                      keyboardShouldPersistTaps="always"
                      contentContainerStyle={{ paddingLeft: 5 }}
                      showsHorizontalScrollIndicator={false}
                      removeClippedSubviews={true}
                      renderItem={({ item, index }) => <Itemskill item={item} index={index} handleChange={this.handleChange} remove={this.remove} />}
                      initialNumToRender={5}
                      maxToRenderPerBatch={10}
                      updateCellsBatchingPeriod={70}
                      getItemLayout={(data, index) => ({
                        length: hp('1%'),
                        offset: hp('1%') * index,
                        index,
                      })}
                      keyExtractor={(item, index) => index + ''}
                    />)}
                </ScrollView>
              </DropDownItem>
              <DropDownItem
                // key={i}
                style={styles.FilterDropDown}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={skillCategory}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text='Skill_Category' />
                  </View>
                }>
               <ScrollView
                  style={{alignSelf: 'stretch', height: hp(30)}}
                  nestedScrollEnabled>
                  <CustomInput
                  value={this.state.nameRole}
                    placeholder={'Search for Role'}
                    textChange={(text) => {
                      this.setState({
                        showRole: text != '' ? true : false,
                      });
                      this.cheksRole(text);
                    }}
                    inputContainerStyle={{
                      backgroundColor: themeColor,
                      height: hp(6.5),
                      // width: "100%",
                      borderColor: themeColor,
                      borderWidth: scale(1),
                      borderRadius: scale(5),
                    }}
                    inputStyle={{
                      color: 'white',
                      fontSize: hp(2.7),
                      fontFamily: 'Roboto-Bold',
                      fontWeight: 'bold',
                    }}
                    containerStyle={{
                      width: wp(85),
                    }}
                    placeholderTextColor={themeWhite}
                    iconName={iconSearch}
                    iconStyle={{
                      height: hp(3),
                      width: hp(3),
                    }}
                    iconColor={'#fff'}
                    // onSubmitEditing={(event) =>
                    //   this.addsSkill(event.nativeEvent.text)
                    // }
                  />
                  {!showRole && (
                    <SafeAreaView
                      style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flexGrow: 0,
                        marginTop: this.state.showRole
                          ? this.state.natHeight
                          : 1,
                        width: wp(80),
                        height: suggesion != [] && scale(95),
                      }}>
                      <ScrollView
                        contentContainerStyle={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <>
                        {suggesionRole &&
                          suggesionRole.map((elements, index) => (
                            <SuggestionView
                              textColor={'#fff'}
                              backGroundC={themeColor}
                              onPress={() =>
                                this.suggestionTagRole(elements, index)
                              }
                              elements={elements}
                              index={index}
                            />
                          ))}
                          </>
                      </ScrollView>
                    </SafeAreaView>
                  )}
                  {this.state.showRole && (
                    <View
                      style={{
                        width: wp(80),
                        borderRadius: scale(5),
                        height: 'auto',
                        marginHorizontal: wp(2),
                        backgroundColor: themeColor,
                        top: this.state.showRole ? scale(-10) : 1,
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
                        data={RollCheck}
                        keyboardShouldPersistTaps="always"
                        renderItem={({item, index}) =>
                          this.renderItemRole(item, index)
                        }
                      />
                    </View>
                  )}
                </ScrollView>
              </DropDownItem>
              <DropDownItem
                // key={i}
                style={styles.FilterDropDown}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                HeaderStyle={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={Filterjobtype}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text='Job_Type' />
                  </View>
                }>
                 <ScrollView
                  style={{alignSelf: 'stretch', height: 'auto'}}
                  nestedScrollEnabled>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: hp(6),
                      width: '100%',
                      marginBottom: 3,
                    }}>
                    <Categoryskill
                      name="FullTime"
                      bool={FullTime}
                      onPress={() =>
                        this.setState({
                          FullTime: !FullTime,
                        })
                      }
                    />
                    <Categoryskill
                      name="Part_time"
                      bool={PartTime}
                      onPress={() =>
                        this.setState({
                          PartTime: !PartTime,
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: hp(6),
                      width: '100%',
                      marginBottom: 3,
                    }}>
                    <Categoryskill
                      name="Employed"
                      bool={Employed}
                      onPress={() =>
                        this.setState({
                          Employed: !this.state.Employed,
                        })
                      }
                    />
                    <Categoryskill
                      name="Internship"
                      bool={Internship}
                      onPress={() =>
                        this.setState({
                          Internship: !this.state.Internship,
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: hp(6),
                      width: '100%',
                      marginBottom: 3,
                    }}>
                    <Categoryskill
                      name="Student_jobs"
                      bool={StudentJobs}
                      onPress={() =>
                        this.setState({
                          StudentJobs: !this.state.StudentJobs,
                        })
                      }
                    />
                    <Categoryskill
                      name="Freelancers"
                      bool={Freelancer}
                      onPress={() =>
                        this.setState({
                          Freelancer: !this.state.Freelancer,
                        })
                      }
                    />
                  </View>
                  <View
                    style={{flexDirection: 'row', height: hp(6), width: '100%',justifyContent:'center'}}>
                    <Categoryskill
                      name="Helping_Vacancies"
                      bool={HelpingVacancies}
                      onPress={() =>
                        this.setState({
                          HelpingVacancies: !this.state.HelpingVacancies,
                        })
                      }
                    />
                  </View>
                </ScrollView>
              </DropDownItem>
              <DropDownItem
                // key={i}
                flag={true}
                style={styles.FilterDropDown}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={company}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text="Search_Job" />
                  </View>
                }>
                <Compon
                  textChange={(text) => {
                    this.setState({
                      showJob: text != '' ? true : false,
                    });
                    this.cheksJob(text);
                  }}
                  value={this.state.company}
                  style={{
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    flex: 1,
                    height: hp(30),
                    marginTop: this.state.showJob ? 50 : 1,
                    width: wp(87),
                    height: suggesionJob != [] && 100,
                    paddingLeft: 7,
                  }}
                  suggesion={suggesionJob}
                  show={this.state.showJob}
                  styleFlat={{
                    width: wp(80),
                    marginHorizontal: wp(2.5),
                    borderRadius: scale(5),
                    height: hp(22),
                    flex: 1,
                    top: scale(50),
                    marginBottom: 30,
                    position: 'absolute',
                    backgroundColor: themeColor,
                  }}
                  onLayout={(e) =>
                    this.setState({natHeight: e.nativeEvent.layout.height})
                  }
                  dataCheck={dataCheckJob}
                  renderItem={({item, index}) => this.renderItemJob(item, index)}
                  scrl={
                    suggesionJob &&
                    suggesionJob.map((elements, index) => (
                      <SuggestionView
                        textColor={'white'}
                        backGroundC={themeColor}
                        onPress={() => this.suggestionTagJob(elements, index)}
                        elements={elements.name}
                        index={index}
                      />
                    ))
                  }
                />
              </DropDownItem>
              <DropDownItem
                // key={i}
                flag={true}
                style={styles.FilterDropDown}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                header={
                  <View style={styles.FilterDropDownInnerView}>
                    <View style={styles.fliterIcon}>
                      <Image
                        source={searchType}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <Texting style={styles.DropDownHeader} text='Search_Type' />
                  </View>
                }>
                <View style={{
                  flexDirection: 'row',
                  marginBottom: scale(10),
                  marginLeft: scale(10),
                  alignItems: "center",
                  flexWrap: "wrap"
                  // paddingHorizontal:"5%"
                }}>
                  <View style={styles.PersonalInfoChoose}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", height: hp(6), width: "100%" }}>
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          ByDistance: !ByDistance,
                        }, () => this.props.navigation.navigate('UserScreenMap'));
                      }} style={{ borderColor: ByDistance ? themeColor : '#000', backgroundColor: ByDistance ? themeColor : themeWhite, width: "44%", justifyContent: "center", alignItems: "center", borderRadius: scale(30), borderWidth: 1, paddingHorizontal: scale(10) }}>
                        <Texting style={[{ color: ByDistance ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='ByDistance' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          ByLocation: !ByLocation,
                        },() => {
                            if (!this.state.modalData.length){
                              this.props.navigation.navigate('UserScreenMap')
                            }
                          });
                      }} style={{ borderColor: ByLocation ? themeColor : '#000', backgroundColor: ByLocation ? themeColor : themeWhite, width: "44%", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: scale(30), paddingHorizontal: scale(10), marginRight: "8%" }}>
                        <Texting style={[{ color: ByLocation ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='ByLocation' />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </DropDownItem>
              <View style={{ height: scale(200), width: "100%", backgroundColor: "transparent" }} />
            </ScrollView>
          </View>
          {this.state.keyboardShown == false && <ApplyFilterButton reset='Reset' apply='Apply' 
          onReset={() => {
            
            Alert.alert("Reset", "Are you sure you want to clear the Search criteria", [{
                                text: "No",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            }, {
                                text: "Yes",
                                onPress: () => {
            this.setState(
            JSON.parse(JSON.stringify(defaultState))
          )
            this.slider.current.setHighValue(150000)
            this.slider.current.setLowValue(0)
            // this.props.navigation.goBack();
            global.Job_Location = []

            // let temp ={}
            //                         let modalData = global.Job_Location.map(item => {
            //                                                         temp={
            //                                                         ...item,
            //                                                         flag:false
            //                                                         }
            //                                                   return temp
            //                                                       })
            //                                                       this.setState({modalData})
            global.Job_Title = [];
                                    global.Company = [];
                                    // global.region = {}
                                    global.reset = true
                                    global.Anywhere = false
                                    global.FullTime = false
                                    global.Employed = false
                                    global.PartTime = false;
                                    global.Internship = false;
                                    global.StudentJobs = false;
                                    global.HelpingVacancies = false;
                                    global.Freelancer = false;

          }
            }], {
                                cancelable: false
                            });
          }} onApply={this.save} />}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(FilterUser);
