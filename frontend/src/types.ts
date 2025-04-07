export interface Attachment {
  id: number;
  name: string;
  size: string;
  type: string;
  url: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  image: string;
}

export interface PricingCardProps {
  id: string;
  title: string;
  price: string;
  billingCycle: string;
  description: string;
  features: string[];
  limitations?: string[];
  buttonText: string;
  popular: boolean;
}

export interface StatProps {
  value: string;
  label: string;
  delay: number;
}

export interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number | "Free";
  billingCycle: "month" | "year";
  features: string[];
  isPopular: boolean;
  activeUsers: number;
  color: string;
  description: string;
  recommendedFor: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  image: File | null | string;
  imagePreview?: string;
  status: "In Progress" | "Completed" | "On Hold" | "Pending";
  team: string[];
  teamMembersDetails: TeamMember[];
  startDate: string;
  endDate: string;
  progress: number;
  category: string;
  priority: "High" | "Medium" | "Low";
  documents: File[];
  teamLeadId?: {
    _id: string;
    [key: string]: any;
  };
}



export interface NewProject {
  name: string;
  description: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: string;
  image: File | null;
  imagePreview?: string;
  startDate: string;
  endDate: string;
  teamMembers: Employee[];
  documents: File[];
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  avatar: string;
  profilePic?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  status: string;
  isBlocked: boolean;
}

export interface Comment {
  id: number;
  author: TeamMember;
  content: string;
  createdAt: string;
}

export interface Task {
  id: number;
  _id?: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignedTo: string;
  comments: Comment[];
  attachments: Attachment[];
  createdAt: string;
  name?: string;
  assignedUser?: any;
}

export interface Subtask {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  assignedTo?: string;
  parentTaskId: string;
}

export interface DecodedToken {
  id: string;
}

export interface Message {
  id: number;
  _id?: number;
  content: string;
  timestamp: string;
  fileUrl?: string;
  sender: {
    id: number;
    name: string;
    avatar: string;
    online: boolean;
  };
  isOwn?: boolean;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroupChat?: boolean;
  members?: number;
}

export interface Member {
  _id: string;
  name: string;
  role?: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  status: 'upcoming' | 'live' | 'completed';
  host: {
    name: string;
    avatar: string;
  };
  type: 'video' | 'audio';
  recording?: boolean;
  description?: string;
  privacy?: 'public' | 'private';
}

export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
  tasks: Task[];
  totalPoints: number;
  completedPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewSprintData {
  name: string;
  startDate: string;
  endDate: string;
}

export interface BurndownDataPoint {
  day: number;
  remainingPoints: number;
}

export interface DragResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
  reason: 'DROP' | 'CANCEL';
}

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type SprintStatus = 'planning' | 'active' | 'completed';
