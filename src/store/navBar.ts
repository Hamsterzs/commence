import create from "zustand";

export enum ROUTES {
  HOME = "/",
  MEMBERS = "/members",
  PROJECTS = "/projects",
  UNSET = "/",
  EDIT_USER = "/edit-user",
}

type NavSliceT = {
  current: ROUTES;
  setNavbar: (x: ROUTES) => void;
};

const useNavStore = create<NavSliceT>((set) => ({
  current: ROUTES.UNSET,
  setNavbar: (newNavState) => set(() => ({ current: newNavState })),
}));

export default useNavStore;
