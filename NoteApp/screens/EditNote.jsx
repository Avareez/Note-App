import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import MyButton from '../components/MyButton';
import { useTheme } from '../context/ThemeContext';

export default function EditNote({ route, navigation }) {
    const { colors } = useTheme();
    const { noteId } = route.params;
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadNote = async () => {
            const storedNotes = await SecureStore.getItemAsync('notes');
            if (storedNotes) {
                const noteToEdit = JSON.parse(storedNotes).find(note => note.id === noteId);
                if (noteToEdit) {
                    setNoteTitle(noteToEdit.title);
                    setNoteContent(noteToEdit.content);
                    setSelectedCategory(noteToEdit.category);
                }
            }
        };
        const loadCategories = async () => {
            const storedCategories = await SecureStore.getItemAsync('categories');
            setCategories(storedCategories ? JSON.parse(storedCategories) : ['Default']);
        };
        loadNote();
        loadCategories();
    }, [noteId]);

    const handleSave = async () => {
        if (noteTitle.trim() === '' || noteContent.trim() === '') {
            alert('Both fields are required!');
            return;
        }
        try {
            const storedNotes = await SecureStore.getItemAsync('notes');
            let notesArray = storedNotes ? JSON.parse(storedNotes) : [];
            const noteIndex = notesArray.findIndex(note => note.id === noteId);
            if (noteIndex !== -1) {
                notesArray[noteIndex] = { ...notesArray[noteIndex], title: noteTitle, content: noteContent, category: selectedCategory };
                await SecureStore.setItemAsync('notes', JSON.stringify(notesArray));
                navigation.navigate('Notes');
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Edit Note</Text>
            <TextInput
                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                placeholder="Enter title..."
                placeholderTextColor={colors.subtext}
                value={noteTitle}
                onChangeText={setNoteTitle}
            />
            <TextInput
                style={[styles.inputMultiline, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                placeholder="Enter note content..."
                placeholderTextColor={colors.subtext}
                multiline
                value={noteContent}
                onChangeText={setNoteContent}
            />
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={[styles.picker, { backgroundColor: colors.card, color: colors.text }]}
                dropdownIconColor={colors.text}
            >
                {categories.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                ))}
            </Picker>
            <MyButton text="Save Changes" onPress={handleSave} color="#4A90E2" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 18, marginBottom: 20 },
    inputMultiline: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 18, height: 200, textAlignVertical: 'top', marginBottom: 20 },
    picker: { marginBottom: 20 },
});