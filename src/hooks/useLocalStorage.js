import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // Get from local storage then parse stored json or return initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

export const useHistory = () => {
    const [history, setHistory] = useLocalStorage('contentHistory', []);

    const addToHistory = (item) => {
        const newItem = {
            ...item,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        setHistory(prev => [newItem, ...prev].slice(0, 50)); // Keep last 50 items
    };

    const removeFromHistory = (id) => {
        setHistory(prev => prev.filter(item => item.id !== id));
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return { history, addToHistory, removeFromHistory, clearHistory };
};

export const useStats = () => {
    const [stats, setStats] = useLocalStorage('userStats', {
        totalGenerations: 0,
        streak: 0,
        lastVisit: null,
        favoriteType: null
    });

    const updateStats = (type) => {
        setStats(prev => ({
            ...prev,
            totalGenerations: prev.totalGenerations + 1,
            lastVisit: new Date().toISOString(),
            favoriteType: type
        }));
    };

    return { stats, updateStats };
};
