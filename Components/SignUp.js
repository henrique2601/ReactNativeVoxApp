import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.props.navigation.navigate('Main'))
      .catch(error => Alert.alert(error.message))
  }

  render() {
    return (
      <ImageBackground source={require('../assets/backgroundImage.png')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView>
          <View
            style={styles.container}>

            <Text style={styles.textTitle}> CADASTRAR </Text>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({email: text})}
              placeholder="Usuario"
            />

            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
              placeholder="Senha"
            />

            <TouchableOpacity
              title="Button"
              color="red"
              style={styles.button2}
              onPress={this.handleSignUp}
              >
              <Text style={styles.buttonText2}> Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              title="Button"
              color="red"
              style={styles.button1}
              onPress={() => this.props.navigation.navigate('Login')}
              >
              <Text style={styles.buttonText1}> Ja tenho cadastro</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    borderRadius: 5
  },
  button1: {
    height: 50,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 15,
    marginBottom: 20,
    backgroundColor: '#E67E22',
    borderRadius: 15
  },
  button2: {
    height: 50,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 15
  },
  button3: {
    height: 50,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 15,
    marginBottom: 20,
    borderRadius: 15
  },
  buttonText1: {
    color: '#FFF',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonText2: {
    color: '#E67E22',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonText3: {
    color: '#2579E2',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});

