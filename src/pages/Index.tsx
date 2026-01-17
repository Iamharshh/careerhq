import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  Search,
  Bell,
  Loader2,
  Save,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ResumeUpload } from "@/components/dashboard/ResumeUpload";
import { OpportunityHub } from "@/components/opportunities/OpportunityHub";
import { CheckMatchModal, RoadmapSettings } from "@/components/modals/CheckMatchModal";
import { MatchAnalysisModal } from "@/components/modals/MatchAnalysisModal";
import { SearchHistory } from "@/components/history/SearchHistory";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useSearchHistory, AnalysisData, Task, SearchHistoryEntry } from "@/hooks/useSearchHistory";

const RESUME_STORAGE_KEY = "careerhq_resume_text";
const ANALYSIS_COMPLETED_KEY = "careerhq_analysis_completed";

// Default analysis data for new analyses
const generateDefaultAnalysisData = (jobTitle: string): AnalysisData => ({
  jobTitle,
  skillsFound: ["React", "TypeScript", "Node.js", "Git", "REST APIs", "Agile"],
  skillGaps: ["GraphQL", "Docker", "AWS", "System Design", "CI/CD"],
  tasks: [
    { id: "1", title: "Complete GraphQL fundamentals course", hours: 8, proofLink: "https://example.com/graphql-cert", completed: false },
    { id: "2", title: "Build a containerized Node.js app", hours: 12, proofLink: "https://github.com/example/docker-project", completed: false },
    { id: "3", title: "Deploy to AWS using EC2 & S3", hours: 6, proofLink: "https://example.com/aws-project", completed: false },
    { id: "4", title: "Design a scalable microservices architecture", hours: 10, proofLink: "https://miro.com/example-design", completed: false },
    { id: "5", title: "Set up GitHub Actions CI/CD pipeline", hours: 4, proofLink: "https://github.com/example/actions", completed: false },
  ],
  matchPercentage: Math.floor(Math.random() * 30) + 60,
});

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isCheckMatchOpen, setIsCheckMatchOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [lastMatchPercentage, setLastMatchPercentage] = useState(68);
  const [currentAnalysisData, setCurrentAnalysisData] = useState<AnalysisData | null>(null);
  const [currentHistoryEntryId, setCurrentHistoryEntryId] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { history, addEntry, deleteEntry, updateEntryProgress } = useSearchHistory();

  // Load resume and analysis state from localStorage on mount
  useEffect(() => {
    const savedResume = localStorage.getItem(RESUME_STORAGE_KEY);
    if (savedResume) {
      setResumeText(savedResume);
    }
    const savedAnalysis = localStorage.getItem(ANALYSIS_COMPLETED_KEY);
    if (savedAnalysis === "true") {
      setAnalysisCompleted(true);
    }
  }, []);

  // Save resume to localStorage whenever it changes
  const handleResumeChange = (text: string) => {
    setResumeText(text);
    localStorage.setItem(RESUME_STORAGE_KEY, text);
  };

  const handleSaveResume = () => {
    localStorage.setItem(RESUME_STORAGE_KEY, resumeText);
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved to local storage.",
    });
  };

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please paste a job description to analyze.",
        variant: "destructive",
      });
      return;
    }

    console.log(`Comparing Resume: ${resumeText} with Job: ${jobDescription}`);
    setIsCheckMatchOpen(true);
  };

  const handleGenerate = async (settings: RoadmapSettings) => {
    console.log("Generating roadmap with settings:", settings);
    setIsCheckMatchOpen(false);
    setAnalysisCompleted(true);
    localStorage.setItem(ANALYSIS_COMPLETED_KEY, "true");
    
    // Generate analysis data
    const lines = jobDescription.trim().split('\n');
    const jobTitle = lines[0] || "Untitled Position";
    const analysisData = generateDefaultAnalysisData(jobTitle);
    
    setLastMatchPercentage(analysisData.matchPercentage);
    setCurrentAnalysisData(analysisData);
    setCurrentHistoryEntryId(null); // New analysis, no history entry yet
    
    // Add to search history
    addEntry(jobDescription, analysisData);
    
    setIsAnalysisOpen(true);
  };

  const handleViewHistoryEntry = (entry: SearchHistoryEntry) => {
    setCurrentAnalysisData(entry.analysisData);
    setCurrentHistoryEntryId(entry.id);
    setIsAnalysisOpen(true);
  };

  const handleSaveProgress = (entryId: string, tasks: Task[]) => {
    updateEntryProgress(entryId, tasks);
    toast({
      title: "Progress Saved",
      description: "Your learning progress has been saved.",
    });
  };

  const handleResumeUpload = (file: File) => {
    console.log("Resume uploaded:", file.name);
    // For now, just show a toast - actual PDF parsing would be done here
    toast({
      title: "Resume Uploaded",
      description: `${file.name} has been uploaded. PDF parsing coming soon.`,
    });
  };

  const handleCheckFit = (opportunityText: string) => {
    setJobDescription(opportunityText);
    setActiveSection("dashboard");
    // Scroll to hero section after navigation
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    toast({
      title: "Opportunity Loaded",
      description: "The opportunity details have been loaded for analysis.",
    });
  };

  const handleNavigate = (section: string) => {
    if (section === "match") {
      // Instead of navigating to match section, scroll to hero and open modal
      setActiveSection("dashboard");
      setTimeout(() => {
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="transition-all duration-300 ml-[72px] md:ml-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="w-64 h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8 space-y-8">
          {activeSection === "dashboard" && (
            <>
              {/* Hero Section with Job Analysis */}
              <motion.div
                ref={heroRef}
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6 lg:p-8 space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    Welcome
                  </h1>
                  <p className="text-muted-foreground">
                    Paste a job description below to analyze your skill match.
                  </p>
                </div>
                <Textarea
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[150px] resize-none bg-muted/50 border-border focus:border-primary"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="gap-2 gradient-primary text-primary-foreground hover:opacity-90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      Analyze Match
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Skill Match"
                  value={analysisCompleted ? `${lastMatchPercentage}%` : "N/A"}
                  change={analysisCompleted ? "+12% this month" : "Run analysis to calculate"}
                  changeType={analysisCompleted ? "positive" : "neutral"}
                  icon={Target}
                  delay={0}
                />
                <StatsCard
                  title="Applications"
                  value={analysisCompleted ? 24 : 0}
                  change={analysisCompleted ? "8 in review" : "Start applying"}
                  changeType="neutral"
                  icon={TrendingUp}
                  delay={0.1}
                />
                <StatsCard
                  title="Connections"
                  value={analysisCompleted ? 156 : 0}
                  change={analysisCompleted ? "+23 new" : "Build your network"}
                  changeType={analysisCompleted ? "positive" : "neutral"}
                  icon={Users}
                  delay={0.2}
                />
                <StatsCard
                  title="Skills Gained"
                  value={analysisCompleted ? 12 : 0}
                  change={analysisCompleted ? "3 this week" : "Complete tasks to grow"}
                  changeType={analysisCompleted ? "positive" : "neutral"}
                  icon={Zap}
                  delay={0.3}
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Opportunities */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">
                      Opportunity Hub
                    </h2>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All
                    </Button>
                  </div>
                  <OpportunityHub onCheckFit={handleCheckFit} />
                </div>

                {/* Sidebar Content */}
                <div className="space-y-6">
                  <ResumeUpload onUpload={handleResumeUpload} />

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="glass-card rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3"
                        onClick={() => heroRef.current?.scrollIntoView({ behavior: "smooth" })}
                      >
                        <Target className="w-4 h-4 text-primary" />
                        Analyze Job Match
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3"
                        onClick={() => setIsAnalysisOpen(true)}
                      >
                        <TrendingUp className="w-4 h-4 text-success" />
                        View Learning Path
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3"
                      >
                        <Users className="w-4 h-4 text-warning" />
                        Network Insights
                      </Button>
                    </div>
                  </motion.div>

                  {/* Progress Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="glass-card rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Weekly Goal
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">
                            Learning Hours
                          </span>
                          <span className="font-medium text-foreground">
                            {analysisCompleted ? "12/20 hrs" : "0/20 hrs"}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: analysisCompleted ? "60%" : "0%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">
                            Tasks Completed
                          </span>
                          <span className="font-medium text-foreground">
                            {analysisCompleted ? "7/10" : "0/10"}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: analysisCompleted ? "70%" : "0%" }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="h-full bg-success rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </>
          )}

          {activeSection === "opportunities" && (
            <motion.div
              key="opportunities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-foreground">Opportunities</h1>
              <p className="text-muted-foreground">Discover jobs, hackathons, and projects tailored to your profile.</p>
              <OpportunityHub onCheckFit={handleCheckFit} />
            </motion.div>
          )}

          {activeSection === "resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-foreground">Resume</h1>
              <p className="text-muted-foreground">Upload and manage your resume to improve match accuracy.</p>
              <div className="max-w-md">
                <ResumeUpload onUpload={handleResumeUpload} />
              </div>
              
              {/* Resume Text Section */}
              <div className="glass-card rounded-xl p-6 max-w-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Resume Text</h3>
                  <Button
                    onClick={handleSaveResume}
                    size="sm"
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paste your resume text below. This will be saved locally and used for job matching analysis.
                </p>
                <Textarea
                  placeholder="Paste your full resume here (experience, skills, education, etc.)..."
                  value={resumeText}
                  onChange={(e) => handleResumeChange(e.target.value)}
                  className="min-h-[300px] resize-none bg-muted/50 border-border focus:border-primary"
                />
                {resumeText && (
                  <p className="text-xs text-muted-foreground">
                    {resumeText.length} characters • Synced to browser storage
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {activeSection === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-foreground">Search History</h1>
                <p className="text-muted-foreground mt-1">
                  View all your past job match analyses.
                </p>
              </div>
              <SearchHistory history={history} onDelete={deleteEntry} onViewEntry={handleViewHistoryEntry} />
            </motion.div>
          )}

          {activeSection === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and resume profile.</p>
              
              {/* Resume Profile Section */}
              <div className="glass-card rounded-xl p-6 max-w-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Resume Profile</h3>
                  <Button
                    onClick={handleSaveResume}
                    size="sm"
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paste your resume text below. This will be saved locally and used for job matching analysis.
                </p>
                <Textarea
                  placeholder="Paste your full resume here (experience, skills, education, etc.)..."
                  value={resumeText}
                  onChange={(e) => handleResumeChange(e.target.value)}
                  className="min-h-[300px] resize-none bg-muted/50 border-border focus:border-primary"
                />
                {resumeText && (
                  <p className="text-xs text-muted-foreground">
                    {resumeText.length} characters • Synced to browser storage
                  </p>
                )}
              </div>

              {/* Preferences Section */}
              <div className="glass-card rounded-xl p-6 max-w-2xl space-y-4">
                <h3 className="font-semibold text-foreground">Preferences</h3>
                <p className="text-sm text-muted-foreground">Additional settings coming soon...</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Modals */}
      <CheckMatchModal
        isOpen={isCheckMatchOpen}
        onClose={() => setIsCheckMatchOpen(false)}
        onGenerate={handleGenerate}
      />
      <MatchAnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        analysisData={currentAnalysisData}
        historyEntryId={currentHistoryEntryId}
        onSaveProgress={handleSaveProgress}
      />
    </div>
  );
};

export default Index;