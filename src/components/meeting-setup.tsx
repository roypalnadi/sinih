'use client';

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { CameraIcon, MicIcon, SettingsIcon } from 'lucide-react';
import { Avatar, Button, Switch } from 'antd';
import { CheckOutlined, CloseOutlined, VideoCameraOutlined } from '@ant-design/icons';
import SetupMeeting from '@/lib/meeting/setup-meeting';
import { useAuth } from '@/lib/supabase/authContext';
import { Session } from '@supabase/supabase-js';
import { useNotification } from '@/lib/ant-design/notification-context';

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
    const call = useCall();
    const notif = useNotification();
    const [loading, setLoading] = useState(false);

    const { handleMic, handleVideo, isCameraLoading, isMicLoading } = SetupMeeting(call, notif);

    const { session } = useAuth();

    useEffect(() => {
        handleVideo(call?.camera?.enabled ?? false);
        handleMic(call?.microphone?.enabled ?? false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleJoin = async () => {
        setLoading(true);
        try {
            await call?.join({
                create: false,
            });
            onSetupComplete();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            notif.showNotification({
                message: 'Terjadi Masalah Pada Meeting',
                description: 'Meeting belum dimulai',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background/95">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* VIDEO PREVIEW CONTAINER */}
                    <div className="flex-2/3 rounded-lg border border-gray-200 shadow-sm p-7 w-sm h-auto">
                        <div>
                            <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
                            <p className="text-sm text-muted-foreground">
                                Make sure you look good!
                            </p>
                        </div>
                        {/* VIDEO PREVIEW */}
                        <div className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden border-gray-200 border relative">
                            <div className="absolute inset-0">
                                <VideoPreview
                                    className="!w-full !h-full"
                                    DisabledVideoPreview={() => <NoVideo session={session} />}
                                    NoCameraPreview={() => <NoVideo session={session} />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* CARD CONTROLS */}
                    <div className="flex-1/3 rounded-lg border border-gray-200 shadow-sm p-7 w-sm h-auto">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col text-start">
                                <span className="text-xl font-bold">Meeting Details</span>
                                <span className="text-gray-500 text-start">{call?.id}</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* CAM CONTROL */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <CameraIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Camera</p>
                                        </div>
                                    </div>
                                    <Switch
                                        loading={isCameraLoading}
                                        checked={call?.camera?.enabled ?? false}
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        onChange={(checked) => handleVideo(checked)}
                                    />
                                </div>

                                {/* MIC CONTROL */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <MicIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Microphone</p>
                                        </div>
                                    </div>
                                    <Switch
                                        loading={isMicLoading}
                                        checked={call?.microphone?.enabled ?? false}
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        onChange={(checked) => handleMic(checked)}
                                    />
                                </div>

                                {/* DEVICE SETTINGS */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <SettingsIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Settings</p>
                                            <p className="text-sm text-muted-foreground">
                                                Configure devices
                                            </p>
                                        </div>
                                    </div>
                                    <DeviceSettings />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <Button
                                    icon={<VideoCameraOutlined />}
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleJoin}
                                    loading={loading}
                                >
                                    Gabung meeting
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const NoVideo = ({ session }: { session: Session | null }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-semibold">
            <Avatar size={300} src={session?.user.user_metadata.avatar_url} />
        </div>
    );
};

export default MeetingSetup;
