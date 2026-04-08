import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, Activity, Eye, Clock, Layers } from 'lucide-react';

interface ResultsSectionProps {
  result: any;
  isAnalyzing: boolean;
  imagePreview?: string | null;
}

export function ResultsSection({ result, isAnalyzing, imagePreview }: ResultsSectionProps) {
  if (isAnalyzing || !result) {
    return null;
  }

  const { verdict, confidence, isFake, details, filename } = result;

  return (
    <>
    <section className="relative py-24 px-6 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Verdict Card with Image Preview */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`
              relative rounded-3xl p-8 md:p-12 mb-12 overflow-hidden
              ${isFake 
                ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30' 
                : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30'
              }
            `}
          >
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                {/* Image Preview */}
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center justify-start flex-none"
                  >
                    <div className="relative h-[100px] w-[100px] min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] shrink-0 overflow-hidden rounded-2xl shadow-xl border-4 border-white/20 dark:border-gray-800/40 bg-white dark:bg-gray-900">
                      <img
                        src={imagePreview}
                        alt={`Preview of uploaded file ${filename}`}
                        className="block"
                        style={{
                          width: '200px',
                          height: '200px',
                          minWidth: '200px',
                          minHeight: '200px',
                          maxWidth: '200px',
                          maxHeight: '200px',
                          objectFit: 'cover',
                        }}
                      />
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs"
                    >
                      <span className="font-semibold">File:</span> {filename}
                    </motion.p>
                  </motion.div>
                )}

                {/* Verdict Content */}
                <div className={imagePreview ? 'lg:flex-1' : 'w-full'}>
                  <div className="text-center lg:text-left">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="inline-block mb-4"
                    >
                      {isFake ? (
                        <AlertTriangle className={`w-16 h-16 text-red-500`} />
                      ) : (
                        <CheckCircle className={`w-16 h-16 text-green-500`} />
                      )}
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`text-4xl md:text-5xl font-black mb-4 ${
                        isFake ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}
                    >
                      {verdict}
                    </motion.h3>
                    
                    {!imagePreview && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                      >
                        File: <span className="font-mono">{filename}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Confidence Ring */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
                    className={`relative mt-8 flex justify-center ${imagePreview ? 'lg:justify-start' : ''}`}
                  >
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-gray-800"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke={isFake ? 'rgb(234, 58, 78)' : 'rgb(34, 197, 94)'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: confidence / 100 }}
                        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                        strokeDasharray="440"
                        strokeDashoffset="0"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className={`text-3xl font-black ${
                            isFake ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                          }`}
                        >
                          {confidence.toFixed(1)}%
                        </motion.div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Confidence</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
          </motion.div>

          {/* Detailed Metrics - Only if available */}
          {details && (details.faceConsistency > 0 || details.temporalCoherence > 0 || details.artifactDetection > 0 || details.blinkRate > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-2xl font-bold mb-6 text-center">Detailed Analysis</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Face Consistency', value: details.faceConsistency, icon: Eye },
                  { label: 'Temporal Coherence', value: details.temporalCoherence, icon: Activity },
                  { label: 'Artifact Detection', value: details.artifactDetection, icon: Layers },
                  { label: 'Blink Rate Analysis', value: details.blinkRate, icon: Clock },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="relative rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <metric.icon className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="font-medium">{metric.label}</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {metric.value.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full ${
                          metric.value > 75 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : metric.value > 50
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gradient-to-r from-red-500 to-pink-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
    </>
  );
}
