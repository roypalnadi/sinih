import { useAuth } from '@/lib/supabase/authContext';
import { CallControls, SpeakerLayout, useCall } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function MeetingRoom({ createdBy }: { createdBy: string }) {
    const router = useRouter();
    const call = useCall();
    const { session } = useAuth();

    useEffect(() => {
        if (!call) return;

        const handleCallEnded = () => {
            router.push('/dashboard');
        };

        // Tambahkan listener
        call.on('call.ended', handleCallEnded);

        return () => {
            // Bersihkan listener
            call.off('call.ended', handleCallEnded);
        };
    }, [call, router]);

    return (
        <div className="fixed flex flex-col top-0 left-0 w-screen h-screen z-50 bg-black">
            <SpeakerLayout participantsBarPosition={'right'} />
            <CallControls
                onLeave={() => {
                    if (createdBy == session?.user.id) {
                        call?.endCall();
                    } else {
                        call?.leave();
                    }
                    router.push('/dashboard');
                }}
            />
        </div>
    );
}
export default MeetingRoom;
