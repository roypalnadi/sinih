'use client';

import Navbar from '@/components/ui/navbar';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { Button, Form, Input } from 'antd';
import GithubIcon from '@/components/icons/GithubIcon';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/lib/ant-design/notification-context';

export default function SignUp() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showNotification } = useNotification();

    const loginWithGoogle = () =>
        supabaseClient.auth.signInWithOAuth({ provider: 'google' }).then((response) => {
            console.log(response.data);
            console.log(response.error);
        });
    const loginWithGithub = () =>
        supabaseClient.auth.signInWithOAuth({ provider: 'github' }).then((response) => {
            console.log(response.data);
            console.log(response.error);
        });

    const signUpWithPassword = ({ email, password }: { email: string; password: string }) => {
        setLoading(true);
        supabaseClient.auth
            .signUp({
                email,
                password,
            })
            .then(({ error }) => {
                if (error != null) {
                    showNotification({
                        message: t('signup.invalid_singup'),
                        description: t(`supabase.auth.${error.code}`),
                        type: 'error',
                    });
                    return;
                }
                router.replace('login');
                showNotification({
                    message: t('signup.success'),
                    description: t('signup.success_description'),
                    type: 'success',
                });
            })
            .finally(() => setLoading(false));
    };

    const onFinish = ({ email, password }: { email: string; password: string }) => {
        signUpWithPassword({ email, password });
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Navbar withAction={false} />
            <div className="flex-1 flex justify-center items-center">
                <div className="rounded-lg border border-gray-200 my-10 shadow-sm p-7 h-fit w-md">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col text-center">
                            <span className="text-xl font-bold">{t('signup.title')}</span>
                            <span className="text-gray-500 text-center">
                                {t('signup.sub_title')}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button
                                icon={<GoogleIcon />}
                                block
                                className="!py-[15px] !px-[16px]"
                                onClick={loginWithGoogle}
                            >
                                <span className="text-sm font-medium">
                                    {t('signup.with_google')}
                                </span>
                            </Button>
                            <Button
                                icon={<GithubIcon />}
                                block
                                className="!py-[15px] !px-[16px]"
                                onClick={loginWithGithub}
                            >
                                <span className="text-sm font-medium">
                                    {t('signup.with_github')}
                                </span>
                            </Button>
                        </div>

                        <div className="flex items-center">
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                            <span className="text-gray-500 text-xs mx-3">{t('signup.or')}</span>
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                        </div>

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
                                        message: t('signup.input_email_required'),
                                    },
                                    {
                                        type: 'email',
                                        message: t('signup.input_email_valid'),
                                    },
                                ]}
                            >
                                <Input placeholder={t('signup.input_email_placeholder')} />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                className="text-sm font-medium"
                                rules={[
                                    {
                                        required: true,
                                        message: t('signup.input_password_required'),
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Konfirmasi Password"
                                className="text-sm font-medium"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: t('signup.input_confirmed_password_required'),
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    t('signup.input_confirmed_password_matched')
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    icon={<UserAddOutlined />}
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    {t('signup.send')}
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="flex items-center">
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                        </div>
                        <div className="w-full text-center">
                            <span className="text-gray-500 text-xs">
                                {t('signup.back_1')}{' '}
                                <Link href={'/login'} className="text-blue-500">
                                    {t('signup.back_2')}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
