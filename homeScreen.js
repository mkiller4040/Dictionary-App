import * as React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component 
{
  constructor() 
  {
    super();
    this.state = 
    {
    };
  }

  getWord = (word) =>{
    var searchKeyWord = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyWord + " .json"

    return fetch(url)
    .then((data) =>{
      if(data.status === 200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response) =>{
      var responseObject = response

      if(responseObject)
      {
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype

        this.setState(
        {
          "word" : this.state.text,
          "definition" : definition,
          "lexicalCategory" : lexicalCategory
        })
      }
      else
      {
        this.setState(
        {
          "word" : this.state.text,
          "definition" : "Not Found",
        })
      }
    })

  }

  render(){
    return(
      <View>
        <Header centerComponent = {text : "Pocket E-Dictionary"}></Header>

        <TextInput onChangeText = {text => 
        {
          this.setState(
            {
              text : text,
              isSearchPressed : false,
              word : "Loading...",
              lexicalCategory : '',
              examples : [],
              definition : ""
            });
        }}>
        </TextInput>

        <TouchableOpacity onPress = {() => 
        {
          this.setState({isSearchPressed : true});
          this.getWord(this.state.text)
        }}>
        <Text>Search</Text></TouchableOpacity>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  button:{
    justifyContent : 'center',
    alignSelf : 'center',
    borderWidth : 2,
    borderRadius : 15,
    marginTop:50,
    width : 200,
    height:50,
  },
})