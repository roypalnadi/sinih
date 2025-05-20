'use client';

import NavbarHome from '@/components/ui/navbar-home';
import { useAuth } from '@/lib/supabase/authContext';
import { StreamVideoClient, StreamVideoProvider, User } from '@stream-io/video-react-sdk';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { session, sessionReady } = useAuth();
    const pathname = usePathname();
    const route = useRouter();
    const hasRedirected = useRef(false);
    const [client, setClient] = useState<StreamVideoClient | null>(null);

    const getToken = async (userId: string): Promise<string> => {
        const res = await fetch('/api/getstream-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
        });

        const { token } = await res.json();

        return token;
    };

    useEffect(() => {
        if (!session || client) return;
        const getClient = async () => {
            const user: User = {
                id: session.user.id ?? v4(),
                name: session.user.user_metadata?.full_name ?? session.user.email,
                image: session.user.user_metadata.avatar_url,
            };

            try {
                const token = await getToken(user.id);
                const client = StreamVideoClient.getOrCreateInstance({
                    apiKey: process.env.NEXT_PUBLIC_GETSTREAM_API_KEY ?? '',
                    user,
                    token: token,
                });
                setClient(client);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {}
        };

        getClient();
    }, [session, client]);

    useEffect(() => {
        if (sessionReady && !session?.user && !hasRedirected.current) {
            route.replace(`/login?redirect=${pathname}`);
        }
        if (sessionReady && session?.user) {
            hasRedirected.current = true;
        }
    }, [session, route, sessionReady, pathname]);

    return (
        <>
            <NavbarHome />
            {client ? (
                <StreamVideoProvider client={client}>
                    <div className="flex-1 relative">{children}</div>
                </StreamVideoProvider>
            ) : (
                <div className="flex-1 relative">{children}</div>
            )}
        </>
    );
}
