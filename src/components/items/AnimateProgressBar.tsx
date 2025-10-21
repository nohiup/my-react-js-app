import { useMotionValue, animate, motion } from "framer-motion";
import { useEffect } from "react";

export const AnimateProgressBar = ({ progress }: { progress: number }) => {
  const progressValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progressValue, progress, { duration: 0.6, ease: "easeOut" });
    return controls.stop;
  }, [progress]);

  return (
    <div className="w-full app-background rounded-full h-2">
      <motion.div
        className="h-2 background-primary rounded"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>

  );
};