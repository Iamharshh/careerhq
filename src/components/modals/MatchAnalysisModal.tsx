import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  AlertCircle,
  Pencil,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadialProgress } from "@/components/dashboard/RadialProgress";
import { Task, AnalysisData } from "@/hooks/useSearchHistory";

interface MatchAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisData?: AnalysisData | null;
  historyEntryId?: string | null;
  onSaveProgress?: (entryId: string, tasks: Task[]) => void;
}

const defaultSkillsFound = [
  "React",
  "TypeScript",
  "Node.js",
  "Git",
  "REST APIs",
  "Agile",
];
const defaultSkillGaps = [
  "GraphQL",
  "Docker",
  "AWS",
  "System Design",
  "CI/CD",
];

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Complete GraphQL fundamentals course",
    hours: 8,
    proofLink: "https://example.com/graphql-cert",
    completed: false,
  },
  {
    id: "2",
    title: "Build a containerized Node.js app",
    hours: 12,
    proofLink: "https://github.com/example/docker-project",
    completed: false,
  },
  {
    id: "3",
    title: "Deploy to AWS using EC2 & S3",
    hours: 6,
    proofLink: "https://example.com/aws-project",
    completed: false,
  },
  {
    id: "4",
    title: "Design a scalable microservices architecture",
    hours: 10,
    proofLink: "https://miro.com/example-design",
    completed: false,
  },
  {
    id: "5",
    title: "Set up GitHub Actions CI/CD pipeline",
    hours: 4,
    proofLink: "https://github.com/example/actions",
    completed: false,
  },
];

export function MatchAnalysisModal({
  isOpen,
  onClose,
  analysisData,
  historyEntryId,
  onSaveProgress,
}: MatchAnalysisModalProps) {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  // Update tasks when analysisData changes
  useEffect(() => {
    if (analysisData?.tasks) {
      setTasks(analysisData.tasks);
    } else {
      setTasks(defaultTasks);
    }
  }, [analysisData]);

  const skillsFound = analysisData?.skillsFound || defaultSkillsFound;
  const skillGaps = analysisData?.skillGaps || defaultSkillGaps;
  const jobTitle = analysisData?.jobTitle || "Senior Frontend Developer at TechCorp";

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSaveProgress = () => {
    if (historyEntryId && onSaveProgress) {
      onSaveProgress(historyEntryId, tasks);
    }
    onClose();
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const matchPercentage = 68 + Math.round((completedCount / tasks.length) * 32);

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
            className="w-full max-w-3xl max-h-[90vh] overflow-hidden glass-card rounded-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Match Analysis
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {jobTitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Skill Alignment */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <RadialProgress
                  value={matchPercentage}
                  size={140}
                  label="Skill Alignment"
                />
                <div className="flex-1 grid grid-cols-2 gap-6">
                  {/* Skills Found */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Check className="w-4 h-4 text-success" />
                      <h3 className="text-sm font-semibold text-foreground">
                        Skills Found
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsFound.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-success/10 text-success border border-success/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* The Gap */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <h3 className="text-sm font-semibold text-foreground">
                        The Gap
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGaps.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning border border-warning/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Learning Timeline
                </h3>
                <div className="space-y-3">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all duration-200 ${
                        task.completed
                          ? "bg-success/5 border-success/20"
                          : "bg-muted/30 border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                            task.completed
                              ? "bg-success border-success"
                              : "border-muted-foreground hover:border-primary"
                          }`}
                        >
                          {task.completed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <Check className="w-4 h-4 text-success-foreground" />
                            </motion.div>
                          )}
                        </motion.button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <p
                              className={`font-medium ${
                                task.completed
                                  ? "text-muted-foreground line-through"
                                  : "text-foreground"
                              }`}
                            >
                              {task.title}
                            </p>
                            <button
                              onClick={() =>
                                setExpandedTask(
                                  expandedTask === task.id ? null : task.id
                                )
                              }
                              className="p-1 rounded hover:bg-muted transition-colors"
                            >
                              {expandedTask === task.id ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{task.hours} hours</span>
                            <a
                              href={task.proofLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Proof of Work
                            </a>
                          </div>

                          <AnimatePresence>
                            {expandedTask === task.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-border flex gap-2"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                >
                                  <Pencil className="w-3 h-3" />
                                  Edit Task
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  Regenerate
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {tasks.length} tasks completed
                </p>
                <Button
                  onClick={handleSaveProgress}
                  className="gradient-primary text-primary-foreground hover:opacity-90"
                >
                  Save Progress
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
