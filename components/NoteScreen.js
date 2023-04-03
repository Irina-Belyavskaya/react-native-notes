import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react';
import { StyleSheet, View,  TextInput, Button, Text } from 'react-native';
import { Formik } from 'formik';
import { globalStyle } from '../styles/styles';

export default function NoteScreen({ route, navigation }) {
  let formHadler;
  const name = route.params.name;
  const note = route.params.note;
  const id = route.params.id;

  if (name == undefined && note == undefined) {
    navigation.setOptions({ title: 'Create your note!' });
    formHadler = route.params.addNote;
  }
  else {
    navigation.setOptions({ title: 'Edit your note!' });
    formHadler = route.params.saveNote;
  }

  return (
      <View style={globalStyle.body}>
          <Formik 
            initialValues={{name, note, id}} 
            onSubmit={( values, action ) => {
               formHadler(values);
               action.resetForm();
            }}>
            {(props) => (
              <View>
                <View style={styles.label}>
                  <Text>Name of note</Text>
                </View>
                <TextInput 
                    style={[
                      globalStyle.note, 
                      {fontWeight: 'bold'}, 
                      globalStyle.font]} 
                    value={props.values.name}
                    onChangeText={props.handleChange('name')}
                    multiline
                />
                <View style={styles.label}>
                  <Text>Text note</Text>
                </View>
                <TextInput 
                    style={[globalStyle.note, styles.input, globalStyle.font]}
                    value={props.values.note}
                    onChangeText={props.handleChange('note')}
                    multiline
                />
                <View style={styles.button}>
                  <Button 
                    title='Save' 
                    onPress={
                      () => {
                        props.handleSubmit();
                        navigation.navigate('Main')
                      }
                    }/>
                </View>
              </View>
            )}
          </Formik>
      </View>
  );
}

const styles = StyleSheet.create({
  label: {
    alignItems:'center',
  },
  input: {
    height: '60%',
    textAlignVertical: 'top'
  },
  button: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 15
  }
});