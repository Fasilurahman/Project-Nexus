import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  CheckCircle,
  MapPin,
  Calendar,
  Trophy,
  Sparkles,
} from "lucide-react";
import SidebarNav from "../components/dashboard/Sidebar";
import UserProfileCard from "../components/Design/UserProfileCard";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  department: string;
  projects: number;
  tasksCompleted: number;
  performance: number;
  badges: string[];
  skills: string[];
  recentActivity: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Anderson",
    role: "Senior Developer",
    email: "sarah.a@teamflow.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    status: "online",
    department: "Engineering",
    projects: 8,
    tasksCompleted: 145,
    performance: 98,
    badges: ["Top Performer", "Mentor", "Innovation Lead"],
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    recentActivity: "Deployed new feature to production",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "UI/UX Designer",
    email: "michael.c@teamflow.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    status: "busy",
    department: "Design",
    projects: 6,
    tasksCompleted: 89,
    performance: 95,
    badges: ["Design Expert", "Creative Lead"],
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    recentActivity: "Created new design system",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    email: "emily.r@teamflow.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    status: "online",
    department: "Product",
    projects: 12,
    tasksCompleted: 234,
    performance: 97,
    badges: ["Strategy Master", "Team Leader"],
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Stories"],
    recentActivity: "Launched Q1 roadmap",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Backend Developer",
    email: "david.k@teamflow.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    status: "offline",
    department: "Engineering",
    projects: 5,
    tasksCompleted: 112,
    performance: 94,
    badges: ["Backend Specialist", "Security Expert"],
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    recentActivity: "Optimized database performance",
  },
];

const TeamMembers = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500';
      case 'busy':
        return 'bg-amber-500';
      case 'away':
        return 'bg-orange-500';
      case 'offline':
        return 'bg-slate-500';
      default:
        return 'bg-slate-500';
    }
  };
  
  // Helper function for performance color
  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'bg-gradient-to-r from-emerald-500 to-green-500';
    if (performance >= 75) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    if (performance >= 50) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-rose-500';
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-indigo-950">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/30 backdrop-blur-xl border-r border-slate-700/50 z-20"
      >
        <div className="p-8">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl"></div>
              <div className="relative p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                TeamFlow
              </h1>
              <span className="text-xs font-medium text-indigo-400">
                Enterprise Suite
              </span>
            </div>
          </motion.div>
        </div>

        <SidebarNav />

        <UserProfileCard />
      </motion.aside>

      <main className="pl-72">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/50 border-b border-slate-700/50"
        >
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users className="w-6 h-6 text-indigo-400" />
                <h1 className="text-xl font-display font-bold text-white">
                  Team Members
                </h1>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)",
                  }}
                  className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedMember(member)}
                >
                  {/* Animated Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:via-indigo-500/5 group-hover:to-purple-500/10 rounded-2xl transition-all duration-500"></div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500"></div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 transition-all duration-500"></div>

                  {/* Status Indicator - Larger and more visible */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="relative">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          member.status
                        )}`}
                      ></div>
                      <div
                        className={`absolute inset-0 rounded-full ${getStatusColor(
                          member.status
                        )
                          .replace("bg-", "bg-")
                          .replace("500", "400/30")} animate-ping`}
                      ></div>
                    </div>
                  </div>

                  {/* Member Header with Avatar */}
                  <div className="relative z-10 flex items-start mb-6">
                    <div className="relative mr-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <img
                          src={member.avatar || "/api/placeholder/100/100"}
                          alt={member.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="absolute inset-0 rounded-xl ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all duration-300"></div>
                      </motion.div>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-indigo-400 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-slate-400 mb-2">{member.role}</p>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        <span className="text-xs font-medium text-indigo-400">
                          {member.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Section */}
                  <div className="relative z-10 mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-slate-400">
                        Performance
                      </h4>
                      <span className="text-lg font-display font-bold text-white">
                        {member.performance}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.performance}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${getPerformanceColor(
                          member.performance
                        )}`}
                      />
                    </div>
                  </div>

                  {/* Project Status */}
                  <div className="relative z-10 mb-5 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 group-hover:border-indigo-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs text-slate-400">Projects</span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-lg font-display font-bold text-white">
                          {member.projects}
                        </span>
                        <span className="ml-1 text-xs text-emerald-400">
                          completed
                        </span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 group-hover:border-indigo-500/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-slate-400">Tasks</span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-lg font-display font-bold text-white">
                          {member.tasksCompleted}
                        </span>
                        <span className="ml-1 text-xs text-emerald-400">
                          done
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="relative z-10 mb-4">
                    <h4 className="text-sm font-medium text-slate-400 mb-2">
                      Top Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/50 group-hover:border-indigo-500/20 group-hover:bg-slate-800/70 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/50">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recent Activity or Achievements */}
                  <div className="relative z-10">
                    <h4 className="text-sm font-medium text-slate-400 mb-2">
                      Recent Achievement
                    </h4>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <p className="text-sm text-white">
                          {member.badges[0] || "Top Performer"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <div className="relative z-10 mt-5 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium text-sm hover:bg-indigo-500/20 transition-all duration-300"
                    >
                      View Profile
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900 p-6 rounded-2xl shadow-xl max-w-2xl w-full mx-4 border border-slate-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-24 h-24 rounded-xl ring-2 ring-indigo-500/20 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-slate-400">{selectedMember.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        selectedMember.status
                      )}`}
                    ></div>
                    <span className="text-sm text-slate-400 capitalize">
                      {selectedMember.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        <Mail className="w-4 h-4 text-indigo-400" />
                        <span>{selectedMember.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Phone className="w-4 h-4 text-indigo-400" />
                        <span>{selectedMember.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-4 h-4 text-indigo-400" />
                        <span>{selectedMember.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-sm rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">
                      Performance Metrics
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-400">
                            Projects Completed
                          </span>
                          <span className="text-white">
                            {selectedMember.projects}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-700/50">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{
                              width: `${(selectedMember.projects / 12) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-400">
                            Performance Score
                          </span>
                          <span className="text-white">
                            {selectedMember.performance}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-700/50">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${selectedMember.performance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">
                      Achievements
                    </h3>
                    <div className="space-y-2">
                      {selectedMember.badges.map((badge) => (
                        <div
                          key={badge}
                          className="p-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
                        >
                          <span className="text-sm text-indigo-400">
                            {badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors duration-200"
                  onClick={() => setSelectedMember(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamMembers;
