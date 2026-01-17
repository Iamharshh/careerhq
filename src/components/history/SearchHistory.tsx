import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Clock, Target, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchHistoryEntry } from "@/hooks/useSearchHistory";
import { format } from "date-fns";

interface SearchHistoryProps {
  history: SearchHistoryEntry[];
  onDelete: (id: string) => void;
  onViewEntry: (entry: SearchHistoryEntry) => void;
}

export function SearchHistory({ history, onDelete, onViewEntry }: SearchHistoryProps) {
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-8 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">No History Yet</h3>
            <p className="text-muted-foreground mt-1">
              Your job match analyses will appear here once you start analyzing.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {history.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-xl p-5 hover:bg-muted/30 transition-colors cursor-pointer group"
            onClick={() => onViewEntry(entry)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                {/* Header with Job Title and Match */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {entry.jobTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      {entry.matchPercentage}% Match
                    </span>
                  </div>
                </div>

                {/* Job Description Snippet */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {entry.jobDescriptionSnippet}
                </p>

                {/* Date and Progress */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>
                      {format(new Date(entry.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                  {entry.analysisData?.tasks && (
                    <div className="text-xs text-muted-foreground">
                      {entry.analysisData.tasks.filter(t => t.completed).length}/{entry.analysisData.tasks.length} tasks done
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* View indicator */}
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                
                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                  }}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
