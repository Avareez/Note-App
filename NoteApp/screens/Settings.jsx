import React from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import MyButton from '../components/MyButton';
import { useTheme } from '../context/ThemeContext';
import { Toast } from 'toastify-react-native';

export default function Settings() {
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const handleToggle = (value) => {
        toggleDarkMode(value);
        Toast.success(value ? 'Dark mode enabled!' : 'Light mode enabled!', 'top');
    };

    const handleDeleteAllNotes = () => {
        Alert.alert(
            'Delete All Notes',
            'Are you sure? This will permanently delete ALL your notes.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete All',
                    style: 'destructive',
                    onPress: async () => {
                        await SecureStore.setItemAsync('notes', JSON.stringify([]));
                        Toast.success('All notes deleted!', 'top');
                    }
                }
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Settings</Text>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Appearance</Text>
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={handleToggle}
                        trackColor={{ false: '#ccc', true: colors.primary }}
                        thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
                    />
                </View>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Danger Zone</Text>
                <Text style={[styles.warning, { color: colors.danger }]}>
                    This action cannot be undone!
                </Text>
                <MyButton text="Delete All Notes" onPress={handleDeleteAllNotes} color="#e74c3c" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    card: {
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontSize: 16
    },
    warning: {
        fontSize: 13,
        marginBottom: 10
    },
});