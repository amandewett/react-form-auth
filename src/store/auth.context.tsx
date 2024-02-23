import { createContext, useState } from "react";
import { aComponent } from "../utils/cTypes";
import { redirect } from "react-router-dom";

export const getCurrentUser: any = () => {
  if (localStorage.getItem(`cUser`) !== null) {
    const userDetails = JSON.parse(localStorage.getItem(`cUser`)!);
    const data = Object.values(userDetails)[0];
    return data;
  }
  return null;
};

export const authLoader: any = () => {
  if (localStorage.getItem(`cUser`) === null) {
    return redirect("/");
  }
  return null;
};

export const AuthContext = createContext<any>({
  isLoggedIn: false,
  userDetails: () => {},
  signUp: () => {},
  login: () => {},
  notification: {
    status: true,
    message: ``,
  },
  logout: () => {},
});

const AuthContextProvider: aComponent = ({ children }) => {
  const [notification, setNotification] = useState({
    status: true,
    message: ``,
  });

  const signUp: any = (
    fName: string,
    lName: string,
    email: string,
    password: string,
    gender: string,
    country: string,
    photo: string
  ) => {
    // get users from local storage
    const oldUsers = localStorage.getItem("users");

    if (oldUsers === null) {
      //create new user
      localStorage.setItem(
        "users",
        JSON.stringify({
          [email]: {
            password: password,
            fName: fName,
            lName: lName,
            gender: gender,
            country: country,
            photo: photo,
          },
        })
      );
      return {
        status: true,
        message: `User create successfully`,
      };
    } else {
      //check if user exists already
      const isUserExists = JSON.parse(oldUsers)[email];
      if (isUserExists) {
        setNotification({
          status: false,
          message: `User already exists`,
        });
        setTimeout(() => setNotification({ status: true, message: `` }), 3000);
        return {
          status: false,
          message: `User already exists`,
        };
      } else {
        const old = JSON.parse(oldUsers);
        let newUser = {
          ...old,
          [email]: {
            password: password,
            fName: fName,
            lName: lName,
            gender: gender,
            country: country,
            photo: photo,
          },
        };
        localStorage.setItem("users", JSON.stringify(newUser));
        return {
          status: true,
          message: `User create successfully`,
        };
      }
    }
  };

  const login: any = (email: string, password: string) => {
    // get users from local storage
    const oldUsers = localStorage.getItem("users");

    if (oldUsers === null) {
      const result = {
        status: false,
        message: `User doesn't exists`,
      };

      setNotification(result);
      setTimeout(() => setNotification({ status: true, message: `` }), 3000);
      return result;
    } else {
      //check if user exists already
      const isUserExists = JSON.parse(oldUsers)[email];
      if (!isUserExists) {
        const result = {
          status: false,
          message: `User doesn't exists`,
        };

        setNotification(result);
        setTimeout(() => setNotification({ status: true, message: `` }), 3000);
        return result;
      } else {
        const accountPassword = isUserExists.password;
        if (accountPassword === password) {
          //login user
          localStorage.setItem(
            "cUser",
            JSON.stringify({ [email]: { email: email, ...isUserExists } })
          );
          const result = {
            status: true,
            message: `Login successfully`,
          };
          return result;
        } else {
          const result = {
            status: false,
            message: `Invalid credentials`,
          };

          setNotification(result);
          setTimeout(
            () => setNotification({ status: true, message: `` }),
            3000
          );
          return result;
        }
      }
    }
  };

  const isUserLoggedIn: boolean = localStorage.getItem("cUser") !== null;
  const getUserDetails = () => {
    if (isUserLoggedIn) {
      const userDetails = JSON.parse(localStorage.getItem(`cUser`)!);
      const data = Object.values(userDetails)[0];
      return data;
    }
  };

  const logout = () => {
    localStorage.removeItem("cUser");
    redirect("/");
  };

  const defaultContextValue = {
    isLoggedIn: isUserLoggedIn,
    userDetails: getUserDetails,
    signUp: signUp,
    login,
    notification,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={defaultContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
