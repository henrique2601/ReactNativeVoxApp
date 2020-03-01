import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import firebase from 'react-native-firebase';

let ref = firebase.firestore().collection('people');

export default class AddPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSource: {},
      name: "",
      gender: "",
      type: "",
      etiny: "",
      description: "",
      contactNumber: "",

    };
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
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
      }
    });
  };

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
            }).then(() => {
                alert('success');
                state.imgSource = {};
                state.imageUri = {};
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
          alert('Sorry, Try again.');
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={this.state.imgSource}
            style={{ width: 250, height: 250 }}
          />
          <Button title="Escolher foto" onPress={this.chooseFile.bind(this)} />

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
            onValueChange={(value) => this.setState({ type: value }) }
            items={[
                { label: 'Morador de rua', value: 'Morador de rua' },
                { label: 'Desaparecido', value: 'Desaparecido' },
            ]}
        />

        <RNPickerSelect
            placeholder={{
                label: 'Selecione o genero',
                value: null,
            }}
            onValueChange={(value) => this.setState({ gender: value }) }
            items={[
                { label: 'Masculino', value: 'Masculino' },
                { label: 'Feminino', value: 'Feminino' },
                { label: 'Outro', value: 'Outro' },
            ]}
        />

        <RNPickerSelect
            style={styles.textInputStyle}
            placeholder={{
                label: 'Selecione a etinia',
                value: null,
            }}
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
            onChangeText={(contact) => this.setState({ contactNumber })}
         />

          <Button title="Upload" onPress={this.uploadImage.bind(this)} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    height: '100%'
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFD',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    borderRadius: 5
  },
});
