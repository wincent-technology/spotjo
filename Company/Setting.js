import React,{Component} from 'react'
import {View,Text,ImageBackground,Button,Alert,Image} from 'react-native'
import SettingsList from '../Component/SettingComponent'
import {play} from '../src/IconManager'
import LanguageProvider, { LanguageContext } from '../Constant/LanguageContext';
import Texting from '../Constant/Text'
import { heightPercentageToDP as hp } from '../Component/responsive-ratio';

import {
    NavigationHead
  } from '../Component/ViewManager';

class Setting extends Component {
    state={
        rotateChange:global.language == 'english' ? false : true
    }
    onRotateChange = (data) => {
        // console.log('value', value,data)
        this.setState({
            rotateChange: !this.state.rotateChange
        })
        data.changeLanguage(global.language == 'english' ? 'german' :'english');
        global.language == 'english' ? 'german' : 'english' 
    }
    Back = () => {
        this.props.navigation.goBack()
    }

    render(){
    return (
        <View style={{backgroundColor:"#fff"}}>
       <NavigationHead

            centerComponent={global.language == 'english' ? "Setting" : 'german'}
            onPress={() => this.Back()}
          />
<SettingsList borderColor='gray' defaultItemSize={hp(7)}>
                                      <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('help-circle',hp(3.3),'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:hp(2.5)
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('chevron-forward',hp(3.3),'gray')}</View>}
                                    arrowStyle={{height:20,width:20,tintColor:'gray'}}
                                    title={global.language == 'english' ? 'FAQ' : 'german'}
                                      />
                                  </SettingsList>
                                  <SettingsList borderColor='gray' defaultItemSize={hp(7)} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('information-circle',hp(3.3),'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:hp(2.5)
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('chevron-forward',hp(3.3),'gray')}</View>}
                                    arrowStyle={{height:20,width:20,tintColor:'gray'}}
                                    title={global.language == 'english' ? 'Information' :'german'} 
                                      />
                                  </SettingsList>
                                  <SettingsList borderColor='gray' defaultItemSize={hp(7)} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('chatbox-ellipses',hp(3.3),'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:hp(2.5)
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('chevron-forward',hp(3.3),'gray')}</View>}
                                    arrowStyle={{height:hp(3.1),width:hp(3.1),tintColor:'gray'}}
                                    title={global.language == 'english' ? 'Contact' : 'german'}
                                      />
                                  </SettingsList>
                                  <LanguageContext.Consumer>
                                        {(data) => {
                                        return (
                                            <SettingsList borderColor='gray' defaultItemSize={hp(7)} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>
                                        <Image source={
                                            global.language == 'english' ? require('../Img/uk.png') :require('../Img/germany.png')}
                                             style={{height:hp(3.1),width:hp(3.1),borderRadius:hp(1.55)}} />
                                        </View>}
                                        hasSwitch={false}
                                        butt={true}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:hp(2.5)
                                    }}
                                    // switchState = {
                                    //     this.state.rotateChange
                                    // }
                                    onPress={()=> this.onRotateChange(data)}

                                    oncheng={() => console.log('this')}
                                    // {/* switchOnValueChange = {(value) => this.onRotateChange(value,data)} */}
                                    langchange={this.state.rotateChange}
                                    texting={global.language == 'english' ? 'English' : 'German'}
                                    hasNavArrow = {
                                        false
                                    }
                                    // titleInfo={this.state.rotateChange == false ? 'English' : 'German'}
                                            titleInfoStyle={{
                                                    fontSize:hp(2.5),
                                        color: '#343434'
                                                }}
                                        title={global.language == 'english' ? 'Change Language' : 'german german'}
                                      />
                                  </SettingsList>
                                        );
                                        }}
                                    </LanguageContext.Consumer>
                                  
                                  <SettingsList borderColor='gray' defaultItemSize={hp(7)} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('person-circle',hp(3.3),'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:hp(2.5)
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('log-out',hp(3.3),'gray')}</View>}
                                    arrowStyle={{height:hp(3.1),width:hp(3.1),tintColor:'gray'}}
                                    title={global.language == 'english' ? 'Logout' : 'german'}
                                    onPress={()=> 
                                        {Alert.alert(
                                                    'Logout',
                                                    'Do you really want to logout', [{
                                                        text: 'no',
                                                        onPress: () => {}
                                                        
                                                    },{
                                                        text: 'yes',
                                                        onPress: () => this.props.navigation.navigate('CompanyLogin')
                                                    }
                                                    ], {
                                                        cancelable: false
                                                    }
                                                );}
                                    }
                                      />
                                  </SettingsList>
                                  </View>

    )
}
  }
  export default Setting