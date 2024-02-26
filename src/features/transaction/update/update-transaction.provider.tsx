import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

type UpdateTransactionContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const UpdateTransactionContext = createContext<UpdateTransactionContextType | undefined>(
  undefined
);

export const UpdateTransactionProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <UpdateTransactionContext.Provider value={value}>{children}</UpdateTransactionContext.Provider>
  );
};

export const useUpdateTransactionContext = () => {
  const context = useContext(UpdateTransactionContext);

  if (context === undefined)
    throw new Error('useUpdateTransactionContext must be used within a UpdateTransactionProvider');

  return context;
};
