type AppContext = {
  setAuthenticated: (value: boolean) => void;
  setFromLogin: (value: boolean) => void;
  setGlobalUserName: (value: string) => void;
  globalUserName: string;
};
