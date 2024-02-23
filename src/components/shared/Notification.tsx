import { useContext } from "react";
import { aComponent } from "../../utils/cTypes";
import { AuthContext } from "../../store/auth.context";
import { motion } from "framer-motion";

const NotificationComponent: aComponent = () => {
  const { notification } = useContext(AuthContext);
  return (
    <>
      {!notification.status && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="bg-rose-500 h-12 flex justify-center items-center text-white font-medium z-50"
        >
          {notification.message}
        </motion.div>
      )}
    </>
  );
};

export default NotificationComponent;
