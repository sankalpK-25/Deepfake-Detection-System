import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, File, Video, Image as ImageIcon, Loader2 } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function UploadSection({ onFileUpload, isAnalyzing }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Upload & Analyze
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Drop your media file to detect deepfake manipulation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative rounded-2xl border-2 border-dashed transition-all duration-300
              ${isDragging 
                ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
                : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
              }
              ${isAnalyzing ? 'pointer-events-none' : 'cursor-pointer hover:border-blue-400 hover:bg-blue-500/5'}
            `}
          >
            {/* Animated border effect */}
            <AnimatePresence>
              {(isDragging || isAnalyzing) && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-blue-500"
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <label className="block p-12 md:p-20 cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isAnalyzing}
              />

              <div className="text-center">
                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="space-y-6"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 className="w-16 h-16 mx-auto text-blue-500" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Analyzing Media...</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Deep neural network processing in progress
                        </p>
                      </div>
                      
                      {/* Progress indicator */}
                      <div className="max-w-xs mx-auto">
                        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: 'easeInOut' }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : selectedFile ? (
                    <motion.div
                      key="selected"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/30">
                        {selectedFile.type.startsWith('video/') ? (
                          <Video className="w-10 h-10 text-green-500" />
                        ) : (
                          <ImageIcon className="w-10 h-10 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{selectedFile.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Upload another file to analyze again
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="space-y-6"
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="inline-block"
                      >
                        <div className="relative">
                          <Upload className="w-16 h-16 mx-auto text-blue-500" />
                          <motion.div
                            className="absolute inset-0 rounded-full bg-blue-500/20"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>

                      <div>
                        <h3 className="text-2xl font-bold mb-2">Drop your file here</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          or click to browse
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                          <div className="flex items-center gap-1">
                            <ImageIcon className="w-4 h-4" />
                            <span>Images</span>
                          </div>
                          <div className="flex items-center gap-1">
                            
                            
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </label>
          </div>

          {/* Corner accents */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500/50 rounded-tr-lg" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 rounded-bl-lg" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg" />
        </motion.div>
      </div>
    </section>
  );
}
