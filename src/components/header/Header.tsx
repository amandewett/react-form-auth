import { NavLink, useLocation, useRouteLoaderData } from "react-router-dom";
import { aComponent } from "../../utils/cTypes";
import { useContext } from "react";
import { AuthContext } from "../../store/auth.context";

const Header: aComponent = () => {
  const { pathname } = useLocation();
  const currentUser = useRouteLoaderData("root");
  const { logout } = useContext(AuthContext);

  return (
    <header className="w-screen h-20 sticky top-0 right-0 left-0 flex justify-between items-center px-8 bg-aTextColor text-aBgColor z-10">
      <NavLink to="/home" className="">
        <h1 className="font-extrabold text-2xl">ReactTS + Form + Auth</h1>
      </NavLink>
      <nav>
        <ul className="flex items-center">
          {currentUser !== null && (
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `ml-5 font-medium ${
                    isActive ? "underline underline-offset-4 decoration-2" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
          )}
          {currentUser === null && (
            <>
              <li>
                <NavLink to="/">
                  <button
                    className={
                      pathname === "/login"
                        ? `ml-8 w-24 h-10 rounded-md bg-aBgColor text-aTextColor p-2 font-medium text-center border-b-[2px] border-r-[2px] border-l-[2px] underline underline-offset-2 decoration-2`
                        : `ml-8 w-24 h-10 rounded-md bg-aBgColor text-aTextColor p-2 font-medium text-center`
                    }
                  >
                    Login
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/signUp">
                  <button
                    className={
                      pathname === "/signUp"
                        ? `ml-8 w-24  h-10 rounded-md bg-aBgColor text-aTextColor p-2 font-medium text-center border-b-[2px] border-r-[2px] border-l-[2px] underline underline-offset-2 decoration-2`
                        : `ml-8 w-24  h-10 rounded-md bg-aBgColor text-aTextColor p-2 font-medium text-center`
                    }
                  >
                    SignUp
                  </button>
                </NavLink>
              </li>
            </>
          )}
          {currentUser !== null && (
            <li onClick={() => logout()}>
              <NavLink to="/">
                <button
                  className={
                    pathname === "/login"
                      ? `ml-8 w-24  h-10 rounded-md bg-aBgColor text-aTextColor p-2 font-medium text-center border-b-[2px] border-r-[2px] border-l-[2px] underline underline-offset-2 decoration-2`
                      : `ml-8 w-24  h-10 rounded-md bg-aBgColor text-aTextColor p-2 font-medium text-center`
                  }
                >
                  Logout
                </button>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
