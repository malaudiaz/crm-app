import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  isOpenWait: false,
  user: {
    id: "",
    username: "",
    fullname: "",
    dni: "",
    job: "",
    email: "",
    phone: "",
    photo: "",
  },
  openWait: () => {},
  closeWait: () => {},
  setUser: () => {}
});

export default function StateWrapper({ children }) {
  const [isOpenWait, setIsOpenWait] = useState(false);
  const [user, setUser] = useState({});

  function handleOpenWait() {
    setIsOpenWait(true);
  }

  function handleCloseWait() {
    setIsOpenWait(false);
  }

  function handleCurrentUser(currUser) {
    setUser(currUser);
  }

  return (
    <AppContext.Provider
      value={{
        isOpenWait,
        user,
        openWait: handleOpenWait,
        closeWait: handleCloseWait,
        setUser: handleCurrentUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
    return useContext(AppContext);
}