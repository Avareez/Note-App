import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import MyButton from '../components/MyButton';
import { Toast } from "toastify-react-native";
import { useTheme } from '../context/ThemeContext';

export default function AddCategory({ navigation }) {
    const { colors } = useTheme();
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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Create a New Category</Text>
            <TextInput
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                placeholder="Enter category name..."
                placeholderTextColor={colors.subtext}
                value={category}
                onChangeText={setCategory}
            />
            <MyButton text="Add Category" onPress={handleAddCategory} color="#4A90E2" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: { borderBottomWidth: 1, fontSize: 18, marginBottom: 20, paddingHorizontal: 10 },
});