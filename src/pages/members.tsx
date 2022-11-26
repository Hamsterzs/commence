import useUpdateNavbar from "hooks/useUpdateNavbar";
import React from "react";
import { ROUTES } from "store/navBar";

const Members = () => {
  useUpdateNavbar(ROUTES.MEMBERS);
  return (
    <div className="container mx-auto flex h-availableHeight items-center justify-center">
      <h1>Members</h1>
    </div>
  );
};

export default Members;
