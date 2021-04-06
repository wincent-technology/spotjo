import React,{Component} from 'react'
import {View,Text,ImageBackground,Button} from 'react-native'
import SettingsList from '../Component/SettingComponent'
import {play} from '../src/IconManager'
import LanguageProvider, { LanguageContext } from '../Constant/LanguageContext';
import Texting from '../Constant/Text'
import {
    NavigationHead
  } from '../Component/ViewManager';

class Setting extends Component {
    state={
        rotateChange:global.language == 'english' ? false : true
    }
    onRotateChange = (value,data) => {
        console.log('value', value,data)
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
<SettingsList borderColor='gray'>
                                      <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('help-circle',22,'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:16
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('chevron-forward',22,'gray')}</View>}
                                    arrowStyle={{height:20,width:20,tintColor:'gray'}}
                                    title={global.language == 'english' ? 'FAQ' : 'german'}
                                      />
                                  </SettingsList>
                                  <SettingsList borderColor='gray' defaultItemSize={50} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('information-circle',22,'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:16
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('chevron-forward',22,'gray')}</View>}
                                    arrowStyle={{height:20,width:20,tintColor:'gray'}}
                                    title={global.language == 'english' ? 'Information' :'german'} 
                                      />
                                  </SettingsList>
                                  <SettingsList borderColor='gray' defaultItemSize={50} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('chatbox-ellipses',22,'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:16
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('chevron-forward',22,'gray')}</View>}
                                    arrowStyle={{height:20,width:20,tintColor:'gray'}}
                                    title={global.language == 'english' ? 'Contact' : 'german'}
                                      />
                                  </SettingsList>
                                  <LanguageContext.Consumer>
                                        {(data) => {
                                        return (
                                            <SettingsList borderColor='gray' defaultItemSize={50} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('language',22,'gray')}</View>}
                                        hasSwitch={true}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:16
                                    }}
                                    switchState = {
                                        this.state.rotateChange
                                    }
                                    switchOnValueChange = {(value) => this.onRotateChange(value,data)}
                                    hasNavArrow = {
                                        false
                                    }
                                    titleInfo={this.state.rotateChange == false ? 'English' : 'German'}
                                            titleInfoStyle={{
                                                    fontSize:16,
                                        color: '#343434'
                                                }}
                                        title={global.language == 'english' ? 'Change Language' : 'german german'}
                                      />
                                  </SettingsList>
                                        );
                                        }}
                                    </LanguageContext.Consumer>
                                  
                                  <SettingsList borderColor='gray' defaultItemSize={50} padding={5}>
                                  <SettingsList.Item
                                        icon={<View style={{justifyContent:"center"}}>{play('person-circle',22,'gray')}</View>}
                                        hasSwitch={false}
                                        backgroundColor={'#fff'}
                                        titleStyle={{
                                        color:'#000',
                                        fontSize:16
                                    }}
                                    arrowIcon={<View style={{justifyContent:"center",paddingRight:5}}>{play('log-out',22,'gray')}</View>}
                                    arrowStyle={{height:20,width:20,tintColor:'gray'}}
                                    title={global.language == 'english' ? 'LogOut' : 'german'}
                                      />
                                  </SettingsList>
                                  </View>

    )
}
  }


  export default Setting