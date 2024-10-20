import { ReactNode, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { verifyJWTToken } from "../api/axios";

type AuthStateType = {
  isAuthenticated: boolean;
  token: string | null;
};

type AuthContextType = {
  state: AuthStateType;
  userLogin: (token: string) => void;
  userLogout: () => void;
};

type AuthContextProviderPropsType = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = (props: AuthContextProviderPropsType) => {
  const { children } = props;


  const [state, setState] = useState<AuthStateType>({
    isAuthenticated: !!Cookies.get("token"), 
    token: Cookies.get("token") || null,
  });


  const userLogin = (token: string) => {
    Cookies.set("token", token, { expires: 7 }); 
    setState({
      isAuthenticated: true,
      token: token,
    });
  };


  const userLogout = () => {
    Cookies.remove("token");
    setState({
      isAuthenticated: false,
      token: null,
    });
  };

  const verifyToken = async (token: string | null) => {
    if (token) {
      
      const isValid = await verifyJWTToken(token);
      console.log(isValid)
      if (!isValid) {
        userLogout(); 
      }
    }
  };

  useEffect(() => {
    verifyToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

