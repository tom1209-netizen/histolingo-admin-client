import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getProfile } from "../../api/admin";

interface Data {
  nameInitial: string;
  permissions: number[];
}

interface DataContextType {
  data: Data | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        const data = {
          nameInitial:
            response.data.data.firstName[0] + response.data.data.lastName[0],
          permissions: response.data.data.roles,
        };
        setData(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
