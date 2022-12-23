import React from "react";
import Link from "next/link";
import useNavStore, { ROUTES } from "store/navBar";
import { trpc } from "utils/trpc";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { current } = useNavStore();
  const { status } = useSession();

  // const self = trpc.auth.getSelf.useQuery();

  // const username = self.data?.username;

  const userLink =
    status === "authenticated" ? ROUTES.ACCOUNT_SETUP : ROUTES.SIGN_IN;

  return (
    <div className="static top-0 h-navHeight w-full border-b border-gray-300">
      <nav className="container mx-auto flex h-full items-center">
        <NavLinks
          route={ROUTES.HOME}
          className="mr-auto"
          active={current === ROUTES.HOME}
        >
          Home
        </NavLinks>
        <NavLinks
          route={ROUTES.MEMBERS}
          className="mx-4 lg:mx-8"
          active={current === ROUTES.MEMBERS}
        >
          Members
        </NavLinks>
        <NavLinks
          route={ROUTES.PROJECTS}
          className="mx-4 lg:mx-8"
          active={current === ROUTES.PROJECTS}
        >
          Projects
        </NavLinks>
        <NavLinks
          route={userLink}
          className="ml-auto"
          active={
            current.startsWith(ROUTES.MEMBER) || current === ROUTES.SIGN_IN
          }
        >
          User
        </NavLinks>
      </nav>
    </div>
  );
};

const NavLinks = ({
  route,
  children,
  className,
  active,
}: {
  route: string;
  children: string;
  className?: string;
  active?: boolean;
}) => (
  <Link
    href={route}
    className={`border-y-4 border-transparent lg:text-xl  ${className} ${
      active && " border-b-primary"
    }`}
  >
    {children}
  </Link>
);

export default NavBar;
