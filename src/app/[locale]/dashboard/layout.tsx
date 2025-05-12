'use client';

import NavbarHome from '@/components/ui/navbar-home';
import { useNotification } from '@/lib/ant-design/notification-context';
import { useAuth } from '@/lib/supabase/authContext';
import { StreamVideoClient, StreamVideoProvider, User } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { session, sessionReady } = useAuth();
    const route = useRouter();
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const { showNotification } = useNotification();

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
        const getClient = async () => {
            const user: User = {
                id: session?.user?.id ?? v4(),
                name: session?.user?.user_metadata?.full_name ?? 'Guest',
                image: session?.user.user_metadata.avatar_url,
            };

            const client = StreamVideoClient.getOrCreateInstance({
                apiKey: 'g72ybm8xypfz',
                user,
                token: await getToken(user.id),
            });
            setClient(client);
        };

        getClient();
    }, [session, showNotification]);

    useEffect(() => {
        if (sessionReady && !session?.user) {
            route.replace('/login');
        }
    }, [session, route, sessionReady]);

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
