import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Clock, Target, Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface CheckMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (settings: RoadmapSettings) => void;
}

export interface RoadmapSettings {
  intensity: "crash" | "focused" | "deep";
  commitment: "1hr" | "4hrs" | "fulltime";
}

const intensityLabels = {
  crash: { label: "Crash Course", days: "2 days", icon: Zap },
  focused: { label: "Focused", days: "7 days", icon: Target },
  deep: { label: "Deep Dive", days: "14-30 days", icon: Lightbulb },
};

const commitmentOptions = [
  { value: "1hr", label: "1 hr/day", description: "Part-time learning" },
  { value: "4hrs", label: "4 hrs/day", description: "Intensive study" },
  { value: "fulltime", label: "Full-time", description: "8+ hrs/day" },
];

export function CheckMatchModal({
  isOpen,
  onClose,
  onGenerate,
}: CheckMatchModalProps) {
  const [intensity, setIntensity] = useState<"crash" | "focused" | "deep">(
    "focused"
  );
  const [commitment, setCommitment] = useState<"1hr" | "4hrs" | "fulltime">(
    "4hrs"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const intensityIndex =
    intensity === "crash" ? 0 : intensity === "focused" ? 1 : 2;

  const getPreviewMessage = () => {
    if (intensity === "crash" && commitment === "fulltime") {
      return "AI will prioritize high-impact projects first. Expect intense, hands-on sessions.";
    }
    if (intensity === "deep" && commitment === "1hr") {
      return "Comprehensive coverage with spaced learning. Great for long-term retention.";
    }
    return "Balanced approach focusing on practical skills with room for exploration.";
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    onGenerate({ intensity, commitment });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg glass-card rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Roadmap Settings
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customize your learning path
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Intensity Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Target Intensity
                  </label>
                  <span className="text-sm text-primary font-semibold">
                    {intensityLabels[intensity].label} •{" "}
                    {intensityLabels[intensity].days}
                  </span>
                </div>
                <Slider
                  value={[intensityIndex]}
                  min={0}
                  max={2}
                  step={1}
                  onValueChange={([val]) => {
                    const levels: ("crash" | "focused" | "deep")[] = [
                      "crash",
                      "focused",
                      "deep",
                    ];
                    setIntensity(levels[val]);
                  }}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Quick</span>
                  <span>Balanced</span>
                  <span>Comprehensive</span>
                </div>
              </div>

              {/* Commitment Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Daily Commitment
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {commitmentOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setCommitment(option.value as typeof commitment)
                      }
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        commitment === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <Clock
                        className={`w-5 h-5 mx-auto mb-2 ${
                          commitment === option.value
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <p
                        className={`text-sm font-semibold ${
                          commitment === option.value
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <motion.div
                key={`${intensity}-${commitment}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-muted/50 border border-border"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Roadmap Preview
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getPreviewMessage()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 gradient-primary text-primary-foreground hover:opacity-90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Gemini is architecting your path...
                  </>
                ) : (
                  "Generate Roadmap"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}