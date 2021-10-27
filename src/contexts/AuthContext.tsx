import { createContext, useContext, useMemo, ReactNode, useState, useEffect } from 'react';
import { Storage } from 'storage/localStorage';

interface Auth {
  token: string;
  setToken: (token: string) => void;
  tokenExpires: Date;
  setTokenExpires: (date: Date) => void;
}

const Context = createContext<Auth | undefined>(undefined);

export function useAuth(): Auth {
  const value = useContext(Context);
  if (value === undefined) throw new Error('no value provided');
  return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setAuthToken] = useState<string>('');
  const [tokenExpires, setTokenExpires] = useState<Date>(new Date(2000, 1, 1));

  const setToken = (token: string) => {
    setAuthToken(token);
    Storage.set('token', token);
  };

  const value = useMemo(
    () => ({
      token,
      setToken,
      tokenExpires,
      setTokenExpires,
    }),
    [token, setToken, tokenExpires, setTokenExpires]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
