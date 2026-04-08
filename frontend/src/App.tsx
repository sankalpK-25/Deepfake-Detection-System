import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { ResultsSection } from './components/ResultsSection';
import { HowItWorks } from './components/HowItWorks';
import { TechStack } from './components/TechStack';
import { ParticleField } from './components/ParticleField';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      
      setAnalysisResult({
        verdict: data.verdict,
        confidence: Number(data.confidence),
        isFake: data.isFake,
        prediction: data.prediction,
        details: {
          faceConsistency: 0,
          temporalCoherence: 0,
          artifactDetection: 0,
          blinkRate: 0,
        },
        filename: data.filename
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during analysis';
      setError(errorMessage);
      console.error('Prediction error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-500 relative overflow-hidden">
        <ParticleField isDarkMode={isDarkMode} />
        
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:scale-110 transition-all duration-300 shadow-lg"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-blue-600" />
          )}
        </button>

        {/* Error Display */}
        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg max-w-md">
            <p className="text-sm font-semibold">Error: {error}</p>
          </div>
        )}

        <Hero />
        <UploadSection onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
        {(analysisResult || isAnalyzing) && (
          <ResultsSection result={analysisResult} isAnalyzing={isAnalyzing} imagePreview={imagePreview} />
        )}
        <HowItWorks />
        <TechStack />

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-600 border-t border-gray-200 dark:border-gray-900">
          <p>Advanced AI Research Project • Deepfake Detection System</p>
        </footer>
      </div>
    </div>
  );
}
