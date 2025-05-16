'use client';

import { useNotification } from '@/lib/ant-design/notification-context';
import { useAuth } from '@/lib/supabase/authContext';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 } from 'uuid';

export default function CreateMeeting() {
    const { session } = useAuth();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
                        description: error.message,
                        message: 'Gagal',
                        type: 'error',
                    });
                    return;
                }

                router.push('/dashboard');

                showNotification({
                    description: 'Data berhasil disimpan',
                    message: 'Berhasil',
                    type: 'success',
                });
            });
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="rounded-lg border border-gray-200 my-10 shadow-sm p-7 h-fit w-md">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col text-left">
                        <span className="text-xl font-bold">Buat Meeting Baru</span>
                        <span className="text-gray-500 text-sm">
                            {'Jadwalkan meeting baru dan kirim undangan ke peserta'}
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
                                label="Judul Meeting"
                                name="title"
                                className="text-sm font-medium"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Judul meeting wajib diisi',
                                    },
                                ]}
                            >
                                <Input placeholder={'Masukan judul meeting'} />
                            </Form.Item>
                            <Form.Item
                                label="Deskripsi"
                                name="description"
                                className="text-sm font-medium"
                            >
                                <Input.TextArea
                                    placeholder={'Deskripsi tentang meeting ini (opsional)'}
                                />
                            </Form.Item>

                            <div className="flex gap-3">
                                <Form.Item
                                    label="Tanggal"
                                    name="date"
                                    className="text-sm font-medium"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tanggal wajib diisi',
                                        },
                                    ]}
                                >
                                    <DatePicker format="dddd, MMMM D, YYYY" />
                                </Form.Item>
                                <Form.Item
                                    label="Waktu"
                                    name="times"
                                    className="text-sm font-medium"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Waktu meeting wajib diisi',
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
                                    Buat Meeeting
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
