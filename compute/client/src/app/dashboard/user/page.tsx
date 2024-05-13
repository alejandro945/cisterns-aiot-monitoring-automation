"use client";

import React from "react";
import { Title } from "@/presentation/components/common/title";
import DashboardUsers from "@/presentation/containers/users/DashboardUsers";
import { USER_PAGE } from "@/presentation/constants/users.constants";

const UserPage = () => {
  return (
    <div className="px-24 mt-5">
      <Title mainTitle={USER_PAGE.title} description={USER_PAGE.description} />
      <DashboardUsers />
    </div>
  );
};

export default UserPage;
