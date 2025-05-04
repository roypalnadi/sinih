'use client';

import NavbarHome from '@/components/ui/navbar-home';
import { useAuth } from '@/lib/supabase/authContext';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { session, sessionReady } = useAuth();
    const route = useRouter();

    useEffect(() => {
        if (sessionReady && !session?.user) {
            route.replace('login');
        }
    }, [session, route, sessionReady]);

    return (
        <>
            <NavbarHome />
            <div className="flex-1 relative">
                <Spin spinning={!sessionReady}>{children}</Spin>
            </div>
        </>
    );
}
