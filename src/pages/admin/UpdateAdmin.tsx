import React, { useEffect } from "react";

import AdminForm from "./AdminForm";
import { useParams } from "react-router-dom";
import { getIndividualAdmin } from "../../api/admin";

const UpdateAdmin = () => {
  const { adminId } = useParams<{ adminId?: string }>();
  const [admin, setAdmin] = React.useState<any>();
  useEffect(() => {
    if (adminId) {
      const fetchAdmin = async () => {
        try {
          const response = await getIndividualAdmin(adminId);
          const data = response.data.data;
          console.log(data);
          setAdmin(data);
        } catch (error) {
          console.error("Failed to get individual admin:", error);
        }
      };
      fetchAdmin();
    }
  }, [adminId]);

  const adminData = {
    email: admin?.email || "",
    firstName: admin?.firstName || "",
    lastName: admin?.lastName || "",
    adminName: admin?.adminName || "",
    roles: admin?.roles || [],
    status: admin?.status ,
    id: adminId || "", 
  };
  return <AdminForm typeOfForm="update" adminData={adminData}/>;
};

export default UpdateAdmin;
