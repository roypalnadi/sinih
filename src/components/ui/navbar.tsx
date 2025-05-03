'use client';

import { Button } from 'antd';
import { Video } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = ({ withAction = true }: { withAction?: boolean }) => {
    const [loading, setLoading] = useState(false);
    const locale = useLocale();
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = () => {
        setLoading(true);
        const parts = pathname.split('/');

        const newLocale = locale === 'id' ? 'en' : 'id'; // Tentukan bahasa baru

        parts[1] = newLocale; // Ganti bagian bahasa di URL
        router.push(parts.join('/'), { scroll: false }); // Lakukan redirect
        router.refresh();
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Video className="text-primary-600" />
                <span className="text-xl font-bold">Sinih</span>
            </div>

            {/* Buttons */}
            <div className={`flex items-center gap-6 ${withAction ? 'show' : 'hidden'}`}>
                <div className="hidden sm:flex items-center gap-5 text-sm font-bold text-gray-800">
                    <a href="#" className="hover:text-primary-600">
                        {t('navbar.menu_1')}
                    </a>
                    <a href="#" className="hover:text-primary-600">
                        {t('navbar.menu_2')}
                    </a>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        shape="circle"
                        className="!font-bold"
                        disabled={loading}
                        onClick={switchLocale}
                    >
                        {locale.toUpperCase()}
                    </Button>
                    <Button
                        type="primary"
                        className="text-sm !font-bold"
                        onClick={() => router.push('login')}
                    >
                        Login
                    </Button>
                    <Button className="text-sm !font-bold" onClick={() => router.push('sign-up')}>
                        {t('navbar.button_1')}
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
