'use client';

import { useNotification } from '@/lib/ant-design/notification-context';
import {
    CalendarOutlined,
    ClockCircleOutlined,
    LinkOutlined,
    MergeOutlined,
} from '@ant-design/icons';
import { Button, Tag } from 'antd';
import dayjs from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type CardProps = {
    meetId: string;
    title: string;
    description: string;
    date: Date | null;
    time: string;
    totalParticipant: number;
    status: number;
};

export default function Card({
    meetId,
    title,
    description,
    date,
    time,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    totalParticipant,
    status,
}: CardProps): React.ReactNode {
    const locale = useLocale();
    const router = useRouter();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [delayCopy, setDelayCopy] = useState(false);
    const t = useTranslations();
    const intl = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    let tag = t('card_dashboard.cooming');
    let tagColor: 'success' | 'processing' | 'error' | 'warning' = 'processing';

    if (status == 1) {
        tag = t('card_dashboard.done');
        tagColor = 'success';
    }
    if (date && dayjs(date).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD') && status == 0) {
        tag = t('card_dashboard.absent');
        tagColor = 'error';
    }

    return (
        <div className="flex flex-col gap-2 rounded-lg border-1 border-gray-200 px-[24px] pt-[24px]">
            <div className="flex-1">
                <div className="flex justify-between gap-3">
                    <h3 className="font-bold tracking-tight">{title}</h3>
                    <div>
                        <Tag color={tagColor}>{tag}</Tag>
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-sm">
                    <p className="text-gray-500">{description}</p>
                    <div className="text-gray-800">
                        <div className="flex gap-2">
                            <CalendarOutlined />
                            {date ? intl.format(date) : ''}
                        </div>
                        <div className="flex gap-2">
                            <ClockCircleOutlined />
                            {time}
                        </div>
                        {/* <div className="flex gap-2">
                            <TeamOutlined />
                            {totalParticipant} {t('card_dashboard.participant')}
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
            <div className="flex justify-between h-[56px] items-center pb-[10px]">
                <Button
                    icon={<LinkOutlined />}
                    loading={loading}
                    key="link"
                    type="link"
                    className="flex-1 flex gap-2 justify-center text-gray-800"
                    onClick={() => {
                        setDelayCopy(true);
                        setTimeout(() => setDelayCopy(false), 2000);
                        if (delayCopy) {
                            showNotification({
                                description: 'Tunggu 2 detik sebelum melakukan copy link lagi',
                                message: 'Gagal',
                                type: 'error',
                            });

                            return;
                        }
                        navigator.clipboard.writeText(
                            window.location.origin + '/dashboard/meet/' + meetId
                        );
                        showNotification({
                            description:
                                'Link berhasil di copy, paste di url browser untuk menuju ruang meeting',
                            message: 'Berhasil',
                            type: 'success',
                        });
                    }}
                >
                    {t('card_dashboard.copy')}
                </Button>
                <Button
                    icon={<MergeOutlined />}
                    loading={loading}
                    type="link"
                    key="join"
                    className="flex-1 flex gap-2 justify-center text-gray-800 w-fit"
                    onClick={() => {
                        setLoading(true);
                        router.push('/dashboard/meet/' + meetId);
                    }}
                >
                    {t('card_dashboard.join')}
                </Button>
            </div>
        </div>
    );
}
