'use client';

import Card from '@/components/ui/card-dashboard';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import {
    CalendarOutlined,
    PlusOutlined,
    SearchOutlined,
    TeamOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Input, Segmented, Spin } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type segment = 'upcomming' | 'latest';

export default function Dashboard(): React.ReactNode {
    const t = useTranslations();
    const router = useRouter();
    const [meets, setMeets] = useState<React.ReactNode[] | null>([]);

    useEffect(() => {
        getData('upcomming');
    }, []);

    const getData = (segment: segment) => {
        setMeets(null);
        let key = 1;
        const data = supabaseClient.from('meeting').select();

        if (segment == 'upcomming') {
            data.gte('date', dayjs().format('YYYY-MM-DD'));
        }
        if (segment == 'latest') {
            data.lt('date', dayjs().format('YYYY-MM-DD'));
        }

        data.then(({ data }) => {
            const cards = data?.map((m) => {
                const date = dayjs(m['date']);
                return (
                    <Card
                        key={key++}
                        meetId={m['meet_id'] ?? ''}
                        title={m['title'] ?? ''}
                        description={m['description'] ?? ''}
                        date={date.isValid() ? date.toDate() : null}
                        tag="Sukses"
                        time={(m['start_time'] ?? '') + ' - ' + (m['end_time'] ?? '')}
                        tagColor="error"
                        totalParticipant={m['participant']}
                    />
                );
            });
            setMeets(cards ?? []);
        });
    };
    return (
        <>
            <div className="p-10 flex flex-col gap-6">
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-gray-500">{t('dashboard.sub_title')}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={() => router.push('/dashboard/create-meeting')}
                        >
                            {t('dashboard.create_meeting')}
                        </Button>
                        <Button
                            size="large"
                            icon={<VideoCameraOutlined />}
                            onClick={() => router.push('/dashboard/join')}
                        >
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
                                    value: 'upcomming',
                                },
                                {
                                    label: <div key={2}>{t('dashboard.news')}</div>,
                                    value: 'latest',
                                },
                            ]}
                            onChange={(value) => {
                                getData(value);
                            }}
                        />
                    </div>
                    {meets ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {meets}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <Spin spinning={true}></Spin>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
