'use client';

import Navbar from '@/components/ui/navbar';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPassword() {
    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
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
                        description: error.message,
                        message: 'Error',
                        type: 'error',
                    });
                    return;
                }
                showNotification({
                    description: 'Berhasil mengubah password, mohon coba login kembali',
                    message: 'Reset password berhasil',
                    type: 'success',
                });

                router.replace('login');
                return;
            })
            .finally(() => setLoading(false));
    };

    const showNotification = ({
        description,
        message,
        type,
    }: {
        description: string;
        message: string;
        type: NotificationType;
    }) => {
        api[type]({
            message,
            description,
            pauseOnHover: false,
            showProgress: true,
        });
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Navbar withAction={false} />
            {contextHolder}
            <div className="flex-1 flex justify-center items-center">
                <div className="rounded-lg border border-gray-200 my-10 shadow-sm p-7 h-fit max-w-md">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col text-center">
                            <span className="text-xl font-bold">Reset Password</span>
                            <span className="text-gray-500 text-center">
                                Buat password baru untuk akun Anda
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
                                        message: t('login.input_password_required'),
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Input password" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    icon={<SaveOutlined />}
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Simpan
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="flex items-center">
                            <div className="border-1 w-full border-gray-200 h-[1px]"></div>
                        </div>
                        <div className="w-full text-center">
                            <span className="text-gray-500 text-xs">
                                <Link href={'/forgot-password'} className="text-blue-500">
                                    Kembali ke lupa password
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
