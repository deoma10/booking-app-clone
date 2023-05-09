import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {data} from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token');
      axios.get("/api/profile", {headers: {Authorization:`${token}`}}).then(({ data }) => {
        setUser(data);
        debugger
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  );
}
