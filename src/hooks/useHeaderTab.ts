import { useState } from "react";
import type { Task } from "../../types";

interface UseHeaderTabOption {
  allTasks?: Task[];
}

export const useHeaderTab = ({ allTasks = [] }: UseHeaderTabOption = {}) => {
  // state tab đang mở
  const [activeTabs, setActiveTabs] = useState<Task[]>(
    allTasks.filter((t) => ["PAY-234", "DES-101", "BUG-007"].includes(t.id))
  );

  // state tab đang được chọn
  const [selectedTask, setSelectedTask] = useState<Task | null>(
    allTasks.find((t) => t.id === "PAY-234") || null
  );

  // mở tab mới
  const openTab = (task: Task) => {
    setActiveTabs((prev) => {
      if (prev.some((t) => t.id === task.id)) return prev;
      return [...prev, task];
    });
    setSelectedTask(task);
  };

  // đóng tab
  const closeTab = (taskId: string) => {
    setActiveTabs((prev) => {
      const newTabs = prev.filter((t) => t.id !== taskId);
      if (selectedTask?.id === taskId) {
        setSelectedTask(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
      }
      return newTabs;
    });
  };

  // chọn tab
  const selectTab = (taskId: string) => {
    const task = activeTabs.find((t) => t.id === taskId) || null;
    setSelectedTask(task);
  };

  // cập nhật task (checklist, title, status,...)
  const updateTask = (updatedTask: Task) => {
    setActiveTabs((prev) => prev.map((t) => t.id === updatedTask.id ? updatedTask : t));
    if (selectedTask?.id === updatedTask.id) {
      setSelectedTask(updatedTask); // cập nhật selectedTask luôn
    }
  };

  return {
    activeTabs,
    selectedTask,
    openTab,
    closeTab,
    selectTab,
    updateTask, // dùng trong TaskDetails khi toggle checklist
  };
};
