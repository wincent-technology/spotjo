import React, { Component } from 'react'
import { Input, Icon, Image } from 'react-native-elements'
import { themeColor } from '../Constant/index'
import { View } from 'react-native'
import { scale } from '../src/Util'
import { play } from '../src/IconManager'

export default CustomInput = (props) => <Input
    containerStyle={[{
        width: '100%',
        alignSelf: 'center',
        marginVertical: 6,
    }, props.containerStyle]}
    inputContainerStyle={[{
        height: props.height ? props.height : scale(45),
        width: props.width ? props.width : '92%',
        alignSelf: 'center',
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 0.3,
        borderRadius: scale(5),
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#fff"
    }
        , props.inputContainerStyle]}
    inputStyle={[{
        fontSize: props.fontSize ? props.fontSize : scale(16),
        color: props.color ? props.color : themeColor,
        fontWeight: props.fontWeight ? props.fontWeight : 'normal'
    }, props.inputStyle]}
    keyboardType = {props.keyboardType ? props.keyboardType : 'default'  }
    placeholder={props.placeholder}
    placeholderTextColor = {props.placeholderTextColor ? props.placeholderTextColor : themeColor}
    value = {props.value}
    underlineColorAndroid = {'transparent'}
    multiline = {props.multiline}
    secureTextEntry = {
    props.secureTextEntry
    }
    onChangeText = {
    (text) => props.textChange ? props.textChange(text) : null
    }
    onSubmitEditing = {
    (text) => props.onSubmitEditing ? props.onSubmitEditing(text) : null
    }
    errorStyle = {
    {
        color: 'red'
    }
    }
    leftIcon = {
    <View style={{
        marginLeft: 10
    }}>
    <Image
    source = {props.iconName ? props.iconName : require('../Img/search.png')}
    style={[{
        width: props.width ? props.width : 25,
        height: props.height ? props.height : 25
    }], props.iconStyle}
    resizeMode={'contain'}
    /></View>
    }
    leftIconContainerStyle = {[
        {
            padding: 0
        }, props.leftIconContainerStyle]
    } { ...props
    }
    rightIcon = {
    <View style={{
        marginRight: 10
    }}>
    {play(props.iconName ? props.iconName : 'add-outline', scale(20), props.iconColor ? props.iconColor : themeColor)}</View>
    }
    rightIconContainerStyle = {[
        {
            padding: 0
        }, props.rightIconContainerStyle]
    } { ...props
    }/>