'use client';

import { NotificationProvider } from '@/lib/ant-design/notification-context';
import { AuthProvider } from '@/lib/supabase/authContext';
import '@ant-design/v5-patch-for-react-19';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

export function ClientProvider({
    locale,
    children,
}: {
    locale: string;
    children: React.ReactNode;
}) {
    dayjs.locale(locale);
    return (
        <>
            <AuthProvider>
                <NotificationProvider>{children}</NotificationProvider>
            </AuthProvider>
        </>
    );
}
