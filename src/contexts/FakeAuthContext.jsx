import { createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

  return <AuthContext.Provider>
    {children}
  </AuthContext.Provider>

}

function useAuth() {
  const Auth = useContext(AuthContext);
  return Auth;
}

export { AuthProvider, useAuth };