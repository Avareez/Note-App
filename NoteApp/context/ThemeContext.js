import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const load = async () => {
            const stored = await SecureStore.getItemAsync('darkMode');
            setIsDarkMode(stored === 'true');
        };
        load();
    }, []);

    const toggleDarkMode = async (value) => {
        setIsDarkMode(value);
        await SecureStore.setItemAsync('darkMode', value.toString());
    };

    const theme = {
        isDarkMode,
        toggleDarkMode,
        colors: {
            background: isDarkMode ? '#1a1a2e' : '#f8f9fa',
            card: isDarkMode ? '#16213e' : '#ffffff',
            text: isDarkMode ? '#ffffff' : '#333333',
            subtext: isDarkMode ? '#aaaaaa' : '#999999',
            border: isDarkMode ? '#2a2a4a' : '#cccccc',
            primary: '#03A9F4',
            danger: isDarkMode ? '#ff6b6b' : '#e74c3c',
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}