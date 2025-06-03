import { writable } from "svelte/store";

export type AppContextType = "miniapp" | "mobile" | "web";

const appContext = writable<AppContextType>("web");

export const appContextStore = {
  subscribe: appContext.subscribe,
  setAppContext(value: AppContextType) {
    appContext.set(value);
  },
};
