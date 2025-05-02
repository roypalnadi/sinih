'use client';

import { NotificationProvider } from '@/lib/ant-design/notification-context';
import '@ant-design/v5-patch-for-react-19';

export function ClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NotificationProvider>{children}</NotificationProvider>
        </>
    );
}
