"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface OptInDialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDialog: () => void;
  closeDialog: () => void;
}

const OptInDialogContext = createContext<OptInDialogContextType | undefined>(undefined);

interface OptInDialogProviderProps {
  children: ReactNode;
}

export const OptInDialogProvider = ({ children }: OptInDialogProviderProps) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const value = {
    open,
    setOpen,
    openDialog,
    closeDialog,
  };

  return (
    <OptInDialogContext.Provider value={value}>
      {children}
    </OptInDialogContext.Provider>
  );
};

export const useOptInDialog = () => {
  const context = useContext(OptInDialogContext);
  if (context === undefined) {
    throw new Error('useOptInDialog must be used within an OptInDialogProvider');
  }
  return context;
};
