'use client';

import {
    CalendarOutlined,
    PlusOutlined,
    TeamOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Segmented } from 'antd';
import { useState } from 'react';

export default function Dashboard() {
    const [meetingMe, setMettingMe] = useState('first');
    return (
        <>
            <div className="p-10 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-gray-500">
                            Selamat datang kembali! Berikut adalah ringkasan meeting Anda.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button type="primary" size="large" icon={<PlusOutlined />}>
                            Buat Meeting
                        </Button>
                        <Button size="large" icon={<VideoCameraOutlined />}>
                            Gabung
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1 border-1 rounded-lg p-5 border-gray-300">
                        <div className="flex justify-between">
                            <span className="text-sm font-bold">Meeting hari ini</span>
                            <CalendarOutlined size={1} />
                        </div>
                        <h2 className="text-2xl font-bold text-start">2</h2>
                        <span className="text-xs text-gray-500">Meeting dijadwalkan hari ini</span>
                    </div>
                    <div className="flex-1 border-1 rounded-lg p-5 border-gray-300">
                        <div className="flex justify-between">
                            <span className="text-sm font-bold">Meeting Minggu Ini</span>
                            <CalendarOutlined size={1} />
                        </div>
                        <h2 className="text-2xl font-bold text-start">2</h2>
                        <span className="text-xs text-gray-500">Total meeting minggu ini</span>
                    </div>
                    <div className="flex-1 border-1 rounded-lg p-5 border-gray-300">
                        <div className="flex justify-between">
                            <span className="text-sm font-bold">Kontak</span>
                            <TeamOutlined size={1} />
                        </div>
                        <h2 className="text-2xl font-bold text-start">2</h2>
                        <span className="text-xs text-gray-500">Kontak yang tersimpan</span>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <Segmented
                            options={[
                                { label: <div key={1}>Akan datan</div>, value: 'first' },
                                { label: <div key={2}>Terbaru</div>, value: 'second' },
                            ]}
                            onChange={(value) => {
                                setMettingMe(value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
