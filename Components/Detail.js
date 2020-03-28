import React from "react";
import { SafeAreaView, StyleSheet, ListItem, Text, View, Image, FlatList } from "react-native";
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';

let ref = firebase.firestore().collection('people');

class Detail extends React.Component {
  static navigationOptions = {
    title: 'Detalhe',
  };

  constructor(props){
    super(props);

    this.state = {
      item: props.navigation.state.params.itemId
    };

    const firebaseId = props.navigation.state.params.firebaseId

    if (firebaseId && firebaseId.length > 0) {
      ref.doc(firebaseId).get().then( (docRef ) => {   
        const item = {
          ...docRef.data(),
          id: docRef.id, // required for FlatList
        }
        this.setState({item})
        console.log(docRef.data())

      })
    } 
  }

  render() {
    return (
      <SafeAreaView>
        {this.state.item &&
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 250}}>
            <Image
              source={{ uri: this.state.item.imageURL }}
              resizeMode="contain"
              style={{ width: 250, height: 250 }}
            />
          </View>
          <Text>
            <Text style={{fontWeight:'bold'}}>Nome: </Text>
            <Text>{this.state.item.name}</Text>
          </Text>
          <Text></Text>
          <Text>
            <Text style={{fontWeight:'bold'}}>Tipo: </Text>
            <Text>{this.state.item.type}</Text>
          </Text>
          <Text></Text>
          <Text>
            <Text style={{fontWeight:'bold'}}>Genero: </Text>
            <Text>{this.state.item.gender}</Text>
          </Text>
          <Text></Text>
          <Text>
            <Text style={{fontWeight:'bold'}}>Etinia: </Text>
            <Text>{this.state.item.etiny}</Text>
          </Text>
          <Text></Text>
          <Text>
            <Text style={{fontWeight:'bold'}}>Circustancia: </Text>
            <Text>{this.state.item.description}</Text>
          </Text>
          <Text></Text>
          <Text>
            <Text style={{fontWeight:'bold'}}>Familiar: </Text>
            <Text>{this.state.item.contact} {this.state.item.contactNumber}</Text>
          </Text>
          <Text></Text>
          <Text>
            <Text style={{fontWeight:'bold'}}>Correlação: </Text>
            <Text>Não encontrada</Text>
          </Text>
          <Text></Text>
        </View>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default Detail;
