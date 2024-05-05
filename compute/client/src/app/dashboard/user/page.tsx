"use client";

import React from "react";
import { Title } from "@/presentation/components/common/title";
import DashboardUsers from "@/presentation/containers/users/DashboardUsers";

const UserPage = () => {
  return (
    <div className="px-24 mt-5">
      <Title
        mainTitle="Usuarios"
        description="A continuación veras todos los usuarios"
      />
      <DashboardUsers />
    </div>
  );
};

export default UserPage;
