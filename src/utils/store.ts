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
  activeEndpoint: "",
  endpoints: [] as string[],
  notification: {
    content: "",
    duration: 0,
  },
  language: "en",
  region: "US",
});

persistObservable(state$, {
  local: "state",
  pluginRemote: {
    set: async ({ value, changes }) => {
      console.log("value:", value);
      console.log("changes:", changes);

      //   if (!value) {
      //     console.log("Logout");
      //   }
      //
      //   changes.forEach(change => {
      //     change.path.forEach(async path => {
      //       console.log("path:", path);
      //
      //       if (path === "activeBackendEndpoint") {
      //         console.log("value:", JSON.stringify(value));
      //
      //         await fetch(`${value.activeBackendEndpoint}/sync`, {
      //           method: "POST",
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify(value),
      //         })
      //           .then(() => console.log("Sync successful"))
      //           .catch(err => console.error("Sync failed:", err));
      //       }
      //     });
      //   });
    },
  },
});

