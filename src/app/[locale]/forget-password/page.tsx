'use client';

import Navbar from '@/components/ui/navbar';
import { useNotification } from '@/lib/ant-design/notification-context';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ForgetPassword() {
    const params = useParams(); // Ambil [locale]
    const locale = params?.locale || 'en';
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const onFinish = ({ email }: { email: string }) => {
        setLoading(true);
        supabaseClient.auth
            .resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/${locale}/reset-password`,
            })
            .then(({ error }) => {
                if (error != null) {
                    showNotification({
                        description: error.message,
                        message: 'Error',
                        type: 'error',
                    });
                    return;
                }
                showNotification({
                    description: 'Silahkan buka email anda untuk instruksi reset password',
                    message: 'Permintaan dikirim',
                    type: 'success',
                });
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
                            <span className="text-xl font-bold">Lupa Password</span>
                            <span className="text-gray-500 text-center">
                                Masukkan email Anda untuk menerima instruksi reset password
                            </span>
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

                            <Form.Item>
                                <Button
                                    icon={<MailOutlined />}
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Kirim intruksi reset
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="flex items-center">
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                        </div>
                        <div className="w-full text-center">
                            <span className="text-gray-500 text-xs">
                                Ingat password Anda?{' '}
                                <Link href={'/login'} className="text-blue-500">
                                    Kembali ke login
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
