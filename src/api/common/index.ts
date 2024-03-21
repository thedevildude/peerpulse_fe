import { API_ENDPOINT } from "@/config/constants";
import axios from "axios";
import routes from "../routes";
import { UserModel } from "@/components/users/models";
import { Dispatch, SetStateAction } from "react";

export const checkAccessTokenValidity = async (
  accessToken: string,
  setUser?: Dispatch<SetStateAction<UserModel | null>>,
): Promise<boolean> => {
  try {
    const res = await axios.get(API_ENDPOINT + routes.currentUser.path, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (setUser && res.status === 200) setUser(res.data);
    return true;
  } catch (error) {
    return false;
  }
};
