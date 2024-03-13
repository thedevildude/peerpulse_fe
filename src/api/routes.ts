/**
 * A fake function that returns an empty object casted to type T
 * @returns Empty object as type T
 */
export function Type<T>(): T {
  return {} as T;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JwtTokenObtainPair {
  access: string;
  refresh: string;
}

const routes = {
  // Auth Endpoints
  login: {
    path: "/api/v1/auth/login",
    method: "POST",
    noAuth: true,
    TRes: Type<JwtTokenObtainPair>(),
    TBody: Type<LoginCredentials>(),
  },
  token_refresh: {
    path: "/api/v1/auth/refresh-tokens",
    method: "POST",
    TRes: Type<JwtTokenObtainPair>(),
    TBody: Type<{ refresh: JwtTokenObtainPair["refresh"] }>(),
  },
  currentUser: {
    path: "/api/v1/auth/current-user",
    method: "GET",
    TRes: Type<{ id: number; email: string }>(),
  },
};

export default routes;
