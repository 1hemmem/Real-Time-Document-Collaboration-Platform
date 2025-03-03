import { motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

export function BarLoader() {
  return (
    <div className="grid place-content-center bg-white px-4 py-80">
      <motion.div
        transition={{
          staggerChildren: 0.25,
        }}
        initial="initial"
        animate="animate"
        className="flex gap-1"
      >
        <motion.div variants={variants} className="h-12 w-2 bg-gray-500" />
        <motion.div variants={variants} className="h-12 w-2 bg-gray-500" />
        <motion.div variants={variants} className="h-12 w-2 bg-gray-500" />
        <motion.div variants={variants} className="h-12 w-2 bg-gray-500" />
        <motion.div variants={variants} className="h-12 w-2 bg-gray-500" />
      </motion.div>
    </div>
  );
}
