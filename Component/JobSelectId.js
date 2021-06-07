
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
  import RadioButton from './Radios'


// function renderItem(item,index){
//     return <View style={{backgroundColor:themeWhite,height:'auto',width:wp(76),padding:5,margin:10,borderRadius:10}}>
        
//     <TouchableOpacity style={{height:hp(6),justifyContent:"center",borderBottomWidth:0.5}} 
//     onPress={props.relevance}>
//     <View style={{flexDirection:"row",justifyContent:"space-around"}}>
//         <Text style={{width:wp(40),fontFamily:FontBold}}>Relevance</Text>
//         <RadioButton
//                             innerColor={'green'}
//                             outerColor={'gray'}
//                             animation={'bounceIn'}
//                             isSelected={this.state.selectedIndex === index}
//                             onPress={this.onPress}
//                         />
//     </View>
//     </TouchableOpacity>
//   </View>
// }

// onPress( index) {
//     this.setState({  selected: index, });
// }


const JobSelectId = ({...props}) => <Modal isVisible={props.isVisible}
        onBackdropPress={props.onBackdropPress}
        style={{flex:1}}
        >
        <View style={{backgroundColor:'gray',alignItems:"center"}}>
            <TouchableOpacity onPress={props.nodata} style={{alignItems:"center",backgroundColor:'#333',padding:10,width:"100%"}}><View style={{alignItems:"center",backgroundColor:'#333',padding:10,width:"100%"}}>
            <Text style={{color:themeWhite,fontSize:hp(3)}}>
              Select Job
            </Text>
        </View></TouchableOpacity>
        <FlatList
        data={props.data}
        renderItem = {props.renderItem}
        />
        </View>
        </Modal>

export default JobSelectId
