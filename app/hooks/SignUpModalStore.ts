import { create } from "zustand";

interface SignUpModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSignUpModalStore = create<SignUpModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSignUpModalStore;
