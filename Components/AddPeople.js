import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import firebase from 'react-native-firebase';

let ref = firebase.firestore().collection('people');

const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];

export default class AddPeople extends React.Component {
  static navigationOptions = {
    title: 'Adicionar',
  };

  constructor(props) {
    super(props);
    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
      favSport5: null,
    };

    this.state = {
      imgSource: null,
      name: "",
      gender: "",
      type: "",
      etiny: "",
      description: "",
      contact: "",
      contactNumber: "",
      canAdd: false,
      isLoading: false
    };

    //this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }
  chooseFile = () => {
    var options = {
      title: 'Selecione uma foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          imgSource: source,
          imageUri: response.uri
        });

        this.setState({isLoading: true})

        let formdata = new FormData();
        
        formdata.append("file", {uri: response.uri, name: 'image.jpg', type: 'image/jpeg'})

        fetch('https://sheltered-escarpment-44824.herokuapp.com/detect-face',{
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata
        }).then(response => response.json())
        .then((response) => {
          console.log(response);
          debugger;
          if (response.error) {
            Alert.alert("Erro", "Nenhum rosto encontrado");
            this.setState({canAdd: false})
            this.setState({isLoading: false})
          } else if (response.firebaseid.toString().length > 0) {
            Alert.alert("Atenção!!!", "Pessoa já cadastrada");
            this.setState({firebaseid: response.firebaseid.toString()})
            this.setState({canAdd: false})
            this.setState({isLoading: false})
          } else {
            this.setState({canAdd: true})
            this.setState({isLoading: false})
          }
        }).catch(err => {
          console.log(err)
        });  
      }
    });
  };

  goToDetail = () => {
    this.props.navigation.navigate('Detail', {
      firebaseId: this.state.firebaseid
    });
  }

  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({ uploading: true });
    firebase
      .storage()
      .ref(`${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            //snapshot.downloadURL
            ref.add({
                name: this.state.name,
                imageURL: snapshot.downloadURL,
                gender: this.state.gender,
                etiny: this.state.etiny,
                description: this.state.description,
                contact: this.state.contact,
                contactNumber: this.state.contactNumber,
                type: this.state.type,
                owner: firebase.auth().currentUser.uid
            }).then(() => {
                alert('sucesso');
                state.imgSource = null;
                state.imageUri = null;
                state.name = "";
                state.gender = "";
                state.etiny = "";
                state.description = "";
                state.contact = "";
                state.contactNumber = "";
                state.type = "";
                this.setState(state);
            });
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Erro inesperado, tente novamente.');
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 250}}>
            
            {this.state.imgSource ? (
              <Image
                source={this.state.imgSource}
                resizeMode="contain"
                style={{ width: 250, height: 250 }}
              />
            ) : (
              <Image
                source={require('../assets/profile_placeholder.png')}
                resizeMode="contain"
                style={{ width: 250, height: 250 }}
              />
            )}
            
          </View>
          <Button title="Selecionar foto" onPress={this.chooseFile.bind(this)} />

          {this.state.isLoading &&
            <ActivityIndicator size="small" />
          }

          {this.state.firebaseid &&
            <Button title="Ver pessoa cadastrada" onPress={this.goToDetail.bind(this)} />
          }

          {this.state.canAdd && 
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Nome"
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
          />

          <RNPickerSelect
            placeholder={{
                  label: 'Selecione o tipo',
                  value: null,
              }}
            items={[
                  { label: 'Situação de rua', value: 'Morador de rua' },
                  { label: 'Desaparecido', value: 'Desaparecido' },
            ]}
            onValueChange={(value) => this.setState({ type: value }) }
            style={pickerSelectStyles}
          />

          <RNPickerSelect
            placeholder={{
                  label: 'Selecione o genero',
                  value: null,
              }}
            items={[
                { label: 'Masculino', value: 'Masculino' },
                { label: 'Feminino', value: 'Feminino' },
                { label: 'Outro', value: 'Outro' },
            ]}
            onValueChange={(value) => this.setState({ gender: value }) }
            style={pickerSelectStyles}
          />

          <RNPickerSelect
              placeholder={{
                  label: 'Selecione a etinia',
                  value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => this.setState({ etiny: value }) }
              items={[
                  { label: 'Branco', value: 'Branco' },
                  { label: 'Amarelo', value: 'Amarelo' },
                  { label: 'Pardo', value: 'Pardo' },
                  { label: 'Negro', value: 'Negro' },
              ]}
          />

          <TextInput
              style={styles.textInputStyle}
              multiline={true}
              placeholder="Circunstancia"
              value={this.state.description}
              onChangeText={(description) => this.setState({ description })}
          />

          <TextInput
              style={styles.textInputStyle}
              multiline={true}
              placeholder="Familiar"
              value={this.state.contact}
              onChangeText={(contact) => this.setState({ contact })}
          />

          <TextInput
              style={styles.textInputStyle}
              multiline={true}
              placeholder="Familiar número (opcional)"
              value={this.state.contactNumber}
              onChangeText={(contactNumber) => this.setState({ contactNumber })}
          />

            <Button title="Upload" onPress={this.uploadImage.bind(this)} />
            </View>
          }
          
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  textTitle: {
    color: '#FFF',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInputStyle: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
