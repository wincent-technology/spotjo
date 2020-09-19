import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, StatusBar, ImageBackground, Dimensions, Text, FlatList, Image, View, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { scale } from './Util';
import CustomInput from '../Component/Input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { switchColor, Background, themeColor } from '../Constant/index'
import ToggleSwitch from '../Component/ToggleSwitch'
import styles from './Style';
import http from '../api';
import SnackBar from '../Component/SnackBar'



class FavoriteCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Select Company',
            Anywhere: false,
            dataCheck: []
        };
        this.arrayholder = [];
    }

    next = () => {
        global.Company = this.state.name;
        global.Anywhere = this.state.Anywhere;
        this.props.navigation.navigate('ChooseTalent')
    }
    back = () => {
        this.props.navigation.goBack();
    }
    DisplaySnackBar = (msg) => {
        this.refs.ReactNativeSnackBar.ShowSnackBarFunction(msg);
    };
    componentDidMount() {

        try {
            http.GET('api/appcomjson/get').then((res) => {
                if (res['data']['status']) {
                    this.setState({
                        dataCheck: res['data']['result'],
                    });
                    this.arrayholder = res['data']['result'];
                //            //will get data in this    res['data']['result']
                } else {
                    this.DisplaySnackBar(res['data']['message'])
                }
            }, err => alert(JSON.stringify(err)));
        } catch ( error ) {
            this.DisplaySnackBar(error)

        }
    }
    choose = (choose) => {
        this.setState({
            name: choose
        })
    }

    renderItem = (item, index) => {
        return (
            <View style={{
                width: wp(80),
                marginLeft: scale(34)
            }}><TouchableWithoutFeedback onPress={() => this.choose(item)}><Text style={{
                fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor
            }}>{item}</Text></TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        const {Anywhere, name} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
            <SnackBar ref="ReactNativeSnackBar" />
            <View style={styles.MainFlex}>
        <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={styles.HeadingText}><Text style={[{
                fontSize: scale(24),
                textAlign: 'center'
            }, styles.FontSty]} > Favourite Company ? </Text></View>< View style = {
            {
                top: scale(20)
            }}><CustomInput placeholder = {this.state.name} textChange = {
            (text) => {
                const newData = this.arrayholder.filter(item => {
                    const itemData = `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                this.setState({
                    dataCheck: newData
                })
            }} inputStyle={{
                fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor

            }}
            iconStyle={{
                height: 25,
                width: 25
            }}
            /></View>
            <View style={{
                width: wp(87),
                borderRadius: scale(5),
                height: hp(12),
                backgroundColor: "#fff"
            }}><FlatList
            data = {this.state.dataCheck}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => this.renderItem(item, index)}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('1%'),
                offset: hp('1%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            /></View>
            </View>
              <View style={{
                flex: 1,
                flexDirection: "row",
            }}><View style={[{
                top: hp('23%'),
                left: wp('7%'),
            }, styles.MainSwitchView]}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Anywhere}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Anywhere: toggle
            })}
            /></View><Text style={[{
                marginLeft: scale(5),
                fontSize: scale(20),
            }, styles.FontSty]}>Anywhere?</Text></View>
             <View style={{
                flexDirection: "row",
                width: wp(100),
                top: hp(28)
            }}>
            <View style={{
                alignItems: "flex-start",
                width: wp(40),
                marginLeft: wp(7)
            }}>
            <TouchableWithoutFeedback style={styles.Size} onPress={this.back}><View  style={styles.Size}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Back</Text></View></TouchableWithoutFeedback>
            </View>
            <View style={{
                alignItems: 'flex-end',
                // right: wp(7),
                width: wp(47)
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
            </View></View></View>
        </ImageBackground></SafeAreaView>
        )
    }
}
;

export default withNavigationFocus(FavoriteCompany);