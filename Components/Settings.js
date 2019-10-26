import React from 'react'
import { StyleSheet, Platform, Image, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'

export default class Settings extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Text>
          Settings
          Hi {currentUser && currentUser.email}!
        </Text>

        <Button
        title="Sign out"
        onPress={() => firebase.auth().signOut()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
