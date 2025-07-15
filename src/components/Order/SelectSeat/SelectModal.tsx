'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

export default function SelectModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Modal tashqarisiga bosilganda yopish
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-[#ffffff7f] backdrop-blur-md z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="w-[548px] p-10 bg-white rounded-[12px] border border-[#CBD4E6]"
        style={{
          boxShadow:
            '0px 2px 4px 0px rgba(7, 4, 146, 0.10), 0px 24px 60px 0px rgba(6, 47, 125, 0.05), 0px 12px 24px 0px rgba(27, 59, 119, 0.05)',
        }}
      >
        <strong className="text-[#6E7491] text-2xl mb-3 inline-block">Upgrade seat</strong>
        <p className="text-[#7C8DB0] text-[18px] mb-5">
          Upgrade your seat for only $199, and enjoy 45 percent more leg room, and seats that
          recline 40 percent more than economy.
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button variant="cancel" size="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="upgrade" size="upgrade">
            Upgrade for $199
          </Button>
        </div>
      </div>
    </div>
  );
}
