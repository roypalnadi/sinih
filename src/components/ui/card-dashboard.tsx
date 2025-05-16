'use client';

import {
    CalendarOutlined,
    ClockCircleOutlined,
    LinkOutlined,
    MergeOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type CardProps = {
    meetId: string;
    title: string;
    tag: string;
    tagColor: 'success' | 'processing' | 'error' | 'warning';
    description: string;
    date: Date | null;
    time: string;
    totalParticipant: number;
};

export default function Card({
    meetId,
    title,
    tag,
    tagColor,
    description,
    date,
    time,
    totalParticipant,
}: CardProps): React.ReactNode {
    const locale = useLocale();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const t = useTranslations();
    const intl = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
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
                        <div className="flex gap-2">
                            <TeamOutlined />
                            {totalParticipant} {t('card_dashboard.participant')}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
            <div className="flex justify-between h-[56px] items-center pb-[10px]">
                <Button
                    loading={loading}
                    key="link"
                    type="link"
                    className="flex-1 flex gap-2 justify-center text-gray-800"
                    onClick={(res) => console.log(res)}
                >
                    <LinkOutlined />
                    {t('card_dashboard.copy')}
                </Button>
                <Button
                    loading={loading}
                    type="link"
                    key="join"
                    className="flex-1 flex gap-2 justify-center text-gray-800 w-fit"
                    onClick={() => {
                        setLoading(true);
                        router.push('/dashboard/meet/' + meetId);
                    }}
                >
                    <MergeOutlined />
                    {t('card_dashboard.join')}
                </Button>
            </div>
        </div>
    );
}
