import { observable } from "@legendapp/state";
import { configureObservablePersistence, persistObservable } from "@legendapp/state/persist";
import { ObservablePersistSessionStorage } from "@legendapp/state/persist-plugins/local-storage";

configureObservablePersistence({
  pluginLocal: ObservablePersistSessionStorage
});

export const state$ = observable({
  username: "",
  backend: "",
  notification: {
    content: "",
    duration: 0,
  },
});

persistObservable(state$, {
  local: "state"
});

