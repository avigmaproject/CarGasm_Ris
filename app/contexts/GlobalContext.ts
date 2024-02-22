import React from "react";

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setFromLogin: () => {},
});

export default GlobalContext;
