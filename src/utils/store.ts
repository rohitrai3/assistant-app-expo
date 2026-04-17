import { observable } from "@legendapp/state";
import { configureObservablePersistence, persistObservable } from "@legendapp/state/persist";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

configureObservablePersistence({
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage,
    },
  },
});

export const state$ = observable({
  username: "",
  backendEndpoints: [] as string[],
  activeBackendEndpoint: "",
  notification: {
    content: "",
    duration: 0,
  },
});

persistObservable(state$, {
  local: "state",
  pluginRemote: {
    set: async ({ value }) => {
      console.log("pluginRemote.set:", value);
      console.log("activeEndpoint:", value.activeBackendEndpoint);

      // if (value.activeBackendEndpoint) {
      //   console.log("activeEndpoint:", value.activeBackendEndpoint);
      //
      //   await fetch(`${value.activeBackendEndpoint}/sync`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(value),
      //   })
      //     .then(() => console.log("Sync successful"))
      //     .catch(err => console.error("Sync failed:", err));
      // }
    },
  },
});

