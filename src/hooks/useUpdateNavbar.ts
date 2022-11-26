import { useEffect } from "react";
import { ROUTES } from "store/navBar";
import useNavStore from "store/navBar";

const useUpdateNavbar = (newState: ROUTES) => {
  const { setNavbar } = useNavStore();

  useEffect(() => {
    setNavbar(newState);

    return () => {
      setNavbar(ROUTES.UNSET);
    };
  }, [newState, setNavbar]);
};

export default useUpdateNavbar;
