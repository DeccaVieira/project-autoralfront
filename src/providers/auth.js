import react from "react";
import { useState } from "react";

export const AuthContext = react.createContext({});

export const AuthProvider = (props) => {
  const [userRegistration, setUserRegistration] = useState({
    cpf: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    isdoctor: false,
  });
  const [name, setName] = useState(localStorage.getItem("name"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [isdoctor, setIsdoctor] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isdoctor,
        setIsdoctor,
        userId,
        setUserId,
        name,
        setName,
        userLogin,
        setUserLogin,
        userRegistration,
        setUserRegistration,
        token,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
