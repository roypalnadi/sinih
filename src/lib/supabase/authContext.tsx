'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabaseClient } from './supabaseClient';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<Session | null>(null);

export const useAuth = (): Session | null => {
    const context = useContext(AuthContext);
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [session, setSession] = useState<Session | null>(null);
    const route = useRouter();

    useEffect(() => {
        // Ambil session sekali saat mount
        supabaseClient.auth.getSession().then(({ data, error }) => {
            if (error || !data.session?.access_token) {
                return route.replace('login');
            }
            setSession(data.session ?? null);
        });

        // Pantau perubahan auth
        const {
            data: { subscription },
        } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe(); // Bersihkan listener saat unmount
    }, [route]);

    return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};
