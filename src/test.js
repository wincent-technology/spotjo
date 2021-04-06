
import React,{useState,useEffect} from 'react'
import {FlatList,View,Text,TouchableHighlight} from 'react-native'


Array.prototype.swap = function (x,y) {
    var temp = this[x];
    this[x] = this[y]
    this[y]=temp
    return this
}

const Test = (props) => {


const [state,setdata] = useState([{
    'title':'one',
    'right':false
},
{
    'title':'two',
    'right':false
},
{
    'title':'three',
    'right':false
},{
    'title':'four',
    'right':false
},{
    'title':'five',
    'right':false
},{
    'title':'six',
    'right':false
}]);
const [suggestion,setSuggestion] = useState([]);

useEffect(() => {
    console.log('hi')
    
},[suggestion.length > 1])


       const choose = (item,index) => {
                let mg = suggestion
                mg.push(item)

                setSuggestion(mg);
                        let data = state
                        console.log('st',state,item)
                        data.filter(items => {if (items.title===item.title)items.right = true})


                        setdata(data);  


                        console.log('this.suggestion.length',suggestion.length)

    }

        const  remove = (item,index) => {
                let mg = suggestion;
            console.log('item',item)
                mg = mg.filter(items => items.title != item.title && items)
               let data = state;
                data[index].right = false;
                setdata(data);  

                setSuggestion(mg);

                let i = index
                let map = function (data,index){
                        if (index + 2 < data.length && data[index+ 2].right == true)
                            {data.swap(index,index+2)
                            i = index + 2
                            map(data,i)}
                }

            i < state.length ? map(state,i) : i = index



        }

        const renderI = (item,index) => {
            console.log('tilt',item)
            return (<TouchableHighlight onPress={()=> item.right ? remove(item,index) : choose(item,index)} style={{width:'45%',margin:5,flexDirection : 'row',height:30,backgroundColor:item.right ? 'green':"yellow"}}><View >
                <Text style={{color:'black',fontSize:20}}>{item.title}</Text>
            </View></TouchableHighlight>)
        }

        return (
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <FlatList
                data = {state}
                renderItem={({item,index})=> renderI(item,index)}
                numColumns={2}
                keyExtractor={(index)=> '' + index}
                />
            </View>
        )
}


export default Test