
export enum TaskStatus {
  InProgress = 'In Progress',
  Completed = 'Completed',
  ToDo = 'To Do',
  Review = 'In Review',
}

export enum TaskPriority {
  High = 'High Priority',
  Medium = 'Medium Priority',
  Low = 'Low Priority',
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  shortDescription: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
  timeLogged: string;
  timeTotal: string;
  sprint: string;
  sprintPoints?: number;
  tags: string[];
  description: string;
  requirements: string[];
  technicalNotes: string;
  checklist: ChecklistItem[];
  comments: Comment[];
  timeline: {
    start: string;
    end: string;
  };
}

export type MessageType = {
  id: number;
  author: string;
  initials: string;
  text: string;
  timestamp: string;
  type: "sent" | "received";
};

export type MessagesByConversation = {
  [key: number]: MessageType[];
};