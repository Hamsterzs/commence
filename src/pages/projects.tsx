import useUpdateNavbar from "hooks/useUpdateNavbar";
import React from "react";
import { ROUTES } from "store/navBar";

const Projects = () => {
  useUpdateNavbar(ROUTES.PROJECTS);
  return (
    <div className="container mx-auto flex h-availableHeight items-center justify-center">
      <h1>Projects</h1>
    </div>
  );
};

export default Projects;
