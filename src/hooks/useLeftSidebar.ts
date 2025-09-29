import { useState } from "react";
import type { Task } from "../../types";

interface UseLeftSidebarOptions {
  initialTasks?: Task[];
  initialSelectedTaskId?: string;
}

export const useLeftSidebar = ({ initialTasks = [], initialSelectedTaskId }: UseLeftSidebarOptions = {}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(initialSelectedTaskId);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const selectTask = (id: string) => setSelectedTaskId(id);

  const nowTasks = initialTasks.filter(t => ['BUG-007', 'FEA-112', 'DEV-404'].includes(t.id));
  const pinnedTasks = initialTasks.filter(t => ['PIN-001', 'PIN-002'].includes(t.id));
  const inboxTasks = initialTasks.filter(t => ['DES-101', 'DES-102', 'DOC-001'].includes(t.id));

  return { isSidebarOpen, toggleSidebar, selectedTaskId, selectTask, nowTasks, pinnedTasks, inboxTasks };
};

