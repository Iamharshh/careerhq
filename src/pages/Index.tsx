import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  Search,
  Bell,
  Plus,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ResumeUpload } from "@/components/dashboard/ResumeUpload";
import { OpportunityHub } from "@/components/opportunities/OpportunityHub";
import { CheckMatchModal, RoadmapSettings } from "@/components/modals/CheckMatchModal";
import { MatchAnalysisModal } from "@/components/modals/MatchAnalysisModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isCheckMatchOpen, setIsCheckMatchOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(260);

  const handleGenerate = (settings: RoadmapSettings) => {
    console.log("Generating roadmap with settings:", settings);
    setIsCheckMatchOpen(false);
    setIsAnalysisOpen(true);
  };

  const handleResumeUpload = (file: File) => {
    console.log("Resume uploaded:", file.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

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
              <Button
                onClick={() => setIsCheckMatchOpen(true)}
                className="gap-2 gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Check Match</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8 space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, Alex
            </h1>
            <p className="text-muted-foreground">
              Your career journey continues. Here's your progress overview.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Skill Match"
              value="68%"
              change="+12% this month"
              changeType="positive"
              icon={Target}
              delay={0}
            />
            <StatsCard
              title="Applications"
              value={24}
              change="8 in review"
              changeType="neutral"
              icon={TrendingUp}
              delay={0.1}
            />
            <StatsCard
              title="Connections"
              value={156}
              change="+23 new"
              changeType="positive"
              icon={Users}
              delay={0.2}
            />
            <StatsCard
              title="Skills Gained"
              value={12}
              change="3 this week"
              changeType="positive"
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
              <OpportunityHub />
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
                    onClick={() => setIsCheckMatchOpen(true)}
                  >
                    <Target className="w-4 h-4 text-primary" />
                    Analyze Job Match
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
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
                        12/20 hrs
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
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
                      <span className="font-medium text-foreground">7/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="h-full bg-success rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
      />
    </div>
  );
};

export default Index;