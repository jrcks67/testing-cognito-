// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [userState, setUserState] = useState({
        user: '',
        idToken: '',
        accessToken: '',
        refreshToken: ''
    });

    const value = {
        userState,
        setUserState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}