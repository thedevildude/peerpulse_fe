import routes from "@/api/routes";
import { UserModel } from "@/components/users/models";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type AuthProviderState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: UserModel | null;
};

const initialState: AuthProviderState = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  user: null,
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);

export const useAuthProvider = () => useContext(AuthProviderContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessTokenValidity = async (
      accessToken: string,
    ): Promise<boolean> => {
      try {
        await axios.get(API_ENDPOINT + routes.currentUser.path, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    };

    const fetchData = async () => {
      const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
      const refreshToken = localStorage.getItem(LocalStorageKeys.refreshToken);
      if (accessToken) {
        const isValid = await checkAccessTokenValidity(accessToken);
        if (isValid) {
          setIsAuthenticated(true);
        } else if (refreshToken) {
          // Access token expired, try refreshing it using the refresh token
          refreshAccessToken(refreshToken);
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

    // Check access token validity every 5 minutes
    const intervalId = setInterval(
      async () => {
        const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
        if (accessToken) {
          const isValid = await checkAccessTokenValidity(accessToken);
          if (!isValid) {
            // Access token expired, try refreshing it using the refresh token
            const refreshToken = localStorage.getItem(
              LocalStorageKeys.refreshToken,
            );
            if (refreshToken) {
              refreshAccessToken(refreshToken);
            } else {
              // No refresh token available, navigate to the sign-in page
              navigate("/sign-in");
            }
          }
        }
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const res = await axios.post(API_ENDPOINT + routes.tokenRefresh.path, {
        refreshToken,
      });
      localStorage.setItem(
        LocalStorageKeys.accessToken,
        res.data.tokens.access,
      );
      localStorage.setItem(
        LocalStorageKeys.refreshToken,
        res.data.tokens.refresh,
      );

      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      navigate("/sign-in");
    }
  };

  return (
    <AuthProviderContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};
