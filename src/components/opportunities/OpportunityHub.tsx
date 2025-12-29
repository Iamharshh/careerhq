import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Trophy,
  GitBranch,
  DollarSign,
  MapPin,
  Clock,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TabType = "jobs" | "hackathons" | "opensource" | "freelance";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  posted: string;
  tags: string[];
}

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "hackathons", label: "Hackathons", icon: Trophy },
  { id: "opensource", label: "Open Source", icon: GitBranch },
  { id: "freelance", label: "Freelance", icon: DollarSign },
];

const mockOpportunities: Record<TabType, Opportunity[]> = {
  jobs: [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and GraphQL. You'll be leading our frontend architecture and mentoring junior developers.",
      posted: "2 days ago",
      tags: ["React", "TypeScript", "GraphQL"],
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      description: "Join our fast-growing startup as a Full Stack Engineer. We need someone proficient in Node.js, React, and AWS to build scalable solutions.",
      posted: "1 week ago",
      tags: ["Node.js", "React", "AWS"],
    },
    {
      id: "3",
      title: "React Developer",
      company: "DigitalAgency",
      location: "New York, NY",
      type: "Contract",
      description: "We're hiring a React Developer for a 6-month contract. Experience with Next.js and Tailwind CSS is required.",
      posted: "3 days ago",
      tags: ["React", "Next.js", "Tailwind"],
    },
  ],
  hackathons: [
    {
      id: "4",
      title: "AI Innovation Challenge",
      company: "Google",
      location: "Virtual",
      type: "48 hours",
      description: "Build innovative AI solutions using Google's latest APIs. Categories include AI/ML and Web Development with $50k in prizes.",
      posted: "Starts Jan 15",
      tags: ["AI/ML", "Web Dev", "$50k Prize"],
    },
    {
      id: "5",
      title: "Climate Tech Hackathon",
      company: "TechForGood",
      location: "Virtual",
      type: "3 days",
      description: "Create technology solutions for climate change. Focus areas include sustainability and IoT with $25k in prizes.",
      posted: "Starts Feb 1",
      tags: ["Sustainability", "IoT", "$25k Prize"],
    },
  ],
  opensource: [
    {
      id: "6",
      title: "React Core Contributor",
      company: "Meta",
      location: "Remote",
      type: "Open Source",
      description: "Contribute to React's core codebase. Good first issues available for JavaScript developers looking to get started.",
      posted: "Active",
      tags: ["React", "JavaScript", "Good First Issue"],
    },
    {
      id: "7",
      title: "TypeScript Docs Maintainer",
      company: "Microsoft",
      location: "Remote",
      type: "Open Source",
      description: "Help maintain and improve TypeScript documentation. Great for developers who want to contribute to documentation.",
      posted: "Active",
      tags: ["TypeScript", "Documentation"],
    },
  ],
  freelance: [
    {
      id: "8",
      title: "E-commerce Platform Build",
      company: "RetailCo",
      location: "Remote",
      type: "$5k-10k",
      description: "Build a complete e-commerce platform with React and Stripe integration. 3-month project timeline.",
      posted: "Posted today",
      tags: ["React", "Stripe", "3 months"],
    },
    {
      id: "9",
      title: "Dashboard Development",
      company: "FinTech Startup",
      location: "Remote",
      type: "$3k-5k",
      description: "Develop an analytics dashboard with React and D3.js for data visualization. 6-week project.",
      posted: "1 day ago",
      tags: ["React", "D3.js", "6 weeks"],
    },
  ],
};

interface OpportunityHubProps {
  onCheckFit?: (opportunityText: string) => void;
}

export function OpportunityHub({ onCheckFit }: OpportunityHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>("jobs");

  const handleCheckFit = (opp: Opportunity) => {
    const opportunityText = `
Title: ${opp.title}
Company: ${opp.company}
Location: ${opp.location}
Type: ${opp.type}

Description:
${opp.description}

Required Skills: ${opp.tags.join(", ")}
    `.trim();
    
    onCheckFit?.(opportunityText);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-muted/50 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Opportunity Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4"
        >
          {mockOpportunities[activeTab].map((opp, index) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="glass-card rounded-xl p-5 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {opp.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground/80">
                      {opp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {opp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {opp.posted}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {opp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground">
                      {opp.type}
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 flex-shrink-0"
                  onClick={() => handleCheckFit(opp)}
                >
                  <Target className="w-4 h-4" />
                  Check Fit
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}