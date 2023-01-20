import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  user: {},
  setUser: () => {}
});

export default function StateWrapper({ children }) {
  const [user, setUser] = useState({});

  function handleCurrentUser(currUser) {
    setUser(currUser);
  }

  return (
    <AppContext.Provider
      value={{
        user,
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