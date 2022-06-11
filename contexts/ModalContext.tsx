import { createContext, useState } from "react";

const initalValues: any = {};

const ModalContext = createContext(initalValues);

type ModalProviderProps = {
  children: any;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpenModal, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpenModal,
        setIsModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
