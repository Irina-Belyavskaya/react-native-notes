import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from './SearchBar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { globalStyle } from '../styles/styles';
import { DB } from '../db/db';

export default function App({ navigation }) {
    const [notes, setNotes] = useState ([]);
    const [searchNotes, setSearchNotes] = useState ([]);
    const [isSearch, setIsSearch] = useState(false);

    useEffect (() => {
        DB.getAll().then((notes) => {
            setNotes(notes)
        })
    }, [])

    const addNote = async (note) => {
        if (note.note === undefined) 
            note.note = ''
        if (note.name === undefined) 
            note.name = ''
        const id = await DB.add(note);        
        const newNote = await DB.get(id);
        setNotes([newNote,...notes]);
    }

    const saveNote = async (note) => {
        if (note.note === undefined) 
            note.note = ''
        if (note.name === undefined) 
            note.name = ''
        await DB.update(note);
        const newNote = await DB.get(note.id);
        const newList = [...notes];
        for (let i = 0; i < newList.length; i++) {
            if(newList[i].id === newNote.id) {
                newList[i] = newNote;
                break;
            }
        }
        setNotes(newList);
    }

    const deleteNote = async (id) => {
        await DB.delete(id);
        setNotes(notes.filter(note => note.id !== id));
    }

    const findNote = (inputText) => {
        setSearchNotes((list) => {
            if (inputText.length == 0) {
                setIsSearch(false);
                return []
            }
            list = notes.filter(item => (
                item.name.toLowerCase().includes(inputText.toLowerCase())|| 
                item.note.toLowerCase().includes(inputText.toLowerCase())
            ));   
            setIsSearch(true);
          return [...list]
        })
    }

    return (
        <View style={globalStyle.body}>
            <SearchBar findNote={findNote}/>
            <FlatList 
                data={isSearch ? searchNotes : notes} 
                renderItem={({ item }) => (
                <TouchableOpacity 
                    style={[globalStyle.note, styles.note]}
                    onPress={() => 
                        navigation.navigate(
                        'Note', 
                        {...item, saveNote}
                        )
                    }>
                    <View>
                        <Text numberOfLines={1} style={styles.name}>{ item.name }</Text>
                        <Text numberOfLines={3} style={styles.text}>{ item.note }</Text>
                    </View>
                    <MaterialIcons 
                        name="delete" 
                        style={styles.delete} 
                        size={24} 
                        color="black"
                        onPress={() => deleteNote(item.id)} />
                </TouchableOpacity>
                
            )} />            
            <Ionicons 
                name="create" 
                style={styles.add} 
                size={40} color="black" 
                onPress={() => navigation.navigate('Note',{addNote})}/>
        </View>
  );
}

const styles = StyleSheet.create({
    note: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        fontSize: 16,
        marginTop: 5
    },
    add: {
        textAlign: "right",
        marginRight: 20,
        marginBottom: 20
    },
    delete: {
        marginRight: 20
    }
});