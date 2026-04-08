import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import NoteItem from '../components/NoteItem';
import { useTheme } from '../context/ThemeContext';

export default function Notes({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const { colors } = useTheme();

    const loadNotes = async () => {
        try {
            const storedNotes = await SecureStore.getItemAsync('notes');
            const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
            setNotes(parsedNotes);
            setFilteredNotes(parsedNotes);
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    };

    useEffect(() => {
        loadNotes();
        const unsubscribe = navigation.addListener('focus', loadNotes);
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.date.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(filtered);
    }, [searchQuery, notes]);

    const deleteNote = async (id) => {
        try {
            const updatedNotes = notes.filter(note => note.id !== id);
            await SecureStore.setItemAsync('notes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Your Notes</Text>
            <TextInput
                style={[styles.searchInput, {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text
                }]}
                placeholderTextColor={colors.subtext}
                placeholder="Search notes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {filteredNotes.length === 0 ? (
                <Text style={styles.noNotes}>No notes found.</Text>
            ) : (
                <FlatList
                    data={filteredNotes}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <NoteItem
                            id={item.id}
                            title={item.title}
                            content={item.content}
                            color={item.color}
                            date={item.date}
                            category={item.category}
                            onDelete={deleteNote}
                            onEdit={(noteId) => navigation.navigate('EditNote', { noteId })}
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#03A9F4' },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 18,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    noNotes: {
        fontSize: 18,
        textAlign: 'center',
        color: '#999',
        marginTop: 20
    },
});
