import { motion } from 'motion/react';
import { Cpu, Zap, Database, Code } from 'lucide-react';

const technologies = [
  {
    category: 'Deep Learning',
    icon: Cpu,
    items: ['CNN', 'LSTM']
  },
  {
    category: 'Computer Vision',
    icon: Zap,
    items: ['OpenCV']
  },
  {
    category: 'Architecture',
    icon: Code,
    items: ['XceptionNet']
  },
  {
    category: 'Processing',
    icon: Database,
    items: ['NumPy']
  }
];

export function TechStack() {
  return (
    <section className="relative py-24 px-6 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Technology Stack
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Built with cutting-edge AI and computer vision frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group"
            >
              <div className="relative rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-colors overflow-hidden">
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />

                <div className="relative z-10">
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                      <tech.icon className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {tech.category}
                  </h3>

                  <div className="space-y-2">
                    {tech.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        <span className="text-gray-700 dark:text-gray-300 font-mono">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Animated corner accents */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-500/20 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink-500/20 rounded-bl-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Paper Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/30"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Research Foundation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Based on state-of-the-art deepfake detection methodologies
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Face X-Ray', 'MesoNet', 'XceptionNet', 'EfficientNet-B4'].map((paper, index) => (
                <motion.span
                  key={paper}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm font-mono"
                >
                  {paper}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
