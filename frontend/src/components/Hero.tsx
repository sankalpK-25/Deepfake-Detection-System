import { motion } from 'motion/react';
import { Scan, Shield, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent dark:via-blue-500/10 pointer-events-none" />
      
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent h-32"
        animate={{
          y: ['-10%', '110%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <div className="relative z-10 text-center max-w-5xl">
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Scan className="w-12 h-12 text-blue-500/30" />
          </motion.div>
          
          <motion.div
            className="absolute top-20 right-1/4"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            <Shield className="w-16 h-16 text-purple-500/30" />
          </motion.div>

          <motion.div
            className="absolute bottom-20 left-1/3"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
          >
            <Zap className="w-10 h-10 text-cyan-500/30" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI-Powered Detection</span>
          </motion.div>

          {/* Main headline */}
          <h1 className="mb-6">
            <motion.span
              className="block text-6xl md:text-8xl font-black mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Detect Reality
            </motion.span>
            <motion.span
              className="block text-5xl md:text-7xl font-black text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              from Deception
            </motion.span>
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Advanced deep learning system to identify manipulated media with unprecedented accuracy
          </motion.p>

          {/* Animated scroll indicator */}
          <motion.div
            className="inline-flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-500"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll to analyze</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Neural network visualization */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <motion.circle
            cx="500"
            cy="500"
            r="200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="500"
            cy="500"
            r="300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      </div>
    </section>
  );
}
