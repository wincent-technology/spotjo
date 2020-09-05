import React, { Component } from 'react'
import { Input, Icon, Image } from 'react-native-elements'
import { themeColor } from '../Constant/index'
import { View } from 'react-native'
import { scale } from '../src/Util'


export default CustomInput = (props) => <Input
    containerStyle={[{
        width: '100%',
        alignSelf: 'center',
        marginVertical: 6,
    }, props.containerStyle]}
    inputContainerStyle={[{
        height: scale(45),
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
    source = {props.iconName ? props.iconName : require('../Img/icon-search-blue.png')}
    style={{
        width: 25,
        height: 25
    }}
    resizeMode={'contain'}
    /></View>
    }
    leftIconContainerStyle = {[
        {
            padding: 0
        }, props.leftIconContainerStyle]
    } { ...props
    }
    />