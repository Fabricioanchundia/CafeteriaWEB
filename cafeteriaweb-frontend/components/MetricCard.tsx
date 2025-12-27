"use client";

import { motion } from "framer-motion";

export default function MetricCard({
  title,
  value,
  color = "#7b3f1d",
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md rounded-2xl p-6 border border-orange-100"
    >
      <h3 className="text-xl font-semibold" style={{ color }}>
        {title}
      </h3>
      <p className="text-4xl font-bold mt-2 text-neutral-900">{value}</p>
    </motion.div>
  );
}
