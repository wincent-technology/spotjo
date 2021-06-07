import React, { Component } from 'react';
import { View, StyleSheet, Keyboard
, TouchableWithoutFeedback, Text
, KeyboardAvoidingView } from 'react-native';


import  CNRichTextEditor , { CNToolbar,convertToHtmlString, getInitialObject , getDefaultStyles } from "react-native-cn-richtext-editor";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import Texting from '../Constant/Text'
import {
  themeWhite,
} from '../Constant/index';

const defaultStyles = getDefaultStyles();

class JobTaskRequirement extends Component {
 
    constructor(props) {
        super(props);
        
        this.state = {
            selectedTag : 'body',
            selectedStyles : [],
            value: [getInitialObject()]
        };

        this.editor = null;
    }


componentDidMount () {
  this.editor.applyToolbar('ul');

}
    onStyleKeyPress = (toolType) => {
      console.log('toolt',toolType)
        this.editor.applyToolbar(toolType);
    }

    onSelectedTagChanged = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }

    onSelectedStyleChanged = (styles) => { 
        this.setState({
            selectedStyles: styles,
        })
    }

    onValueChanged = (value) => {
      console.log('valule',value)
        this.setState({
            value: value
        });

        global.Task_Description_Req = this.state.value;
    console.log('glboal.rask',convertToHtmlString(global.Task_Description))


    }


    render() {
        return (
            <KeyboardAvoidingView 
            behavior="padding" 
            enabled
            keyboardVerticalOffset={0}
            style={{
        // height:hp(70),

                // marginTop: 15,
                // backgroundColor:'#eee',
                // flexDirection: 'column', 
                // justifyContent: 'flex-end', 
            }}
            ><View
            style={{
              alignItems: 'center',
              width: wp(96),
              marginTop: hp(3),
              marginBottom: hp(1),
            }}>
            <Texting
              style={{
                fontSize: hp(2.7),
                fontFamily: 'Roboto-Bold',
                color: '#333',
              }} text='Task_Requirements'/>
                        </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >             
                    <View style={styles.main}>
                        <CNRichTextEditor                   
                            ref={input => this.editor = input}
                            onSelectedTagChanged={this.onSelectedTagChanged}
                            onSelectedStyleChanged={this.onSelectedStyleChanged}
                            value={this.state.value}
                            style={{ backgroundColor : '#eee',
                                  // height:heightPercentageToDP(50),
                            }}
                            onFocus={() => this.editor.applyToolbar('ul')}
                            styleList={defaultStyles}
                            onValueChanged={this.onValueChanged}
                        />                        
                    </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        );
    }

}

var styles = StyleSheet.create({
    main: {
        // flex: 1,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 1,
        height:hp(60),
        alignItems: 'stretch',
    },
    toolbarButton: {
        fontSize: 20,
        width: 28,
        height: 28,
        textAlign: 'center'
    },
    italicButton: {
        fontStyle: 'italic'
    },
    boldButton: {
        fontWeight: 'bold'
    },
    underlineButton: {
        textDecorationLine: 'underline'
    },
    lineThroughButton: {
        textDecorationLine: 'line-through'
    },
});


export default JobTaskRequirement;


