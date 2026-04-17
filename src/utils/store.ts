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
  backendEndpoints: [],
  activeEndpoint: "",
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

      if (value.activeEndpoint) {
        console.log("activeEndpoint:", value.activeEndpoint);

        await fetch(`${value.activeEndpoint}/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        })
          .then(() => console.log("Sync successful"))
          .catch(err => console.error("Sync failed:", err));
      }
    },
  },
});

