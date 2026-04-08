import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import MyButton from '../components/MyButton';
import { Toast } from 'toastify-react-native';
import { useTheme } from '../context/ThemeContext';

const SERVER_URL = 'http://192.168.1.27:3000'; // <-- REPLACE WITH YOUR LOCAL IP!!!

export default function Backup() {
    const { colors } = useTheme();
    const [backups, setBackups] = useState([]);

    const loadBackups = async () => {
        try {
            const res = await fetch(`${SERVER_URL}/api/backup`);
            const data = await res.json();
            setBackups(data);
        } catch (error) {
            Toast.error('Cannot connect to server!', 'top');
        }
    };

    useEffect(() => { loadBackups(); }, []);

    const handleCreateBackup = async () => {
        try {
            const storedNotes = await SecureStore.getItemAsync('notes');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];
            if (notes.length === 0) { Toast.error('No notes to backup!', 'top'); return; }
            const res = await fetch(`${SERVER_URL}/api/backup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notes })
            });
            if (res.ok) { Toast.success('Backup created!', 'top'); loadBackups(); }
        } catch (error) {
            Toast.error('Backup failed!', 'top');
        }
    };

    const handleRestore = (backup) => {
        Alert.alert('Restore Backup', `Restore backup from ${backup.date}? This will overwrite your current notes.`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Restore', onPress: async () => { await SecureStore.setItemAsync('notes', JSON.stringify(backup.notes)); Toast.success('Notes restored!', 'top'); } }
        ]);
    };

    const handleDelete = (id) => {
        Alert.alert('Delete Backup', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: async () => { await fetch(`${SERVER_URL}/api/backup/${id}`, { method: 'DELETE' }); Toast.success('Backup deleted!', 'top'); loadBackups(); } }
        ]);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Backups</Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>Max 2 backups — oldest is removed automatically</Text>
            <MyButton text="Create Backup" onPress={handleCreateBackup} color="#03A9F4" />
            {backups.length === 0 ? (
                <Text style={[styles.empty, { color: colors.subtext }]}>No backups yet.</Text>
            ) : (
                <FlatList
                    data={backups}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <View style={[styles.backupItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                            <View>
                                <Text style={[styles.backupDate, { color: colors.text }]}>{item.date}</Text>
                                <Text style={[styles.backupCount, { color: colors.subtext }]}>{item.notes.length} notes</Text>
                            </View>
                            <View style={styles.backupButtons}>
                                <TouchableOpacity style={[styles.btn, { backgroundColor: '#4A90E2' }]} onPress={() => handleRestore(item)}>
                                    <Text style={styles.btnText}>Restore</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.danger }]} onPress={() => handleDelete(item._id)}>
                                    <Text style={styles.btnText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
    subtitle: { fontSize: 13, textAlign: 'center', marginBottom: 20 },
    empty: { fontSize: 18, textAlign: 'center', marginTop: 20 },
    backupItem: { borderRadius: 8, padding: 15, marginVertical: 8, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    backupDate: { fontSize: 16, fontWeight: 'bold' },
    backupCount: { fontSize: 13, marginTop: 3 },
    backupButtons: { flexDirection: 'row', gap: 8 },
    btn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 6 },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});