import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getProfile } from "../../api/admin";

interface Data {
  nameInitial: string;
  permissions: number[];
}

interface DataContextType {
  profileData: Data | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        console.log(response, "response");
        const permissions = response.data.data.roles.flatMap(role => role.permissions)
        console.log(permissions, "permissions")
        const data = {
          nameInitial:
            response.data.data.firstName[0] + response.data.data.lastName[0],
          permissions: permissions
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
    <DataContext.Provider value={{ profileData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
