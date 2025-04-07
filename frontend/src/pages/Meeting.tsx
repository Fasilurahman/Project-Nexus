import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Video,
  Plus,
  Search,
  Bell,
  ChevronRight,
  Sparkles,
  Zap,
  Link as LinkIcon,
  Calendar as CalendarIcon,
  Star,
  PlayCircle,
  CheckCircle2,
  Timer,
  X,
  Mic,
  Settings,
  Copy,
  UserPlus,
  Globe,
  Lock,
} from 'lucide-react';
import SidebarNav from '../components/dashboard/Sidebar';
import UserProfileCard from '../components/Design/UserProfileCard';
import UserMenuDropdown from '../components/Design/UserMenuDropdown';
import NotificationView from '../components/dashboard/NotificationView';
import { Meeting } from "../types"
const S3_PATH = import.meta.env.VITE_AWSS3_PATH;



const Meetings = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [newMeetingForm, setNewMeetingForm] = useState({
    title: '',
    date: '',
    time: '',
    duration: '1',
    privacy: 'public',
    description: '',
  });

  const upcomingMeetings: Meeting[] = [
    {
      id: 1,
      title: 'Q1 Project Review',
      date: '2025-03-15',
      time: '10:00 AM',
      duration: '1h 30m',
      attendees: 8,
      status: 'upcoming',
      host: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      type: 'video',
      recording: true,
      description: 'Quarterly review of all ongoing projects and their milestones.',
      privacy: 'private',
    },
    {
      id: 2,
      title: 'Design Team Sync',
      date: '2025-03-15',
      time: '2:00 PM',
      duration: '45m',
      attendees: 5,
      status: 'live',
      host: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
      type: 'video',
      description: 'Weekly sync-up with the design team to discuss ongoing projects.',
      privacy: 'public',
    },
  ];

  const handleViewDetails = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowDetailsModal(true);
  };

  const handleJoinMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowJoinModal(true);
  };

  const Modal = ({ children, isOpen, onClose, title }: { children: React.ReactNode; isOpen: boolean; onClose: () => void; title: string }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-slate-800/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl w-full max-w-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-indigo-950">
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
              <span className="text-xs font-medium text-indigo-400">Enterprise Suite</span>
            </div>
          </motion.div>
        </div>

        <SidebarNav />
        <UserProfileCard />
      </motion.aside>

      {/* Main Content */}
      <div className="pl-72 flex-1 flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/50 border-b border-slate-700/50"
        >
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search meetings..."
                    className="pl-9 pr-4 py-2 w-64 bg-slate-800/50 text-sm rounded-lg border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewMeetingModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Meeting</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-900"></span>
                  </motion.button>

                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 z-50"
                    >
                      <NotificationView onClose={() => setShowNotifications(false)} />
                    </motion.div>
                  )}
                </div>

                <div className="h-5 w-px bg-slate-700/50"></div>

                <motion.div 
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="Profile"
                    className="w-8 h-8 rounded-lg ring-2 ring-indigo-500/20"
                  />
                  <UserMenuDropdown />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { icon: Video, label: 'Total Meetings', value: '248', trend: '+12%' },
              { icon: Users, label: 'Total Participants', value: '1,842', trend: '+8%' },
              { icon: Clock, label: 'Hours Hosted', value: '386', trend: '+15%' },
              { icon: Star, label: 'Avg. Rating', value: '4.8', trend: '+0.3' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <stat.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-emerald-400 text-sm font-medium">{stat.trend}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Live Now Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="relative">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <div className="absolute inset-0 animate-ping bg-amber-400/20 rounded-full"></div>
                </div>
                Live Now
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {upcomingMeetings
                .filter((meeting) => meeting.status === 'live')
                .map((meeting) => (
                  <motion.div
                    key={meeting.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-3">
                      <div className="flex items-center gap-2 bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                        Live
                      </div>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{meeting.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{meeting.attendees} attendees</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={meeting.host.avatar}
                          alt={meeting.host.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{meeting.host.name}</p>
                          <p className="text-xs text-slate-400">Host</p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleJoinMeeting(meeting)}
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Join Now
                      </motion.button>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Upcoming Meetings */}
          <div className="bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Upcoming Meetings</h2>
              <div className="flex bg-slate-800/30 rounded-lg p-1">
                {['upcoming', 'past'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'upcoming' | 'past')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-indigo-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {upcomingMeetings
                .filter((meeting) => meeting.status === 'upcoming')
                .map((meeting) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-slate-800/30 rounded-xl p-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">{meeting.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            <span>{meeting.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/32?img=${i + 1}`}
                            alt={`Attendee ${i + 1}`}
                            className="w-8 h-8 rounded-full border-2 border-slate-900"
                          />
                        ))}
                        {meeting.attendees > 3 && (
                          <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-white">
                            +{meeting.attendees - 3}
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(meeting)}
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 opacity-0 group-hover:opacity-100"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Meeting Modal */}
      <Modal
        isOpen={showNewMeetingModal}
        onClose={() => setShowNewMeetingModal(false)}
        title="Schedule New Meeting"
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Meeting Title
            </label>
            <input
              type="text"
              value={newMeetingForm.title}
              onChange={(e) => setNewMeetingForm({ ...newMeetingForm, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="Enter meeting title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={newMeetingForm.date}
                onChange={(e) => setNewMeetingForm({ ...newMeetingForm, date: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Time
              </label>
              <input
                type="time"
                value={newMeetingForm.time}
                onChange={(e) => setNewMeetingForm({ ...newMeetingForm, time: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Duration (hours)
            </label>
            <select
              value={newMeetingForm.duration}
              onChange={(e) => setNewMeetingForm({ ...newMeetingForm, duration: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {[0.5, 1, 1.5, 2, 2.5, 3].map((duration) => (
                <option key={duration} value={duration}>
                  {duration} hour{duration !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Privacy
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setNewMeetingForm({ ...newMeetingForm, privacy: 'public' })}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  newMeetingForm.privacy === 'public'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800/50 text-slate-400'
                }`}
              >
                <Globe className="w-4 h-4" />
                Public
              </button>
              <button
                type="button"
                onClick={() => setNewMeetingForm({ ...newMeetingForm, privacy: 'private' })}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  newMeetingForm.privacy === 'private'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800/50 text-slate-400'
                }`}
              >
                <Lock className="w-4 h-4" />
                Private
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={newMeetingForm.description}
              onChange={(e) => setNewMeetingForm({ ...newMeetingForm, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-24"
              placeholder="Enter meeting description"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowNewMeetingModal(false)}
              className="px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Meeting
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Meeting Details"
      >
        {selectedMeeting && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{selectedMeeting.title}</h3>
              <div className="flex items-center gap-2">
                {selectedMeeting.privacy === 'private' ? (
                  <Lock className="w-4 h-4 text-slate-400" />
                ) : (
                  <Globe className="w-4 h-4 text-slate-400" />
                )}
                <span className="text-sm text-slate-400 capitalize">{selectedMeeting.privacy}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Date</p>
                    <p className="text-white">{selectedMeeting.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Clock className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Time</p>
                    <p className="text-white">{selectedMeeting.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Timer className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Duration</p>
                    <p className="text-white">{selectedMeeting.duration}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Users className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Attendees</p>
                    <p className="text-white">{selectedMeeting.attendees} participants</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Video className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Meeting Type</p>
                    <p className="text-white capitalize">{selectedMeeting.type}</p>
                  </div>
                </div>

                {selectedMeeting.recording && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Recording</p>
                      <p className="text-white">Enabled</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Description</h4>
              <p className="text-slate-400">{selectedMeeting.description}</p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleJoinMeeting(selectedMeeting);
                }}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                Join Meeting
              </button>

              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                  <Copy className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                  <UserPlus className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Join Meeting Modal */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join Meeting"
      >
        {selectedMeeting && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">{selectedMeeting.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMeeting.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedMeeting.host.avatar}
                  alt={selectedMeeting.host.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-white">{selectedMeeting.host.name}</p>
                  <p className="text-xs text-slate-400">Host</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{selectedMeeting.attendees} participants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <span>{selectedMeeting.duration}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-slate-400" />
                  <span className="text-white">Camera</span>
                </div>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-slate-400" />
                  <span className="text-white">Microphone</span>
                </div>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowJoinModal(false)}
                className="px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                Join Now
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Meetings;