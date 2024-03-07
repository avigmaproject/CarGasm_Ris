import React from "react";

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setFromLogin: () => {},
  setGlobalUserName: () => {},

  globalUserName: "",

});

export default GlobalContext;
