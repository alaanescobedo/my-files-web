import { createContext, useContext, useEffect, useState } from "react";
import authService from '../services/auth.service'
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

// ============== Interfaces ==============
export interface FilePublic {
  id: string;
  publicName: string
  url: string;
}
interface Address {
  street: string;
  city: string;
  state: string;
}
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: FilePublic | null;
  address: Address | null;
}
type AuthContextProps = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  authenticate: () => Promise<void>;
  onSuccess: ({ redirectTo }: { redirectTo: string }) => void;
}

// ============== Context ==============
const AuthContext = createContext<AuthContextProps | null>(null);

// ============== Hooks ==============
export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used within an AuthProvider')
  const { user, ...authMethods } = auth
  return authMethods
}

export const useUser = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useUser must be used within an AuthProvider')
  const { user, authenticate } = auth

  const refresh = async () => {
    await authenticate()
  }

  return { user, refresh }
}

function useProvideAuth() {
  const router = useRouter()

  const userQuery = useQuery({
    queryKey: ['user_auth'], queryFn: async () => {
      if(router.pathname.includes('auth')) return null
      await authenticate()
      return null // useQuery requires a return value
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  const [user, setUser] = useState<User | null>(userQuery.data || null);// Data can be undefined
  const [loading, setLoading] = useState(router.pathname.includes('auth') ? false : true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Boolean>(false);


  // Public
  const login = async (username: string, password: string) => {
    try {
      handleStart()
      await handleLogin(username, password)
    } catch (error: any) {
      handleError(error)
    }
  }
  const logout = async () => {
    try {
      handleStart()
      await authService.logout()
      await authenticate()
      handleUser(null)
    } catch (error: any) {
      handleError(error)
    }
  }
  const register = async (username: string, email: string, password: string) => {
    try {
      handleStart()
      await authService.register({ username, email, password })
      await handleLogin(username, password)
    } catch (error: any) {
      handleError(error)
    }
  }
  const authenticate = async () => {
    try {
      handleStart()
      const user = await authService.authenticate()
      handleUser(user)
    } catch (error: any) {
      handleError(error)
    }
  }

  // Events Public
  const onSuccess = ({ redirectTo }: { redirectTo: string }) => useEffect(() => {
    if (success) {
      setSuccess(false)
      router.push(redirectTo)
    }
    return () => setSuccess(false)
  }, [success])

  // Private
  const handleUser = async (rawUser: User | null) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      setLoading(false);
      setUser(user);
    } else {
      setLoading(false);
      setUser(null);
      return false;
    }
  }
  const handleStart = () => {
    setError(null);
    setLoading(true);
    setSuccess(false)
  }
  const handleError = (error: Error) => {
    setError(error.message);
    setLoading(false);
    setUser(null);
  }
  const handleLogin = async (username: string, password: string) => {
    try {
      await authService.login({ username, password })
      const user = await authService.authenticate()
      handleUser(user)
      setSuccess(true)
    } catch (error: any) {
      handleError(error)
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    register,
    onSuccess,
    authenticate,
    error
  }
}

// ============== Provider ==============
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// ============== Utils ==============
function formatUser(user: User) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar || null,
    address: user.address || null
  } as User
}
