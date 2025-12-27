import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Trophy,
  GitBranch,
  DollarSign,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "jobs" | "hackathons" | "opensource" | "freelance";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  relevanceScore: number;
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
      relevanceScore: 92,
      posted: "2 days ago",
      tags: ["React", "TypeScript", "GraphQL"],
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      relevanceScore: 87,
      posted: "1 week ago",
      tags: ["Node.js", "React", "AWS"],
    },
    {
      id: "3",
      title: "React Developer",
      company: "DigitalAgency",
      location: "New York, NY",
      type: "Contract",
      relevanceScore: 78,
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
      relevanceScore: 85,
      posted: "Starts Jan 15",
      tags: ["AI/ML", "Web Dev", "$50k Prize"],
    },
    {
      id: "5",
      title: "Climate Tech Hackathon",
      company: "TechForGood",
      location: "Virtual",
      type: "3 days",
      relevanceScore: 72,
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
      relevanceScore: 95,
      posted: "Active",
      tags: ["React", "JavaScript", "Good First Issue"],
    },
    {
      id: "7",
      title: "TypeScript Docs Maintainer",
      company: "Microsoft",
      location: "Remote",
      type: "Open Source",
      relevanceScore: 88,
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
      relevanceScore: 81,
      posted: "Posted today",
      tags: ["React", "Stripe", "3 months"],
    },
    {
      id: "9",
      title: "Dashboard Development",
      company: "FinTech Startup",
      location: "Remote",
      type: "$3k-5k",
      relevanceScore: 89,
      posted: "1 day ago",
      tags: ["React", "D3.js", "6 weeks"],
    },
  ],
};

export function OpportunityHub() {
  const [activeTab, setActiveTab] = useState<TabType>("jobs");

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
              className="glass-card rounded-xl p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {opp.title}
                    </h3>
                    <div
                      className={cn(
                        "px-2 py-0.5 text-xs font-bold rounded-full",
                        opp.relevanceScore >= 90
                          ? "bg-success/10 text-success"
                          : opp.relevanceScore >= 80
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {opp.relevanceScore}% Match
                    </div>
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

                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}