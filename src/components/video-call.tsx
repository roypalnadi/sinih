import { useState } from 'react';
import MeetingSetup from './meeting-setup';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import MeetingRoom from './meeting-room';

const VideoCall = () => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    return (
        <>
            {isSetupComplete ? (
                <MeetingRoom />
            ) : (
                <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
            )}
        </>
    );
};

export default VideoCall;
