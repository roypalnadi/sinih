'use client';

import Navbar from '@/components/ui/navbar';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { Button, Form, Input, Spin } from 'antd';
import GithubIcon from '@/components/icons/GithubIcon';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { LoginOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNotification } from '@/lib/ant-design/notification-context';
import { useAuth } from '@/lib/supabase/authContext';

export default function Login() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const router = useRouter();
    const { session, sessionReady } = useAuth();

    useEffect(() => {
        if (sessionReady && session?.user) {
            router.replace(redirect);
        }
    }, [session, router, sessionReady, redirect]);

    const loginWithGoogle = () =>
        supabaseClient.auth
            .signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/${redirect}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                console.log(response.error);
            });
    const loginWithGithub = () =>
        supabaseClient.auth
            .signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/${redirect}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                console.log(response.error);
            });

    const loginWithPassword = ({ email, password }: { email: string; password: string }) => {
        setLoading(true);
        supabaseClient.auth
            .signInWithPassword({
                email,
                password,
            })
            .then(({ error }) => {
                if (error != null) {
                    showNotification({
                        message: t('login.invalid_login'),
                        description: t(`supabase.auth.${error.code}`),
                        type: 'error',
                    });
                    return;
                }
                showNotification({
                    message: 'Berhasil',
                    description: 'Selamat datang',
                    type: 'success',
                });
                router.replace(redirect);
                return;
            })
            .finally(() => setLoading(false));
    };

    const onFinish = ({ email, password }: { email: string; password: string }) => {
        loginWithPassword({ email, password });
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Spin spinning={!sessionReady}>
            <Navbar withAction={false} />
            <div className="flex-1 flex justify-center items-center">
                <div className="rounded-lg border border-gray-200 my-10 shadow-sm p-7 h-fit w-md">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col text-center">
                            <span className="text-xl font-bold">Login</span>
                            <span className="text-gray-500 text-center">{t('login.first')}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button
                                icon={<GoogleIcon />}
                                block
                                className="!py-[15px] !px-[16px]"
                                onClick={loginWithGoogle}
                            >
                                <span className="text-sm font-medium">
                                    {t('login.with_google')}
                                </span>
                            </Button>
                            <Button
                                icon={<GithubIcon />}
                                block
                                className="!py-[15px] !px-[16px]"
                                onClick={loginWithGithub}
                            >
                                <span className="text-sm font-medium">
                                    {t('login.with_github')}
                                </span>
                            </Button>
                        </div>

                        <div className="flex items-center">
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                            <span className="text-gray-500 text-xs mx-3">{t('login.or')}</span>
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                        </div>

                        <div className="flex flex-col">
                            <Form
                                name="email-form"
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    className="text-sm font-medium"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('login.input_email_required'),
                                        },
                                        {
                                            type: 'email',
                                            message: t('login.input_email_valid'),
                                        },
                                    ]}
                                >
                                    <Input placeholder={t('login.input_email_placeholder')} />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    className="text-sm font-medium"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('login.input_password_required'),
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Input password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        icon={<LoginOutlined />}
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        {t('login.bottom_submit')}
                                    </Button>
                                </Form.Item>
                            </Form>

                            <Button
                                block
                                type="link"
                                onClick={() => router.replace('forget-password')}
                            >
                                {t('login.forget_password')}
                            </Button>
                        </div>
                        <div className="flex items-center">
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                        </div>
                        <div className="w-full text-center">
                            <span className="text-gray-500 text-xs">
                                {t('login.dont_have_account')}{' '}
                                <Link href={'/sign-up'} className="text-blue-500">
                                    {t('login.bottom_create_account')}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
}
