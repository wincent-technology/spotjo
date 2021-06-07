
import React from 'react'
import {FlatList,View,Text,TouchableOpacity,} from 'react-native'
import {
  heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from '../Component/responsive-ratio';
import Modal from 'react-native-modal'
import {
    themeColor,
    themeWhite,
    Background,
    url,FontBold
  } from '../Constant';
  import {play} from '../src/IconManager'


const ModalSort = ({...props}) => <Modal isVisible={props.isVisible}
        onBackdropPress={props.onBackdropPress}
        style={{flex:1}}
        >
        <View style={{backgroundColor:'gray',alignItems:"center"}}>
        <View style={{alignItems:"center",backgroundColor:'#333',padding:10,width:"100%"}}>
            <Text style={{color:themeWhite,fontSize:hp(3)}}>
              Sort By
            </Text>
        </View>
        <View style={{backgroundColor:themeWhite,height:'auto',width:wp(76),padding:5,margin:10,borderRadius:10}}>
        
          <TouchableOpacity style={{height:hp(6),justifyContent:"center",borderBottomWidth:0.5}} 
          onPress={props.relevance}>
          <View style={{flexDirection:"row",justifyContent:"space-around"}}>
              <Text style={{width:wp(40),fontFamily:FontBold}}>Relevance</Text>
              <View style={{height:hp(2.7),width:hp(2.7),borderRadius:hp(1.3),alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:'#ccc'}}>
              {!props.rel && <View style={{height:hp(1.5),width:hp(1.5),borderRadius:hp(0.8),alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:'#ccc'}} />}
                {props.rel && play('ellipse',hp(1.7),themeColor)}
              </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:hp(6),justifyContent:"center"}} 
          onPress={props.bydate}>
          <View style={{flexDirection:"row",justifyContent:"space-around"}}>
              <Text style={{width:wp(40),fontFamily:FontBold}}>Date</Text>
              <View style={{height:hp(2.7),width:hp(2.7),borderRadius:hp(1.3),alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:'#ccc'}}>
              {!props.date && <View style={{height:hp(1.5),width:hp(1.5),borderRadius:hp(0.8),alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:'#ccc'}} />}
                
                {props.date && play('ellipse',hp(1.7),themeColor)}
              </View>
          </View>
          </TouchableOpacity>
        </View>
        </View>
        </Modal>

export default ModalSort
