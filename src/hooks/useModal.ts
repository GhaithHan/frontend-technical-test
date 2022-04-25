import { useCallback, useState } from 'react';

import useBlockScroll from './useBlockScroll';

export interface ModalHook {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export function useModal(ignoreBlockScroll = false): ModalHook {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  useBlockScroll({ isOpen, ignoreBlockScroll });

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
}
