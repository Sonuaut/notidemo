"use client";

import { useOptInDialog } from '@/components/landingpage/OptInDialogProvider';

interface OptInDialogTriggerProps {
  children?: React.ReactNode;
  className?: string;
}

export const OptInDialogTrigger = ({ children, className }: OptInDialogTriggerProps) => {
  const { openDialog } = useOptInDialog();

  return (
    <button 
      onClick={openDialog}
      className={className || "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"}
    >
      {children || "Open Opt-In Dialog"}
    </button>
  );
};

export default OptInDialogTrigger;
