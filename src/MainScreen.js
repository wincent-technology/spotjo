import React, {
  Component
} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from './Style';
import {
  scale,
  getStatusBarHeight
} from './Util';
import {
  play
} from '../src/IconManager';
import {
  Background,
  themeColor
} from '../Constant/index';
import Texting from '../Constant/Text'
import { heightPercentageToDP as hp } from '../Component/responsive-ratio';



// function Book(type,name){
          
//   this.type = type;
//   this.name = name;
//   this.getd = function () {
//       return this.type + ' sddf ' + this.name; 
//   }
  
//   }

const MainScreen = (props) => {

  const Opportunities = async () => {

  //  let obj =  [{
  //     "name": ".profig.os",
  //     "path": "/.profig.os"
  //   }, {
  //     "name": "Besharam Bewaffa fullscreen whatsapp status   B Praak   Besharam Bewafa Status   Sad Status   Song.mp4",
  //     "path": "/Besharam Bewaffa fullscreen whatsapp status   B Praak   Besharam Bewafa Status   Sad Status   Song.mp4"
  //   }]
    // id.substr(id.length - 5);
    // let result =obj.filter(item => item.name.substr(item.name.length - 3) == 'mp4')
// console.log('result',result)
    // let aoa = [['one',1],['two','2']]


    // aoa.filter(item => {
    //   let b = item.map(i => i.shift())
    //   console.log('b',b)
    // })

    // const columnNames = aoa.shift(); // Separate first row with column names
    // const objs = aoa.map((row) => { // Map the rest of the rows into objects
    //   const obj = {}; // Create object literal for current row
    //   row.filter((cell, i) => obj[columnNames[i]] = cell );// Use index from current cell to get column name, add current cell to new object
    //   return obj;
    // });
    // console.log('objs'); // Display the array of objects on the console

    // console.log('get',getStatusBarHeight())

            props.navigation.navigate('TalentScreen');
            // props.navigation.navigate('test');


          //     var book = new Book ('man','name');
          //     var m = new Book ('maan','name');

          // console.log('>>',book.getd(),m);
              

  };
  const Login = async () => {
        props.navigation.navigate('LoginFirst');
  };
  const playVideo = () => {
    props.navigation.navigate('Youtube');
  };
  const create = () => {
    props.navigation.navigate('LoginFirst');
  };

    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <TouchableOpacity style={styles.Homeplay} onPress={playVideo}>
            <View style={{paddingLeft:5}}>
              {play('videocam', hp(3.5), '#fff')}
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.Homelogin,
              {
                borderBottomWidth: scale(0.5),
                borderBottomColor: 'white',
                paddingBottom: scale(0.5),  
              },
            ]}>
            <TouchableWithoutFeedback onPress={Login}>
              <Texting
                style={[
                  {
                    fontSize: hp(3),
                    fontWeight: 'bold',
                  },
                  styles.Hometext,
                ]} text='Login'/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.HomeLogo}>
            <Image
              source={require('../Img/logo-spotjo.png')}
              resizeMode={'contain'}
              style={styles.imageStyle}
            />
          </View>
          
          <View style={styles.HomebutGuest}>
            <TouchableWithoutFeedback
              style={styles.OpportunityView}
              onPress={Opportunities}>
              <View style={styles.TalentView}>
                <Texting style={styles.OppoTalentText} text='Guest'/>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.CompanyLoginAccountText}>
            <Texting
              style={[
                {
                  fontSize: hp(3.5),
                },
                styles.FontSty,
              ]} text='Dont_Have_Account'/>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Texting
                style={[
                  {
                    fontSize: hp(3),
                  },
                  styles.FontSty,
                ]} text='Create_new_account'/>
              <TouchableWithoutFeedback onPress={create}>
                <Texting
                  style={[
                    {
                      textDecorationLine: 'underline',
                      // textDecorationColor: "#fff",
                      fontSize: hp(3),
                    },
                    styles.FontSty,
                  ]} text='Click_here'/>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
}
export default withNavigationFocus(MainScreen);