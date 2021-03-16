import React, {Component} from 'react';

import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { View, StyleSheet,ActivityIndicator,TouchableHighlight,Text,Image,StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    left,
    library,
    icon,
    play,
    leftVid
} from '../src/IconManager';
import {
  scale,snack
} from '../src/Util'
import http from '../api'
import { themeColor, themeWhite,url } from '../Constant';
import io from "socket.io-client";
// let socket;
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import {
  Rating,
  TopBar
} from '../Component/ViewManager.js'
import { appendFile } from 'react-native-fs';
if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = 'ReactNative';
}


// This must be below your `window.navigator` hack above
// const socket = io('http://178.128.118.157:8091');
 const socket = io('http://192.168.0.169:8091');



let show = false
class ChatOne extends Component{
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        name: '',
        dataCheck: [],
        show: false,
        add:false,
        suggesion: [],
        messages:[],
        show:false,
        flag:false,
        read : null
      };

      // socket.on("new_message_alert",(content) => 
      //   {
      //     console.log('content',content)
      //     // this.onMessage(content)
      //     // socket.emit("message_read", content);

      //   });
        
      this.arrayholder = [];
}
 
  //  static navigationOptions = ({ navigation }) => {
  //   const { params } = navigation.state;
  //   return {
  //     title: params ? params.thread.firstName : 'Unknown',
  //     headerRight: () => (
  //       <TouchableOpacity
  //       onPress={() =>  this.setState({show:!this.state.show})}
  //       style={{marginRight:15,height:20,width:20}}
  //     >
  //      {leftVid('ellipsis-v',20,themeWhite)}
  //     </TouchableOpacity>
  //     ),
  //     headerStyle: {
  //       backgroundColor: themeColor
  //     },
  //     headerTintColor: themeWhite
  //   }
  // };
  

  setHeaderRight = () => {
    // console.log("setHeaderRight", this.state.secureTextEntry);
    return (
      <TouchableOpacity
        onPress={() => {
          this.maskPassword();
        }}
      >
       {leftVid('home',20,'red')}
      </TouchableOpacity>
    );
  };

   
  


