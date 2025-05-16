import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

function MeetingRoom() {
    const router = useRouter();
    return (
        <div className="fixed flex flex-col top-0 left-0 w-screen h-screen z-50 bg-black">
            <SpeakerLayout participantsBarPosition={'right'} />
            <CallControls onLeave={() => router.push('/dashboard')} />
        </div>
    );
}
export default MeetingRoom;
