'use client';

import { useNotification } from '@/lib/ant-design/notification-context';
import { useAuth } from '@/lib/supabase/authContext';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import { Video } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const NavbarHome = () => {
    const { showNotification } = useNotification();
    const route = useRouter();
    const { session } = useAuth();
    const [loading, setLoading] = useState(false);
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations();

    const switchLocale = () => {
        setLoading(true);
        const parts = pathname.split('/');

        const newLocale = locale === 'id' ? 'en' : 'id'; // Tentukan bahasa baru

        parts[1] = newLocale; // Ganti bagian bahasa di URL
        route.push(parts.join('/'), { scroll: false }); // Lakukan redirect
        route.refresh();
    };

    const items: MenuProps['items'] = [
        {
            key: 'user-info',
            type: 'group',
            label: (
                <div>
                    <div className="font-semibold">{session?.user?.user_metadata?.full_name}</div>
                    <div className="text-gray-500 text-sm">{session?.user?.email}</div>
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'dashboard',
            label: 'Dashboard',
            onClick: () => {
                route.replace('/dashboard');
            },
        },
        // {
        //     key: 'meeting',
        //     label: 'Jadwalkan Meeting',
        // },
        // {
        //     key: 'profile',
        //     label: 'Profil',
        // },
        // {
        //     key: 'settings',
        //     label: 'Pengaturan',
        // },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: t('navbar.logout'),
            danger: true,
            onClick: async () => {
                await supabaseClient.auth.signOut();
                showNotification({
                    message: 'Berhasil logout',
                    description: 'sukses',
                    type: 'success',
                });
                route.replace('/');
            },
        },
    ];

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Video className="text-primary-600" />
                <span className="text-xl font-bold">Sinih</span>
            </div>

            {/* Buttons */}
            <div className={`flex items-center gap-6`}>
                <Button
                    shape="circle"
                    className="!font-bold"
                    disabled={loading}
                    onClick={switchLocale}
                >
                    {locale.toUpperCase()}
                </Button>
                <Dropdown menu={{ items }} trigger={['click']} className="cursor-pointer">
                    <Avatar src={session?.user.user_metadata.avatar_url} />
                </Dropdown>
            </div>
        </nav>
    );
};

export default NavbarHome;
