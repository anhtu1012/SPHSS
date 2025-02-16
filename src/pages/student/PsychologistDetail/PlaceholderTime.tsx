import { motion } from "framer-motion";

const PlaceholderTime = () => {
  return (
    <motion.div
      className="doctor__detail__section1__schedule__option__placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      09:00-10:30
    </motion.div>
  );
};

export default PlaceholderTime;
