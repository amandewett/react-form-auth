import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { authLoader, getCurrentUser } from "./store/auth.context";
import { aComponent } from "./utils/cTypes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Error element</div>,
    id: "root",
    loader: getCurrentUser,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "signUp",
        element: <SignUpPage />,
      },
      {
        path: "home",
        element: <HomePage />,
        loader: authLoader,
      },
    ],
  },
]);

const App: aComponent = () => {
  return (
    <>
      <RouterProvider router={routerConfig} />
    </>
  );
};

export default App;
