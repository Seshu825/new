// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading flag

  const isLoggedIn = !!token && !!user;
  const login = (jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    localStorage.setItem("jwt", jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
  };

  // ✅ Rehydrate user on app refresh
  useEffect(() => {
    const fetch = async()=>{
 const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      await axios
        .get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to re-authenticate:", err);
          logout();
        })
        .finally(() => {
          setLoading(false); // ✅ done loading
        });
    } else {
      setLoading(false);
    }
    }
   fetch();
  }, [token]);
  // changed above line, added token as an dependent array because component is not rerendering on success login.

  // Cross-tab token sync
  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("jwt"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Optional: logout on tab close
  // You can disable this if you want users to stay logged in
  // useEffect(() => {
  //   const handleTabClose = () => {
  //     logout();
  //   };
  //   window.addEventListener("beforeunload", handleTabClose);
  //   return () => window.removeEventListener("beforeunload", handleTabClose);
  // }, []);

  // ✅ Block app rendering until auth finishes loading
  // if (loading) return <div>Loading authentication...</div>;

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
