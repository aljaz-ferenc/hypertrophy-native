import { useMutation, useQuery } from "react-query";
import Endpoints from "@/api/endpoints";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useUserStore from "@/store/user.store";
import { useShallow } from "zustand/react/shallow";

type LoginData = {
  username: string;
  password: string;
};

const fetchLogin = async (loginData: LoginData) => {
  const res = await fetch(Endpoints.login, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const useLogin = () => {
  const { setItem, getItem } = useAsyncStorage("hypertrophy-userId");
  const [setUser] = useUserStore(useShallow((state) => [state.setUser]));

  return useMutation({
    mutationKey: ["login"],
    mutationFn: fetchLogin,
    onSuccess: (res) => {
      if (res.error) {
        return console.log(res.error);
      }
      setItem(res.user._id, (error) => {
        if (error) {
          return console.log("error saving userId to AsyncStorage: ", error);
        }
        console.log("User saved to async storage");
        setUser(res.user);
      });
    },
  });
};
