import { Call } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { NotificationContextType } from '../ant-design/notification-context';

export default function SetupMeeting(call: Call | undefined, notif: NotificationContextType) {
    const [isCameraLoading, setIsCameraLoading] = useState(false);
    const [isMicLoading, setIsMicLoading] = useState(false);

    const handleVideo = (on: boolean) => {
        setIsCameraLoading(true);
        if (!on)
            call?.camera.disable().finally(() => {
                setIsCameraLoading(false);
            });
        else
            call?.camera
                .enable()
                .catch((e) => {
                    notif.showNotification({
                        message: 'Terjadi Masalah Pada Kamera',
                        description: e.message,
                        type: 'error',
                    });
                })
                .finally(() => {
                    setIsCameraLoading(false);
                });
    };

    const handleMic = (on: boolean) => {
        setIsMicLoading(true);
        if (!on) {
            call?.microphone.disable().finally(() => {
                setIsMicLoading(false);
            });
        } else
            call?.microphone
                .enable()
                .catch((e) => {
                    notif.showNotification({
                        message: 'Terjadi Masalah Pada Microphone',
                        description: e.message,
                        type: 'error',
                    });
                })
                .finally(() => {
                    setIsMicLoading(false);
                });
    };

    return {
        isCameraLoading,
        isMicLoading,
        handleMic,
        handleVideo,
    };
}
