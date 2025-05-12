'use client';

import { VerticalLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Join(): React.ReactNode {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = ({ meetId }: { meetId: string }) => {
        setLoading(true);
        router.push('/dashboard/meet/' + meetId);
    };

    return (
        <div className="min-h-100 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 min-w-sm">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">Bergabung ke Rapat</h2>
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
                            label="ID Rapat"
                            name="meetId"
                            className="text-sm font-medium"
                            rules={[
                                {
                                    required: true,
                                    message: 'ID Rapat wajib diisi',
                                },
                            ]}
                        >
                            <Input
                                placeholder={'Masukan ID Rapat'}
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
                                Bergabung
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
