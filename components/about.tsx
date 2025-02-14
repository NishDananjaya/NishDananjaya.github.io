import { motion } from "framer-motion"

export function About() {
  return (
    <section className="py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        {/* Add biography and timeline here */}
      </motion.div>
    </section>
  )
}

