import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import NoteItem from '../components/NoteItem';

export default function Notes({ navigation }) {
    const [notes, setNotes] = useState([]);

    const loadNotes = async () => {
        try {
            const storedNotes = await SecureStore.getItemAsync('notes');
            if (storedNotes) {
                setNotes(JSON.parse(storedNotes));
            } else {
                setNotes([]);
            }
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    };

    useEffect(() => {
        loadNotes();
        const unsubscribe = navigation.addListener('focus', loadNotes);
        return unsubscribe;
    }, [navigation]);

    const deleteNote = async (id) => {
        try {
            const storedNotes = await SecureStore.getItemAsync('notes');
            if (storedNotes) {
                const notesArray = JSON.parse(storedNotes);
                const updatedNotes = notesArray.filter(note => note.id !== id);
                await SecureStore.setItemAsync('notes', JSON.stringify(updatedNotes));
                setNotes(updatedNotes);
                console.log('Note deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Notes</Text>
            {notes.length === 0 ? (
                <Text style={styles.noNotes}>No notes available. Add some!</Text>
            ) : (
                <FlatList
                    data={notes}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <NoteItem id={item.id} title={item.title} content={item.content} color={item.color} onDelete={deleteNote} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#03A9F4',
    },
    noNotes: {
        fontSize: 18,
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
});
