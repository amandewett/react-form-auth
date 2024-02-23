import { motion } from "framer-motion";

const FormActions = ({ children, isSubmitting }: any) => {
  return (
    <>
      <div className="flex justify-end mb-10 mt-2 w-10/12">
        <motion.button
          whileHover={{ y: -3 }}
          className="ml-8 w-24 h-10 rounded-md text-aBgColor bg-aTextColor p-2 font-medium text-center text-sm"
        >
          {!isSubmitting ? children : "Submitting..."}
        </motion.button>
      </div>
    </>
  );
};

export default FormActions;
