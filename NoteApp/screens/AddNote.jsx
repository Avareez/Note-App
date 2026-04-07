import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import MyButton from '../components/MyButton';
import { useFocusEffect } from '@react-navigation/native';

export default function AddNote({ navigation }) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Default');
    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        const storedCategories = await SecureStore.getItemAsync('categories');

        if (!storedCategories) {
            await SecureStore.setItemAsync('categories', JSON.stringify(['Default']));
            setCategories(['Default']);
        } else {
            setCategories(JSON.parse(storedCategories));
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadCategories();
        }, [])
    );

    const handleSave = async () => {
        if (noteTitle.trim() === '' || noteContent.trim() === '') {
            alert('Both fields are required!');
            return;
        }

        if (!selectedCategory) {
            alert('Please select a category!');
            return;
        }

        try {
            const id = Date.now();
            const colors = ["#bae1ff", "#ffdfba", "#ffffba", "#baffc9", "#ffb3ba"];
            const generatedColor = colors[Math.floor(Math.random() * colors.length)];
            const creationDate = new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' });

            const existingNotes = await SecureStore.getItemAsync('notes');
            const notesArray = existingNotes ? JSON.parse(existingNotes) : [];

            const newNote = {
                id,
                title: noteTitle,
                content: noteContent,
                category: selectedCategory,
                color: generatedColor,
                date: creationDate
            };

            notesArray.push(newNote);
            await SecureStore.setItemAsync('notes', JSON.stringify(notesArray));

            setNoteTitle('');
            setNoteContent('');
            setSelectedCategory('Default');

            navigation.navigate('Notes');
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add a New Note</Text>

            <TextInput
                style={styles.titleInput}
                placeholder="Enter title..."
                value={noteTitle}
                onChangeText={setNoteTitle}
            />

            <TextInput
                style={styles.contentInput}
                placeholder="Enter note content..."
                multiline
                value={noteContent}
                onChangeText={setNoteContent}
            />

            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Select a category..." value="" />
                {categories.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                ))}
            </Picker>

            <MyButton text="Save Note" onPress={handleSave} color="#4A90E2" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#03A9F4',
        textAlign: 'center',
    },
    titleInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 18,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    contentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 18,
        height: 200,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    picker: {
        backgroundColor: '#fff',
        marginBottom: 20,
    },
});
