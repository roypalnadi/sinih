'use client';

import { RollbackOutlined, VerticalLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Join(): React.ReactNode {
    const [form] = Form.useForm();
    const router = useRouter();
    const t = useTranslations();
    const [loading, setLoading] = useState(false);

    const onFinish = ({ meetId }: { meetId: string }) => {
        setLoading(true);
        router.push('/dashboard/meet/' + meetId);
    };

    return (
        <div className="min-h-100 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 min-w-sm">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">{t('join.title')}</h2>
                </div>
                <div className="flex flex-col">
                    <Form
                        form={form}
                        name="join-form"
                        layout="vertical"
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label={t('join.form_id_meet')}
                            name="meetId"
                            className="text-sm font-medium"
                            rules={[
                                {
                                    required: true,
                                    message: t('join.form_id_meet_required'),
                                },
                            ]}
                        >
                            <Input
                                placeholder={t('join.form_id_meet_placeholder')}
                                onChange={(e) => {
                                    const noSpace = e.target.value.replace(/\s/g, '');
                                    form.setFieldsValue({
                                        meetId: noSpace,
                                    });
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                icon={<VerticalLeftOutlined />}
                                block
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                {t('join.btn_join')}
                            </Button>
                            <Button
                                className="mt-2"
                                icon={<RollbackOutlined />}
                                block
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/dashboard');
                                }}
                            >
                                {t('join.btn_back')}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
