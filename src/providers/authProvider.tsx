import { checkAccessTokenValidity } from "@/api/common";
import routes from "@/api/routes";
import { UserModel } from "@/components/users/models";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type AuthProviderState = {
  user: UserModel | null;
};

const initialState: AuthProviderState = {
  user: null,
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);

export const useAuthProvider = () => useContext(AuthProviderContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
      const refreshToken = localStorage.getItem(LocalStorageKeys.refreshToken);
      if (accessToken) {
        const isValid = await checkAccessTokenValidity(accessToken, setUser);
        if (isValid) {
          return;
        } else if (refreshToken) {
          // Access token expired, try refreshing it using the refresh token
          await refreshBothTokens(refreshToken);
          await checkAccessTokenValidity(
            localStorage.getItem(LocalStorageKeys.accessToken) as string,
            setUser,
          );
        } else {
          // No refresh token available, navigate to the sign-in page
          navigate("/sign-in");
        }
      } else {
        // No access token available, navigate to the sign-in page
        navigate("/sign-in");
      }
    };

    fetchData();

    // Check access token validity every 1 minute
    const intervalId = setInterval(
      async () => {
        const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
        if (accessToken) {
          const isValid = await checkAccessTokenValidity(accessToken, setUser);
          if (!isValid) {
            // Access token expired, try refreshing it using the refresh token
            const refreshToken = localStorage.getItem(
              LocalStorageKeys.refreshToken,
            );
            if (refreshToken) {
              await refreshBothTokens(refreshToken);
              await checkAccessTokenValidity(
                localStorage.getItem(LocalStorageKeys.accessToken) as string,
                setUser,
              );
            } else {
              // No refresh token available, navigate to the sign-in page
              navigate("/sign-in");
            }
          }
        }
      },
      1 * 60 * 1000,
    ); // 1 minutes

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshBothTokens = async (refreshToken: string) => {
    try {
      const res = await axios.post(API_ENDPOINT + routes.tokenRefresh.path, {
        refreshToken,
      });
      localStorage.setItem(LocalStorageKeys.accessToken, res.data.access.token);
      localStorage.setItem(
        LocalStorageKeys.refreshToken,
        res.data.refresh.token,
      );

      setUser(res.data);
    } catch (error) {
      navigate("/sign-in");
    }
  };

  return (
    <AuthProviderContext.Provider value={{ user }}>
      {children}
    </AuthProviderContext.Provider>
  );
};
