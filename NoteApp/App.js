import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ToastManager from "toastify-react-native";

import Notes from './screens/Notes';
import AddNote from './screens/AddNote';
import AddCategory from './screens/AddCategory';
import EditNote from './screens/EditNote';
import Settings from './screens/Settings';
import Backup from './screens/Backup';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { colors, isDarkMode } = useTheme();
  const iconColor = isDarkMode ? '#fff' : 'black';

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
      style={{ padding: 0 }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Note App cz.2</Text>
        <Text style={styles.title2}>categories and searching</Text>
      </View>

      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <DrawerItem
          label="Notes"
          labelStyle={{ color: colors.text }}
          icon={() => <Icon name="note-multiple-outline" size={24} color={iconColor} />}
          onPress={() => props.navigation.navigate("Notes")}
        />
        <DrawerItem
          label="New Note"
          labelStyle={{ color: colors.text }}
          icon={() => <Icon name="plus" size={24} color={iconColor} />}
          onPress={() => props.navigation.navigate("AddNote")}
        />
        <DrawerItem
          label="New Category"
          labelStyle={{ color: colors.text }}
          icon={() => <Icon name="plus" size={24} color={iconColor} />}
          onPress={() => props.navigation.navigate("AddCategory")}
        />
        <DrawerItem
          label="Settings"
          labelStyle={{ color: colors.text }}
          icon={() => <Icon name="cog" size={24} color={iconColor} />}
          onPress={() => props.navigation.navigate("Settings")}
        />
        <DrawerItem
          label="Backup"
          labelStyle={{ color: colors.text }}
          icon={() => <Icon name="arrow-down-thin-circle-outline" size={24} color={iconColor} />}
          onPress={() => props.navigation.navigate("Backup")}
        />
        <DrawerItem
          label="Info"
          labelStyle={{ color: colors.text }}
          icon={() => <Icon name="information-outline" size={24} color={iconColor} />}
          onPress={() => alert("NotesApp v1.1")}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#03A9F4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen name="Notes" component={Notes} />
      <Drawer.Screen name="AddNote" component={AddNote} options={{ title: 'New Note' }} />
      <Drawer.Screen name="AddCategory" component={AddCategory} options={{ title: 'New Category' }} />
      <Drawer.Screen name="EditNote" component={EditNote} options={{ title: 'Edit Note' }} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Backup" component={Backup} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <ToastManager />
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  title2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#B3E5FC',
  },
  titleContainer: {
    backgroundColor: '#03A9F4',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    marginHorizontal: -12
  }
});