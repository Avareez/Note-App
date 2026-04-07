import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import MyButton from '../components/MyButton';
import { Toast } from "toastify-react-native";

export default function AddCategory({ navigation }) {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const storedCategories = await SecureStore.getItemAsync('categories');
            setCategories(storedCategories ? JSON.parse(storedCategories) : []);
        };
        loadCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!category.trim()) {
            Toast.error('Category name cannot be empty!', "top");
            return;
        }

        if (categories.includes(category)) {
            Toast.error('Category already exists!', "top");
            return;
        }

        const updatedCategories = [...categories, category];
        await SecureStore.setItemAsync('categories', JSON.stringify(updatedCategories));

        setCategory('');
        setCategories(updatedCategories);
        Toast.success('A new category has been added!', "top");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Category</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter category name..."
                value={category}
                onChangeText={setCategory}
            />
            <MyButton text="Add Category" onPress={handleAddCategory} color="#4A90E2" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F5F5F5' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: { borderBottomWidth: 1, borderColor: '#888', fontSize: 18, marginBottom: 20, paddingHorizontal: 10 },
});
