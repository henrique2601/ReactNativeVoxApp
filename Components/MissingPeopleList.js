import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import firebase from 'react-native-firebase';

let ref = firebase.firestore().collection('people');

class MissingPeopleList extends React.Component {
  static navigationOptions = {
    title: 'Desaparecidos',
  };

  state = {
    peoples: []
  };

  componentDidMount() {
    ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { name, imageURL } = doc.data();
        list.push({
          id: doc.id,
          name,
          imageURL,
        });
      });

      this.setState({ peoples: list });
    })
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
              <Image
                style={styles.item}
                source={{ uri: item.imageURL }}
              />
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
    alignItems: "center",
    backgroundColor: "#dcda48",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20,
    height: 150

  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#333333"
  }
});

export default MissingPeopleList;
