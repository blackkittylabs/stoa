type AppContextType = "miniapp" | "mobile" | "web";
let appContext = $state<AppContextType>("web");

export const appContextStore = {
  get appContext() {
    return appContext;
  },
  setAppContext(value: AppContextType) {
    appContext = value;
  },
};
