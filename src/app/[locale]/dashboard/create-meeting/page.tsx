'use client';

import { useNotification } from '@/lib/ant-design/notification-context';
import { useAuth } from '@/lib/supabase/authContext';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { RollbackOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 } from 'uuid';

export default function CreateMeeting() {
    const { session } = useAuth();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const t = useTranslations();

    const onFinish = ({
        title,
        description,
        date,
        times,
    }: {
        title: string;
        description: string;
        date: dayjs.Dayjs;
        times: dayjs.Dayjs[];
    }) => {
        setLoading(true);
        supabaseClient
            .from('meeting')
            .insert({
                title,
                description,
                meet_id: v4(),
                date: date.format('YYYY-MM-DD'),
                start_time: times[0]?.format('HH:mm:ss'),
                end_time: times[1]?.format('HH:mm:ss'),
                created_by: session?.user.id,
            })
            .then(({ error }) => {
                setLoading(false);

                if (error) {
                    showNotification({
                        message: t('create_meeting.notif_error_title'),
                        description: t('create_meeting.notif_error_description'),
                        type: 'error',
                    });
                    return;
                }

                router.push('/dashboard');

                showNotification({
                    message: t('create_meeting.notif_success_title'),
                    description: t('create_meeting.notif_success_description'),
                    type: 'success',
                });
            });
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="rounded-lg border border-gray-200 my-10 shadow-sm p-7 h-fit w-md">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col text-left">
                        <div className="flex justify-between">
                            <span className="text-xl font-bold">{t('create_meeting.title')}</span>
                            <Button
                                icon={<RollbackOutlined />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/dashboard');
                                }}
                            ></Button>
                        </div>
                        <span className="text-gray-500 text-sm w-90">
                            {t('create_meeting.sub')}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <Form
                            name="create-meeting-form"
                            layout="vertical"
                            initialValues={{
                                date: dayjs(), // harus pakai dayjs object, bukan Date
                            }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label={t('create_meeting.form_meet_title')}
                                name="title"
                                className="text-sm font-medium"
                                rules={[
                                    {
                                        required: true,
                                        message: t('create_meeting.form_meet_required'),
                                    },
                                ]}
                            >
                                <Input placeholder={t('create_meeting.form_meet_placeholder')} />
                            </Form.Item>
                            <Form.Item
                                label={t('create_meeting.form_description_title')}
                                name="description"
                                className="text-sm font-medium"
                            >
                                <Input.TextArea
                                    placeholder={t('create_meeting.form_description_placeholder')}
                                />
                            </Form.Item>

                            <div className="flex gap-3">
                                <Form.Item
                                    label={t('create_meeting.form_date_title')}
                                    name="date"
                                    className="text-sm font-medium flex-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('create_meeting.form_date_required'),
                                        },
                                    ]}
                                >
                                    <DatePicker format="dddd, MMMM D, YYYY" />
                                </Form.Item>
                                <Form.Item
                                    label={t('create_meeting.form_time_title')}
                                    name="times"
                                    className="text-sm font-medium flex-1"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('create_meeting.form_time_required'),
                                        },
                                    ]}
                                >
                                    <TimePicker.RangePicker />
                                </Form.Item>
                            </div>

                            <Form.Item>
                                <Button
                                    icon={<VideoCameraAddOutlined />}
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    {t('create_meeting.btn_create')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
