'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabaseClient } from './supabaseClient';

interface AuthContextType {
    session: Session | null;
    sessionReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    sessionReady: false,
});

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [session, setSession] = useState<Session | null>(null);
    const [sessionReady, setSessionReady] = useState<boolean>(false);

    useEffect(() => {
        setSessionReady(false);
        // Ambil session sekali saat mount
        supabaseClient.auth.getSession().then(({ data }) => {
            setSession(data.session ?? null);
            setSessionReady(true);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, sessionReady }}>{children}</AuthContext.Provider>
    );
};
