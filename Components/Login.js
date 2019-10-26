import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  ImageBackground,
} from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <ImageBackground source={require('../assets/backgroundImage.png')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView>
          <View
            style={styles.container}>
            <Text style={styles.textTitle}> LOGIN </Text>

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
              style={styles.button3} >
              <Text style={styles.buttonText3}> Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              title="Button"
              color="red"
              style={styles.button2}
              onPress={this.handleLogin}
              >
              <Text style={styles.buttonText2}> Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              title="Button"
              color="red"
              style={styles.button1}
              onPress={() => this.props.navigation.navigate('SignUp')}
              >
              <Text style={styles.buttonText1}> Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
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
