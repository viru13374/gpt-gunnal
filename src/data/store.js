import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {username, role}

  const login = (username, password) => {
    // Demo login logic
    if (username === "admin" && password === "admin") {
      setUser({ username, role: "admin" });
      return true;
    } else if (username === "teacher" && password === "teacher") {
      setUser({ username, role: "teacher" });
      return true;
    } else if (username === "student" && password === "student") {
      setUser({ username, role: "student" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);