import { create } from "zustand";

interface SignInModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSignInModalStore = create<SignInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSignInModalStore;
