import { TERTIARY } from "@/utils/constants";
import IconButton from "./IconButton";
import { state$ } from "@/utils/store";
import { useRouter } from "expo-router";

export default function SignOut() {
  const router = useRouter();

  function signOut() {
    state$.username.set("");
    state$.backendEndpoints.set([]);
    state$.activeBackendEndpoint.set("");
    router.navigate("/");
  }

  return (
    <IconButton name="logout" action={signOut} type={TERTIARY} />
  );

}

