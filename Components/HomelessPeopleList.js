import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import firebase from 'react-native-firebase';

let ref = firebase.firestore().collection('people');

class HomelessPeopleList extends React.Component {
  static navigationOptions = {
    title: 'Pessoas em situação de rua',
  };

  state = {
    peoples: []
  };

  componentDidMount() {
    ref.where('type', '==', 'Morador de rua').onSnapshot(querySnapshot => {
      const peoples = querySnapshot.docs.map((documentSnapshot) => {
        return {
          ...documentSnapshot.data(),
          id: documentSnapshot.id, // required for FlatList
        };
      });

      this.setState({ peoples });
    })
  }

  _onPress(item) {
    this.props.navigation.navigate('Detail', {
      itemId: item
    });
  }

  render() {
    const columns = 2;
    return (
      <SafeAreaView>
        <FlatList
          data={createRows(this.state.peoples, columns)}
          keyExtractor={item => item.id}
          numColumns={columns}
          renderItem={({ item }) => {
            if (item.empty) {
              return <View style={[styles.item, styles.itemEmpty]} />;
            }
            return (
              <TouchableOpacity style={styles.item} onPress={() => this._onPress(item)}>
                <Image style={styles.image} source={{ uri: item.imageURL }} />
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

function createRows(data, columns) {
  const rows = Math.floor(data.length / columns);
  let lastRowElements = data.length - rows * columns;

  while (lastRowElements !== columns) {
    data.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements += 1;
  }

  return data;
}

const styles = StyleSheet.create({
  item: {
    alignItems: "stretch",
    backgroundColor: "#dcda48",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    height: 150
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#333333"
  }
});

export default HomelessPeopleList;
