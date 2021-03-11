import React, { Component } from 'react'
import { Input, Icon, Image } from 'react-native-elements'
import { themeColor, themeWhite } from '../Constant/index'
import { View } from 'react-native'
import { scale } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { play,library } from '../src/IconManager'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default CustomInput = (props) => <Input
    containerStyle={[{
        width: props.width ? props.width : wp('70%'),
        alignSelf: 'center',
        // paddingBottom: scale(-20),
        marginVertical: scale(-5),
    }, props.containerStyle]}
    inputContainerStyle={[{
        height: scale(40),
        width: '92%',
        alignSelf: 'center',
        borderBottomColor: themeWhite,
        borderBottomWidth: 1,
        borderRadius: scale(5),
        backgroundColor: "transparent",
        marginBottom: scale(-6)
    }
        , props.inputContainerStyle]}
    inputStyle={[{
        fontSize: scale(16),
        color: themeWhite
    }, props.inputStyle]}
    keyboardType = {props.keyboardType ? props.keyboardType : 'default'  }
    placeholder={props.placeholder}
    placeholderTextColor = {themeWhite}
    value = {props.value}
    underlineColorAndroid = {'transparent'}
    multiline = {props.multiline}
    secureTextEntry = {
    props.pass
    }
    onChangeText = {
    (text) => props.textChange(text)
    }
    errorStyle = {
    {
        color: 'red'
    }
    }
    // leftIcon = {
    // <View style={{
    //     marginLeft: 10
    // }}>
    // </View>
    // }
    leftIconContainerStyle = {
    {
        padding: 0
    }
    } { ...props
    }
    rightIcon = {
    <View style={{
        marginRight: props.pass  ? 0 : 0,
    }}>
     {props.passs && <View onStartShouldSetResponder={props.onPress}>
                {library(props.pass ? 'visibility-off' :'visibility',20,'#fff')}</View>
    }
    </View>
    }
    rightIconContainerStyle = {[
        {
            padding: 0
        }, props.rightIconContainerStyle]
    }
    { ...props}
    />