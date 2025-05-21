'use client';

import Image from 'next/image';
import { Button, Input, InputRef } from 'antd';
import {
    ArrowRight,
    Calendar,
    MessageCircle,
    ScreenShare,
    Shield,
    Users,
    Video,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { RefObject, useRef } from 'react';
import Navbar from './navbar';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
    const t = useTranslations();
    const joinMeet = useRef<InputRef>(null);
    const router = useRouter();
    const sectionData = {
        join: useRef(null),
        feature: useRef(null),
    };
    const scrollTo = (ref: RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Navbar
                onClick1={() => scrollTo(sectionData.join)}
                onClick2={() => scrollTo(sectionData.feature)}
            />
            <section ref={sectionData.join}>
                <div className="flex flex-col lg:flex-row px-8 py-30 gap-6 bg-gradient-to-b from-background to-white-100">
                    <div className="flex-1">
                        <div className="flex flex-col justify-center h-full lg:pr-10 gap-3">
                            <span className="text-6xl font-bold tracking-tighter">
                                {t.rich('landing_page.first', {
                                    span: (chunks) => (
                                        <span className="text-primary-600">{chunks}</span>
                                    ),
                                })}
                            </span>
                            <span className="text-xl tracking-tighter text-gray-500">
                                {t('landing_page.first_sub')}
                            </span>
                            <div className="flex gap-2">
                                <div className="w-full sm:w-1/2">
                                    <Input
                                        placeholder={t('landing_page.input_meet_placeholder')}
                                        size="large"
                                        ref={joinMeet}
                                    />
                                </div>
                                <Button
                                    type="primary"
                                    className="text-sm !font-bold"
                                    size="large"
                                    onClick={() => {
                                        if (joinMeet.current?.input?.value) {
                                            router.push(
                                                `/dashboard/meet/${joinMeet.current.input.value}`
                                            );
                                        }
                                    }}
                                >
                                    {t('landing_page.button_1')}
                                </Button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="text-sm !font-bold"
                                    onClick={() => {
                                        router.push('/dashboard/create-meeting');
                                    }}
                                >
                                    {t('landing_page.button_2')}
                                </Button>
                                <Button
                                    className="text-sm"
                                    size="large"
                                    onClick={() => {
                                        router.push('/sign-up');
                                    }}
                                >
                                    {t('landing_page.button_3')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video">
                            <Image
                                src="/images/landing_page/first.jpg"
                                alt=""
                                fill
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section ref={sectionData.feature}>
                <div className="flex flex-col px-8 py-20 gap-6">
                    <div className="flex flex-col gap-5 text-center">
                        <span className="text-5xl font-bold tracking-tighter">
                            {t('landing_page.feature_title')}
                        </span>
                        <span className="tracking-tighter text-gray-500">
                            {t('landing_page.feature_sub')}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 items-center text-center bg-background/60 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <Video className="text-primary-600" />
                            </div>
                            <span className="text-lg font-bold">{t('landing_page.feature_1')}</span>
                            <span className="text-gray-500 text-center">
                                {t('landing_page.feature_1_sub')}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 items-center text-center bg-background/60 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <Calendar className="text-primary-600" />
                            </div>
                            <span className="text-lg font-bold">{t('landing_page.feature_2')}</span>
                            <span className="text-gray-500 text-center">
                                {t('landing_page.feature_2_sub')}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 items-center text-center bg-background/60 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <MessageCircle className="text-primary-600" />
                            </div>
                            <span className="text-lg font-bold">{t('landing_page.feature_3')}</span>
                            <span className="text-gray-500 text-center">
                                {t('landing_page.feature_3_sub')}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 items-center text-center bg-background/60 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <Users className="text-primary-600" />
                            </div>
                            <span className="text-lg font-bold">{t('landing_page.feature_4')}</span>
                            <span className="text-gray-500 text-center">
                                {t('landing_page.feature_4_sub')}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 items-center text-center bg-background/60 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <Shield className="text-primary-600" />
                            </div>
                            <span className="text-lg font-bold">{t('landing_page.feature_5')}</span>
                            <span className="text-gray-500 text-center">
                                {t('landing_page.feature_5_sub')}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 items-center text-center bg-background/60 p-6">
                            <div className="rounded-full bg-primary/10 p-3">
                                <ScreenShare className="text-primary-600" />
                            </div>
                            <span className="text-lg font-bold">{t('landing_page.feature_6')}</span>
                            <span className="text-gray-500 text-center">
                                {t('landing_page.feature_6_sub')}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col px-8 py-20 gap-3 bg-white-100 sm:items-center">
                <span className="text-5xl font-bold tracking-tighter">
                    {t('landing_page.ready_title')}
                </span>
                <span className="text-xl tracking-tighter text-gray-500">
                    {t('landing_page.ready_sub')}
                </span>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Button
                        type="primary"
                        size="large"
                        className="text-sm !font-bold"
                        onClick={() => {
                            router.push('/sign-up');
                        }}
                    >
                        {t('landing_page.button_3')} <ArrowRight size={18} />
                    </Button>
                    <Button
                        className="text-sm"
                        size="large"
                        onClick={() => {
                            router.push('/dashboard/create-meeting');
                        }}
                    >
                        {t('landing_page.button_2')}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