componentDidMount(){
 
  // this.props.navigation.setParams({
  //   headerRight: this.setHeaderRight()
  // });
        socket.on('connect', () => console.log('connected'))
        socket.on('error', console.error)
        socket.on('connect_error', console.error)
        socket.emit("userOnApp", global.Id);
        socket.on("new_message_alert",(content) => 
        {

          console.log('content',content)
          content.isRead = 0
          this.onMessage(content)

          socket.emit("message_read", content);

        });
        

       
      var data = [];
      // console.log('io("ws://<LOCAL HOME NETWORK IP>:<PORT ON SERVER>"',socket)
      // console.log(this.props.navigation.state.params.thread)
      try {
        http.POST('api/webuser/chat/get',{
          loginId : global.Id,
          userId : this.props.navigation.state.params.thread.id
        }).then(
          (res) => {
            // console.log('res>>>>>>>>>',res['data']['result']);

            if (res['data']['status']) {
              // console.log('result', res['data']['result']);
              let DATA  = [];
              for (let i in res['data']['result'])
                {
                  if(res['data']['result'][i].receiverDelete == 0 || res['data']['result'][i].senderDelete == 0)
                  {

                  }
                  else {
                  // console.log(res['data']['result'][i].senderId == global.Id)
                  res['data']['result'][i].text = res['data']['result'][i].message
                  res['data']['result'][i]._id = res['data']['result'][i].senderId
                  res['data']['result'][i].name = this.props.navigation.state.params.thread.firstName
                  
                  // delete res['data']['result'][i].message
                  // delete res['data']['result'][i].senderId
                  let user = {
                    _id :res['data']['result'][i]._id == global.Id ? global.Id : res['data']['result'][i].receiverId,
                    name:res['data']['result'][i]._id == global.Id ? global.Company : this.props.navigation.state.params.thread.firstName,
                    
                  }
                  
                  res['data']['result'][i]['user'] = user

                  DATA.push(res['data']['result'][i])
                }
                }
                let dm = DATA
                this.setState({
                  messages:dm
                })
                // this.giftedChatRef.current.scrollToTop();

              // setMessages(dm);
              // console.log('datacheck',DATA);
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
      } catch (error) {
        snack(error);
      } 
      

      
      socket.on("message_read", (data) => {
        console.log('data',data)
        let messages = this.state.messages
        messages.length && messages.filter(i => {if(i.id == data.id)i.isRead=1});
        this.setState({messages});
      })

        socket.on("message_read_all", (data) => {
          console.log('data Read all>>>>>>>>',data)
          if (this.props.navigation.state.params.thread && this.props.navigation.state.params.thread.id == data.senderId || data.receiverId) {
            let messages = this.state.messages
            messages.length && messages.filter(i => {i.isRead = 1;this.renderTicks(i)});
            this.setState({messages});
          }
        });


}


// check = (msg) => {
//   console.log('hi')
//   // socket.connect()
//   socket.on('connect', (som) => 
//   {
//     console.log('som',som)
    
// }
//   )
// }
 
onMessage = (msg) => {
                  if(msg.receiverDelete == 0 || msg.senderDelete == 0)
                  {

                  }
                  else {
                  msg.text = msg.message
                  msg._id = msg.senderId
                  msg.name = this.props.navigation.state.params.thread.firstName
                  let user = {
                    _id :msg._id == global.Id ? global.Id : msg.receiverId,
                    name:msg._id == global.Id ? global.Company :  this.props.navigation.state.params.thread.firstName
                  }
                  msg['user'] = user
                  let dm = [...this.state.messages,msg ]
                    
                  
                  this.setState({ messages: dm,flag:true})
                  
                  
                }
               

}

      
   renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: props.currentMessage.needtodel == 1 ? 'red' : themeColor
          },
          left: {
            // Here is the color change
            backgroundColor: props.currentMessage.needtodel == 1 ? 'red' : '#eee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          },
          left: {
            color: props.currentMessage.needtodel == 1 ? '#fff' : '#000'
          }
        }}
      />
    )
      // }
  }


   renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee'/>
      </View>
    );
  }

   renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          {library('send',25,themeColor)}
        </View>
      </Send>
    );
  }
   scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
      {leftVid('angle-double-down',25,themeColor)}
        {/* <IconButton icon='chevron-double-down' size={36} color='#6646ee' /> */}
      </View>
    );
  }
   handleSend(newMessage = []) {
    console.log('message>>>>>>>>>',newMessage);
    // this.setState({
    //   messages:GiftedChat.append(this.state.messages, newMessage)
    // })
     try {
      this.props.navigation.state.params.thread.isBlock != 1 && http.POST('api/webuser/chat/post',{
        senderId : global.Id,
        receiverId : this.props.navigation.state.params.thread.id,
        message:newMessage[0].text
      }).then(
        (res) => {
          if (res['data']['status']) {
            console.log('result', res['data']['result']);
            // let cd = []
            // cd.push(res['data']['result']);
            this.onMessage(res['data']['result'])
            // socket.emit('new_message_alert', newMessage[0].text);
             
            // let DATA  = [];
            // for (let i in res['data']['result'])
            //   {
            //     res['data']['result'][i].text = res['data']['result'][i].message
            //     res['data']['result'][i]._id = res['data']['result'][i].senderId
            //     res['data']['result'][i].name = props.navigation.state.params.thread.firstName
            //     delete res['data']['result'][i].message
            //     delete res['data']['result'][i].senderId
            //     let user = {
            //       _id :res['data']['result'][i]._id == global.Id ? res['data']['result'][i].receiverId : global.Id,
            //       name:res['data']['result'][i]._id == global.Id ? props.navigation.state.params.thread.firstName : global.Company
            //     }
            //     res['data']['result'][i]['user'] = user

            //     DATA.push(res['data']['result'][i])
            //   }
            //   let dm = DATA.reverse()
            // setMessages(dm);
            // console.log('datacheck',DATA);
          } else {
            snack(res['data']['message']);
          }
        },
        (err) => snack(err['message']),
      );
    } catch (error) {
      snack(error);
    } 

  }

  Back = () => {
    this.props.navigation.goBack();
  };
  del = () => {

    let temp = this.state.messages.filter(i => i.needtodel == 1)
    // console.log('temp.length',temp.length)
    let data = []
    temp.forEach(obj => {
      data.push({
        id:obj.id,
        type:obj._id == global.Id ? 'sendChat' : 'receiverChat'
      });
  })
        console.log('data',data);


     try {
      data.length && http.POST('api/webuser/chat/delchat',{
        loginId : global.Id,
        userId : this.props.navigation.state.params.thread.id,
        data:data.length && data
      }).then(
        (res) => {
          if(res['data']['status']) {
          let DATA  = [];
                for (let i in res['data']['result'])
                {
                  if(res['data']['result'][i].receiverDelete == 0 || res['data']['result'][i].senderDelete == 0)
                  {

                  }
                  else {
                  // console.log(res['data']['result'][i].senderId == global.Id)
                  res['data']['result'][i].text = res['data']['result'][i].message
                  res['data']['result'][i]._id = res['data']['result'][i].senderId
                  res['data']['result'][i].name = this.props.navigation.state.params.thread.firstName
                  // delete res['data']['result'][i].message
                  // delete res['data']['result'][i].senderId
                  let user = {
                    _id :res['data']['result'][i]._id == global.Id ? global.Id : res['data']['result'][i].receiverId,
                    name:res['data']['result'][i]._id == global.Id ? global.Company : this.props.navigation.state.params.thread.firstName,
                    
                  }
                  res['data']['result'][i]['user'] = user

                  DATA.push(res['data']['result'][i])
                }
                }
                this.setState({
                  messages:DATA
                })
              }

         
        },
        (err) => snack(err['message']),
      );
    } catch (error) {
      snack(error);
    } 
  }
  show = () => {
    let Old = this.props.navigation.state.params.thread
    Old.isBlock = !Old.isBlock
    try {
      http.POST('api/webuser/chat/staffblock',{
        loginId : global.Id,
        companyId:global.Id,
        isBlock:Old.isBlock,
        userId : Old.id
      }).then(
        (res) => {
          console.log('res>>>>>>>>>',res);
          // let dg = res['data']['result'].find(i => i.id == this.props.navigation.state.params.thread.id)
          // console.log('dg',dg)
          this.props.navigation.setParams({thread: Old });
          this.setState({show:!this.state.show})
        },
        (err) => snack(err['message']),
      );
    } catch (error) {
      snack(error);
    } 
    socket.emit('staffBlock');
  }
  onPress= (context,message) => {

   console.log('message',message);
   for (let i in this.state.messages)
   {
     if (message.id == this.state.messages[i].id)
     this.state.messages[i] = {
              ... this.state.messages[i],
              needtodel:this.state.messages[i].needtodel ? 0 : 1
            }
   }
   console.log('temp',this.state.messages)
  this.setState({ messages: this.state.messages, });
}

  onLongPress= (context, message) => {

    // let i = ['w']
    


    const options = ['Delete Message','Select Multiple To Delete',  'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex
    }, (buttonIndex) => {
        switch (buttonIndex) {
            case 0:
             console.log('message',message)
              try {
                http.POST('api/webuser/chat/delchat',{
                  loginId : global.Id,
                  userId : this.props.navigation.state.params.thread.id,
                  data:[{id:message.id,type:message._id == global.id ? 'sendChat' : 'receiverChat'}]
                }).then(
                  (res) => {
                    let DATA  = [];
                    for (let i in res['data']['result'])
                    {
                      if(res['data']['result'][i].receiverDelete == 0 || res['data']['result'][i].senderDelete == 0)
                      {
    
                      }
                      else {
                      res['data']['result'][i].text = res['data']['result'][i].message
                      res['data']['result'][i]._id = res['data']['result'][i].senderId
                      res['data']['result'][i].name = this.props.navigation.state.params.thread.firstName
                      // delete res['data']['result'][i].message
                      // delete res['data']['result'][i].senderId
                      let user = {
                        _id :res['data']['result'][i]._id == global.Id ? global.Id : res['data']['result'][i].receiverId,
                        name:res['data']['result'][i]._id == global.Id ? global.Company : this.props.navigation.state.params.thread.firstName,
                        
                      }
                      res['data']['result'][i]['user'] = user
                      DATA.push(res['data']['result'][i])
                    }
                    }
                    this.setState({
                      messages:DATA,
                      // show:false
                    })
                  },
                  (err) => snack(err['message']),
                );
              } catch (error) {
                snack(error);
              } 
              this.setState({show:false})
              break;
              case 1:
                    this.setState({flag:!this.state.flag})
                break;
        }
    });




}

