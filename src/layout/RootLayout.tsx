import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { aComponent } from "../utils/cTypes";
import NotificationComponent from "../components/shared/Notification";
import { AnimatePresence } from "framer-motion";

const RootLayout: aComponent = () => {
  return (
    <>
      <Header />
      <AnimatePresence>
        <main>
          <NotificationComponent />
          <Outlet />
        </main>
      </AnimatePresence>
    </>
  );
};

export default RootLayout;
