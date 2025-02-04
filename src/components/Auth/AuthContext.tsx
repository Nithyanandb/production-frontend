import React, { createContext, useState, useCallback, useEffect, startTransition } from 'react';

interface UserProfile {
  email: string;
  name: string;
  provider?: string;
  roles?: string[];
}

interface AuthData {
  token: string;
  user: UserProfile;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => Promise<void>;
  error: string | null;
  handleOAuthCallback: (authData: AuthData) => void;
  setIsAuthenticating: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        return user;
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        return token;
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
      }
    }
    return null;
  });

  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleOAuthPopup = (url: string) => {
    startTransition(() => {
      setIsAuthenticating(true);
    });

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(url, 'OAuth2', `width=${width},height=${height},left=${left},top=${top}`);

    if (popup) {
      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          startTransition(() => {
            setIsAuthenticating(false);
          });
        }
      }, 1000);

      const handleMessage = (event: MessageEvent) => {
        if (event.origin === window.location.origin) {
          if (event.data.type === 'AUTH_SUCCESS') {
            const { token, user } = event.data.data;
            startTransition(() => {
              setUser(user);
              setToken(token);
              localStorage.setItem('auth', JSON.stringify({ token, user }));
              setIsAuthenticating(false);
            });
            popup.close();
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
        clearInterval(checkPopup);
      };
    }
  };

  const handleOAuthCallback = useCallback((authData: AuthData) => {
    const { token, user } = authData;
    startTransition(() => {
      setUser(user);
      setToken(token);
      localStorage.setItem('auth', JSON.stringify({ token, user }));
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('https://production-backend-final.onrender.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      startTransition(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth');
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAuthenticating,
        setUser,
        setToken,
        loginWithGoogle: () => handleOAuthPopup('https://production-backend-final.onrender.com/oauth2/authorization/google'),
        loginWithGithub: () => handleOAuthPopup('https://production-backend-final.onrender.com/oauth2/authorization/github'),
        logout,
        error,
        handleOAuthCallback,
        setIsAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;