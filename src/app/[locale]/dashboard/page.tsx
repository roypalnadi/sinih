'use client';

import Card from '@/components/ui/card-dashboard';
import {
    CalendarOutlined,
    PlusOutlined,
    SearchOutlined,
    TeamOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Input, Segmented } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type segment = 'first' | 'second';

export default function Dashboard(): React.ReactNode {
    const t = useTranslations();
    const akandatang: React.ReactNode[] = [
        <Card
            key="1"
            title="1"
            description="2"
            date={new Date('2025-01-01')}
            tag="Sukses"
            time="12:00 - 20-01"
            tagColor="error"
            totalParticipant={10}
        />,
    ];
    const maudatang: React.ReactNode[] = [
        <Card
            key="1"
            title="3"
            description="4"
            tagColor="error"
            date={new Date('2025-01-02')}
            tag="Gagal"
            time="12:01 - 20-01"
            totalParticipant={9}
        />,
    ];
    const [meetingMe, setMettingMe] = useState<segment>('first');
    return (
        <>
            <div className="p-10 flex flex-col gap-6">
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-gray-500">{t('dashboard.sub_title')}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button type="primary" size="large" icon={<PlusOutlined />}>
                            {t('dashboard.create_meeting')}
                        </Button>
                        <Button size="large" icon={<VideoCameraOutlined />}>
                            {t('dashboard.join')}
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 border-1 rounded-lg p-5 border-gray-300">
                        <div className="flex justify-between">
                            <span className="text-sm font-bold">{t('dashboard.current_day')}</span>
                            <CalendarOutlined size={1} />
                        </div>
                        <h2 className="text-2xl font-bold text-start">2</h2>
                        <span className="text-xs text-gray-500">
                            {t('dashboard.current_day_description')}
                        </span>
                    </div>
                    <div className="flex-1 border-1 rounded-lg p-5 border-gray-300">
                        <div className="flex justify-between">
                            <span className="text-sm font-bold">{t('dashboard.current_week')}</span>
                            <CalendarOutlined size={1} />
                        </div>
                        <h2 className="text-2xl font-bold text-start">2</h2>
                        <span className="text-xs text-gray-500">{t('dashboard.current_week')}</span>
                    </div>
                    <div className="flex-1 border-1 rounded-lg p-5 border-gray-300">
                        <div className="flex justify-between">
                            <span className="text-sm font-bold">{t('dashboard.contact')}</span>
                            <TeamOutlined size={1} />
                        </div>
                        <h2 className="text-2xl font-bold text-start">2</h2>
                        <span className="text-xs text-gray-500">
                            {t('dashboard.contact_description')}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">
                                {t('dashboard.my_meeting')}
                            </h2>
                        </div>
                        <div className="sm:w-md">
                            <Input
                                placeholder={t('dashboard.search_meeting')}
                                prefix={<SearchOutlined />}
                            />
                        </div>
                    </div>
                    <div>
                        <Segmented<segment>
                            options={[
                                {
                                    label: <div key={1}>{t('dashboard.will_come')}</div>,
                                    value: 'first',
                                },
                                {
                                    label: <div key={2}>{t('dashboard.news')}</div>,
                                    value: 'second',
                                },
                            ]}
                            onChange={(value) => {
                                setMettingMe(value);
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {meetingMe == 'first' ? akandatang : maudatang}
                    </div>
                </div>
            </div>
        </>
    );
}
