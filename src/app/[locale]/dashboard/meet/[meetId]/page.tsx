'use client';

import VideoCall from '@/components/video-call';
import { StreamCall, StreamTheme, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { Spin } from 'antd';
import { useParams } from 'next/navigation';
import React from 'react';

export default function MeetPage() {
    const client = useStreamVideoClient();
    const { meetId } = useParams();

    if (client) {
        const call = client.call('default', meetId?.toString() ?? 'Guest');
        call.camera.disable();
        call.microphone.disable();

        return (
            <StreamCall call={call}>
                <StreamTheme>
                    <VideoCall />
                </StreamTheme>
            </StreamCall>
        );
    }
    return (
        <>
            <div className="flex items-center justify-center h-100">
                <Spin />
            </div>
        </>
    );
}
