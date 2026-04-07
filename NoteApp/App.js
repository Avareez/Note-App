import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ToastManager from "toastify-react-native";

import Notes from './screens/Notes';
import AddNote from './screens/AddNote';
import AddCategory from './screens/AddCategory';
import EditNote from './screens/EditNote'
import Settings from './screens/Settings';
import Backup from './screens/Backup';



const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Note App cz.2</Text>
        <Text style={styles.title2}>categories and searching</Text>
      </View>
      <DrawerItem
        label="Notes"
        icon={() => <Icon
          name="note-multiple-outline" size={24} color="black" />}
        onPress={() => props.navigation.navigate("Notes")}
      />
      <DrawerItem
        label="New Note"
        icon={() => <Icon name="plus" size={24} color="black" />}
        onPress={() => props.navigation.navigate("AddNote")}
      />
      <DrawerItem
        label="New Category"
        icon={() => <Icon name="plus" size={24} color="black" />}
        onPress={() => props.navigation.navigate("AddCategory")}
      />
      <DrawerItem
        label="Settings"
        icon={() => <Icon name="cog" size={24} color="black" />}
        onPress={() => props.navigation.navigate("Settings")}
      />
      <DrawerItem
        label="Backup"
        icon={() => <Icon name="arrow-down-thin-circle-outline" size={24} color="black" />}
        onPress={() => props.navigation.navigate("Backup")}
      />
      <DrawerItem
        label="Info"
        icon={() => <Icon name="information-outline" size={24} color="black" />}
        onPress={() => alert("NotesApp, cz.1")}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ToastManager />
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Notes" component={Notes} />
        <Drawer.Screen name="AddNote" component={AddNote} />
        <Drawer.Screen name="AddCategory" component={AddCategory} />
        <Drawer.Screen name="EditNote" component={EditNote} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Backup" component={Backup} />
      </Drawer.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    position: "relative",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10
  }
});
