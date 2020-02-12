import React from "react"
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from "react-native"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cui:'',data:'', act:false };
  }


  submit(){
    this.setState({act:true})
    var cui = this.state.cui
    var username= 'agili_amir@icloud.com'
    var pass= 'Lauwu7ZwqqBL9mqX'
    const url = `https://business-api.nano-soft.ro/v0.1/business/${cui}`
    let headers = new Headers();

    headers.set('Authorization', 'Basic ' + btoa(username + ":" + pass));

    fetch(url, {method:'GET',
    headers: headers,
    //credentials: 'user:passwd'
   })
    .then(res => {
      return res.json()
    }).then(res => {
      this.setState({data:res})
      console.log(res)
    }).then(()=>{
      this.setState({cui:''})
    }).then(()=>{
      this.setState({act:false})
    })
    .catch(error => {    
      this.setState({act:false}) 
    });
    this.setState({data:[]})
  }

  show(){
    if(this.state.data.message === 'CUI not found'){
      return(
        <Text>Cui not found</Text>
      )
    } else if(this.state.data.message === 'Invalid request params input'){
      return(
        <Text>Input accept just numbers</Text>
      )
    }else if(this.state.data.statusCode === 200){
      return(
        <Text>{JSON.stringify(this.state.data, null, 2)}</Text>
      )
    } else if(this.state.data){
      return(
        <Text>Input is empty</Text>
      )
    }

  }

	render() {
		return (
			<View>
        <View style={{flexDirection:'row', margin:65}}>
          <Text style={styles.text}>CUI: </Text>
          <TextInput style={styles.input} maxLength={9} value={this.state.cui} onChangeText={text => {
                  this.setState({ cui: text });
                }} />
          <TouchableOpacity style={styles.button} onPress={this.submit.bind(this)}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginLeft:65}}>
          {this.state.act === true ? <ActivityIndicator/> : this.show()}
        </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontWeight: "400",
    fontSize: 20,
    alignSelf:'center'
  },
  input:{alignSelf:'center', paddingLeft:10, width:200, height:30,borderColor:"black", borderWidth:1, borderRadius:10},
  button:{marginLeft:20, 
    justifyContent:'center', 
    borderColor:'black',
    borderWidth:1, padding:5, borderRadius:30,
    backgroundColor:'#cccccc'}
})

export default App
