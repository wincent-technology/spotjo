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
} from './Util';
import {
  play
} from '../src/IconManager';
import {
  Background,
  themeColor
} from '../Constant/index';
import Texting from '../Constant/Text'




class MainScreen extends Component {

  Opportunities = async () => {
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
    // console.log(objs); // Display the array of objects on the console

            // this.props.navigation.navigate('TalentScreen');
            this.props.navigation.navigate('test');

  };
  Login = async () => {
        this.props.navigation.navigate('LoginFirst');
  };
  playVideo = () => {
    this.props.navigation.navigate('Youtube');
  };
  create = () => {
    this.props.navigation.navigate('LoginFirst');
  };

  render() {
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <TouchableOpacity style={styles.Homeplay} onPress={this.playVideo}>
            <View style={{paddingLeft:5}}>
              {play('videocam', scale(20), '#fff')}
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
            <TouchableWithoutFeedback onPress={this.Login}>
              <Texting
                style={[
                  {
                    fontSize: scale(20),
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
              onPress={this.Opportunities}>
              <View style={styles.TalentView}>
                <Texting style={styles.OppoTalentText} text='Guest'/>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.CompanyLoginAccountText}>
            <Texting
              style={[
                {
                  fontSize: scale(23),
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
                    fontSize: scale(19),
                  },
                  styles.FontSty,
                ]} text='Create_new_account'/>
              <TouchableWithoutFeedback onPress={this.create}>
                <Texting
                  style={[
                    {
                      textDecorationLine: 'underline',
                      // textDecorationColor: "#fff",
                      fontSize: scale(19),
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
}
export default withNavigationFocus(MainScreen);