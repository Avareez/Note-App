import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';

export default function NoteItem({ id, title, content, category, date, color, onDelete, onEdit }) {
    const handleLongPress = () => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => onDelete(id) },
            ]
        );
    };

    return (
        <TouchableOpacity
            onLongPress={handleLongPress}
            onPress={() => onEdit(id)}
            style={[styles.noteItem, { backgroundColor: color }]}
        >
            <View style={styles.header}>
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    noteItem: {
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    category: {
        backgroundColor: '#fff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: '#555',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        color: '#333',
    },
});
