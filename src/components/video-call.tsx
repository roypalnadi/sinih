import { useState } from 'react';
import MeetingSetup from './meeting-setup';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import MeetingRoom from './meeting-room';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import { Spin } from 'antd';

const VideoCall = ({ meetId }: { meetId: string }) => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [createdBy, setCreatedBy] = useState<string | null>(null);

    supabaseClient
        .from('meeting')
        .select('created_by')
        .eq('meet_id', meetId)
        .single()
        .then(({ data }) => {
            setCreatedBy(data?.created_by);
        });

    return (
        <Spin spinning={createdBy == null}>
            {isSetupComplete ? (
                <MeetingRoom createdBy={createdBy!} />
            ) : (
                <MeetingSetup
                    createdBy={createdBy!}
                    onSetupComplete={() => {
                        supabaseClient.from('meeting').update({ status: 1 }).eq('meet_id', meetId);
                        setIsSetupComplete(true);
                    }}
                />
            )}
        </Spin>
    );
};

export default VideoCall;
