'use client';

import NavbarHome from '@/components/ui/navbar-home';
import { AuthProvider } from '@/lib/supabase/authContext';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <NavbarHome />
            {children}
        </AuthProvider>
    );
}