renderChatFooter = () => {
  if (this.props.navigation.state.params.thread.isBlock == 1) {
    console.log('hi>>>>>>>>>');
    return <Text style={{color:'red',textAlign:"center",fontSize:16}}>This User Is Blocked</Text>;
  } 
return null;
};

renderToolBar = () => {
  if (this.props.navigation.state.params.thread.isBlock == 1) {
    return null
  }
}

Delete = () => {
  alert ('Select message you want to delete');
  this.setState({show:!this.state.show,flag:!this.state.flag})
  object = {
    read,unread
  }

  

}

renderTicks = message => {
  const { messages } = this.state;
  // TODO: Status pending
  // console.log('messages>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<',message)
  if (message.senderId == global.Id) {
      // const status = message.hasOwnProperty('isRead') ? message['isRead'] : message['isRead'] ;
      switch (message['isRead']) {
          case 0:
              return library('done',15,message._id == global.Id ? '#fff' : 'gray')
          case 1:
            return <View style={{marginRight:5,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>{library('done-all',15,message._id == global.Id ? '#fff' : 'gray')}<Text style={{fontSize:9,color:"#fff"}}>R</Text></View>

          default:
              return null;
      }
  } else {
      return null;
  }
};

render(){
  
  const {thread} = this.props.navigation.state.params;
  return (
    <View style={{marginBottom:60,flex:1}}>
                <StatusBar hidden={false} backgroundColor={themeColor} />
                    <TopBar centerComponent={thread.firstName + ' ' + thread.lastName}
                    color ={true} rightComponent='edit' flag ={this.state.flag} onPress={() => this.Back()} onExit={() => 
                    {
                      if (this.state.flag)
                          this.del()
                          else
                      this.setState({show:!this.state.show})
                    }
                    } />
    {this.state.show ? <Animatable.View animation="lightSpeedIn" style={styles.AllPdropMenu}>
    {global.role != "Staff" && <Animatable.View style={styles.AllPdownMenu} animation = "zoomIn">
            <TouchableHighlight onPress={this.show}>
            <View style={styles.AllProw}>
            <View style={styles.AllPLeftIconText}>
            {leftVid('lock',20,'white')}
            </View>
            <View style={styles.AllPLeftIconText}><Text style={styles.AllPtextColor}>
            {thread.isBlock == 1 ? 'UnBlock' : 'Block'}
            </Text></View>
            </View>
            </TouchableHighlight>
            </Animatable.View>}
            <TouchableHighlight onPress={this.Delete}>
            <Animatable.View  style={styles.AllPdropText} animation = "zoomIn">
                <View  style={styles.AllPLeftIconText}>
                {leftVid('trash',20,'white')}
                </View>
                <View  style={styles.AllPLeftIconText}><Text style={styles.AllPtextColor}>Delete</Text></View>
            </Animatable.View>
            </TouchableHighlight></Animatable.View> : <View/>
               }
        <GiftedChat
      messages={this.state.messages}
      ref={ref => this.giftedChatRef = ref}
      // extraData={this.state.messages}
      onSend={newMessage => this.handleSend(newMessage)}
      user={{ _id: global.Id, name: global.Company,}}
      renderBubble={this.renderBubble}
      placeholder='Type your message here...'
      showUserAvatar
      alwaysShowSend
      shouldUpdateMessage={(props, nextProps) =>
        props.extraData !== nextProps.extraData
 }
      inverted={false}
      onLongPress={this.onLongPress}
      onPress={this.state.flag && this.onPress}
      renderTicks={this.renderTicks}
      renderSend={this.renderSend}
      // Step 2: add the prop
      scrollToBottomComponent={this.scrollToBottomComponent}
      scrollToBottom
      renderLoading={this.renderLoading}
      renderInputToolbar={thread.isBlock == 1 && this.renderToolBar}
      renderChatFooter={this.renderChatFooter}
    /></View>
  );
}
}






const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"gray"
        // marginBottom:200
      },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      AllPdropMenu: {
        flex: 1,
        flexDirection: 'column',
        right: 0,
        position: 'absolute',
        top: scale(50),
        width: scale(110),
        backgroundColor:themeColor,
        zIndex: 9999,
    },
    AllPdownMenu: {
      borderBottomWidth: 1,
      borderColor: '#fff',
      width: scale(120),
      //justifyContent: 'center',
      alignItems: 'center',
      height: scale(40),
      flexDirection: 'row',
  },
  AllProw: {
    flexDirection: 'row'
},
AllPLeftIconText: {
  marginHorizontal: scale(5)
},
AllPtextColor: {
  color: themeWhite,
  fontSize: scale(15)
},
AllPdropText: {
  width: scale(120),
  //justifyContent: 'center',
  alignItems: 'center',
  height: scale(40),
  flexDirection: 'row',
},
AllPLeftIconText: {
  marginLeft: scale(5)
},
  });


export default withNavigationFocus(ChatOne);
