import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [customer, setCustomerState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setCustomer = (nextCustomer) => {
    setCustomerState(nextCustomer);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.get("/customers/me");
        setCustomer(response.data.customer);
      } catch (requestError) {
        setError(requestError);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <AuthContext.Provider value={{ customer, setCustomer, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}