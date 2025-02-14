import { motion } from "framer-motion"

export function Blog() {
  return (
    <section className="py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold mb-8">Blog</h2>
        {/* Add blog post list or grid here */}
      </motion.div>
    </section>
  )
}

