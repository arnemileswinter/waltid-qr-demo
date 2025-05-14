'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PollSSI({state}:{state:string}) {
  const router = useRouter();

  useEffect(() => {
    const poll = async () => {
      try {
        const response = await fetch(`/api?state=${state}`);
        if (response.status !== 200) {
          setTimeout(poll, 1000); // Retry after 1 second
        } else {
          router.push(`/success?state=${state}`);
        }
      } catch (err) {
        console.error('Polling error:', err);
        setTimeout(poll, 1000);
      }
    };

    poll();
  }, [state,router]);

  return <div>Waiting for vc presentation...</div>;
}
