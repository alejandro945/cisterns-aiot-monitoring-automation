import React, { useState, useEffect } from "react";
import { User } from "@/domain/model/User";
import axios from "axios";
import DataTable from "@/presentation/components/common/data-table";

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/users/getUsers");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <DataTable
        data={users}
        order={"provider"}
        search={"email"}
        noView={["_id", "password", "__v"]}
        onDelete={false}
      />
    </div>
  );
};

export default DashboardUsers;
