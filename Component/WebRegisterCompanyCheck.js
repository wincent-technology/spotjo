import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import * as Animatable from 'react-native-animatable'

const WebRegisterCompanyCheck = ({onPress, ...props}) => <Modal
                animationType="fade"
                transparent={true}
                visible={props.role}
                coverScreen={true}
                style={{marginBottom :50}}
                useNativeDriver={true}
                // isInteraction={true}
                >
                <Animatable.View useNativeDriver={true} isInteraction={true} duration={500} animation="zoomIn" easing="ease-in" direction="alternate" iterationCount={1} style={{ backgroundColor: 'rgba(55, 192, 211, 0.5)',
        justifyContent: 'center',
        padding:15,borderRadius:15,
        alignItems: 'center'}}>
                    <Animatable.Image animation="zoomIn" easing="ease-in" direction="alternate" iterationCount={1}  source={require('../Img/padlock.png')} style={{height:55,width:55}} resizeMode={'contain'}/>
                    <View style={{
                      borderRadius: 6,
        backgroundColor: 'white',
        width: 'auto',
        marginTop: 20,
                    }}>
                        <TouchableOpacity onPress={onPress}><View style={{
                          display: 'flex',
	    justifyContent: 'center',
	    flexDirection: 'column',
	    alignItems: 'center',
	    padding: 10
                        }}>
                                  <Text>Please validate the OTP</Text>
                                </View></TouchableOpacity>
                    </View>
                </Animatable.View>
            </Modal>

export default WebRegisterCompanyCheck
