'use client';

import { NotificationProvider } from '@/lib/ant-design/notification-context';
import { AuthProvider } from '@/lib/supabase/authContext';
import '@ant-design/v5-patch-for-react-19';

export function ClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthProvider>
                <NotificationProvider>{children}</NotificationProvider>
            </AuthProvider>
        </>
    );
}
