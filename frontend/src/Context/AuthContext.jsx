import { createContext, useContext, useState } from "react";

export const Authcontext = createContext();

export const useAuthcontext = () => {
    return useContext(Authcontext)
}

export const AuthcontextProvider = ({ children }) => {
    const [authUser, setauthUser] = useState(JSON.parse(localStorage.getItem('Task-manager')) || null);
    return <Authcontext.Provider value={{ authUser, setauthUser }}>{children}</Authcontext.Provider>
}