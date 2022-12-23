import useUpdateNavbar from "hooks/useUpdateNavbar";
import React from "react";
import { ROUTES } from "store/navBar";

const SignIn = () => {
  useUpdateNavbar(ROUTES.SIGN_IN);
  return <div>SignIn</div>;
};

export default SignIn;
