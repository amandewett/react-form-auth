import { aComponent } from "../../utils/cTypes";
import { motion } from "framer-motion";
import { useRouteLoaderData } from "react-router-dom";

const Welcome: aComponent = () => {
  const currentUser: any = useRouteLoaderData("root");

  return (
    <div className="flex justify-center items-center mt-5 text-9xl font-bold">
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 50, opacity: 1 }}
        transition={{ delay: 0, type: "tween" }}
      >
        {currentUser !== null ? `Welcome\n ${currentUser.fName}` : `Welcome`}
      </motion.h1>
    </div>
  );
};
// gamyhucyp@mailinator.com

export default Welcome;
