'use client';

import { useAuth } from '@/lib/supabase/authContext';

export default function Home() {
    const auth = useAuth();
    console.log(auth);
    return (
        <>
            <div className="flex-1">merah muda dan biru</div>
        </>
    );
}
