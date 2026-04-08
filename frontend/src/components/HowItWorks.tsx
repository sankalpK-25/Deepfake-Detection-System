import { motion } from 'motion/react';
import { Network, Scan, Brain, BarChart3 } from 'lucide-react';

const steps = [

  {
    icon: Brain,
    title: 'Deep CNN Analysis',
    description: 'Convolutional neural network identifies facial manipulation patterns',
    color: 'purple'
  },
  {
    icon: Network,
    title: 'Feature Detection',
    description: 'Multi-layer analysis detects artifacts, inconsistencies, and anomalies',
    color: 'pink'
  },
  {
    icon: BarChart3,
    title: 'Confidence Scoring',
    description: 'Generate comprehensive verdict with detailed confidence metrics',
    color: 'cyan'
  }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'text-blue-500'
  },
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    border: 'border-purple-500/30',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'text-purple-500'
  },
  pink: {
    bg: 'bg-pink-500/10 dark:bg-pink-500/20',
    border: 'border-pink-500/30',
    text: 'text-pink-600 dark:text-pink-400',
    icon: 'text-pink-500'
  },
  cyan: {
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    border: 'border-cyan-500/30',
    text: 'text-cyan-600 dark:text-cyan-400',
    icon: 'text-cyan-500'
  }
};

export function HowItWorks() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Advanced deep learning pipeline for real-time deepfake detection
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection lines */}


          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 relative justify-center">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`
                      relative rounded-2xl p-6 border-2 ${colors.border} ${colors.bg}
                      backdrop-blur-sm hover:shadow-2xl transition-shadow
                    `}
                  >
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>

                    <div className="mb-4">
                      <div className={`inline-flex p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                        <step.icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${colors.text}`}>
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>

                    {/* Animated corner accent */}
                    <motion.div
                      className={`absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 ${colors.border} rounded-br-lg`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Neural network visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 border border-gray-300 dark:border-gray-700"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Deep Learning Architecture</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Multi-layer CNN with attention mechanisms and temporal analysis
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {['Input Upload', 'Xception CNN', ' Dense Layers', 'Sigmoid Output', 'Threshold', 'Output'].map((layer, index) => (
              <motion.div
                key={layer}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="relative"
              >
                <div className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 font-mono text-sm">
                  {layer}
                </div>
                {index < 5 && (
                  <motion.div
                    className="absolute top-1/2 -right-3 w-2 h-2 bg-blue-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
