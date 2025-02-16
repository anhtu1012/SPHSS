import { motion } from "framer-motion";

const Time = ({
  startTime,
  endTime,
  isSelected,
  onClick,
}: {
  startTime: string;
  endTime: string;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      className={`doctor__detail__section1__schedule__option ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {startTime}-{endTime}
    </motion.div>
  );
};

export default Time;
