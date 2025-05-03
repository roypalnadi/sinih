'use client';

import Navbar from '@/components/ui/navbar';
import { useNotification } from '@/lib/ant-design/notification-context';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPassword() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const router = useRouter();

    const onFinish = ({ password }: { password: string }) => {
        setLoading(true);
        supabaseClient.auth
            .updateUser({
                password,
            })
            .then(({ error }) => {
                if (error != null) {
                    showNotification({
                        description: t(`supabase.auth.${error.code}`),
                        message: t('reset_password.notification_error'),
                        type: 'error',
                    });
                    return;
                }
                showNotification({
                    description: t('reset_password.notification_success_description'),
                    message: t('reset_password.notification_success'),
                    type: 'success',
                });

                router.replace('login');
                return;
            })
            .finally(() => setLoading(false));
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
                            <span className="text-xl font-bold">{t('reset_password.title')}</span>
                            <span className="text-gray-500 text-center">
                                {t('reset_password.title')}
                            </span>
                        </div>
                        <Form
                            name="reset-form"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Password"
                                name="password"
                                className="text-sm font-medium"
                                rules={[
                                    {
                                        required: true,
                                        message: t('reset_password.input_password_required'),
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    icon={<SaveOutlined />}
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    {t('reset_password.send')}
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="flex items-center">
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                        </div>
                        <div className="w-full text-center">
                            <span className="text-gray-500 text-xs">
                                <Link href={'/forgot-password'} className="text-blue-500">
                                    {t('reset_password.back')}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
