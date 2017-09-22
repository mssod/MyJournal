import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class App extends React.Component {
  state = { items: [] };

  _addItem(text) {
    this.setState({
      items: [...this.state.items, { text, date: Date.now() }]
    });
    this.textInput.clear();
  }

  render() {
    let content = <Text>Keine Einträge im Tagebuch</Text>;
    if (this.state.items.length > 0) {
      content = (
        <FlatList
          style={styles.list}
          data={this.state.items}
          renderItem={({ item }) => <Text>{item.text}</Text>}
          keyExtractor={item => item.date}
        />
      );
    }
    return (
      <View style={styles.container}>
        {content}
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            ref={input => (this.textInput = input)}
            placeholder="Tagebucheintrag erstellen"
            returnKeyType="done"
            onSubmitEditing={event =>
              this._addItem(event.nativeEvent.text)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  list: {
    marginTop: 24
  },
  input: {
    height: 40
  }
});
