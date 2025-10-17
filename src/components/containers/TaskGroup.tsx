import React, { useState } from "react";
import type { Task } from "../../../types";
import TaskListItem from "../items/TaskListItem";
import { ICONS } from "../../../constants";
import { Stack } from "../ui/stack";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/configureStore";
import { setSelectedTaskId } from "@/store/LeftSidebar/leftSidebarTaskSlice";
import { openNewTask } from "@/store/Header/headerTabSlice";

const TaskGroup: React.FC<{
  title: string;
  tasks: Task[];
  defaultOpen?: boolean;
  badgeCount?: number;
}> = ({ title, tasks, defaultOpen = true, badgeCount }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const dispatch = useDispatch<AppDispatch>();
  const selectedId = useSelector((state: RootState) => state.leftSidebarTask.selectedTaskId);
  return (
    <div>
      <Stack row align="center" padding="pl-2 pr-5 py-1" justify="justify-between"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md cursor-pointer">
        <Stack row align="center" gap="gap-1.5">
          <span
            className={`w-4 h-4 text-primary transition-transform ${isOpen ? "rotate-0" : "-rotate-90"
              }`}>
            {React.cloneElement(ICONS.chevronDown, { className: "w-4 h-4 text-primary" })}
          </span>
          <span className="text-xs font-bold uppercase text-primary tracking-wider">
            {title}
          </span>
        </Stack>
        {badgeCount && (
          <span className="text-xs font-bold background-primary rounded px-1.5  py-0.5">
            {badgeCount}
          </span>
        )}
      </Stack>
      {
        isOpen && (
          <div className="pt-2 px-4 space-y-1">
            {tasks.map(task => {
              let dotColor = 'bg-yellow-400'; if (task.id.startsWith('BUG')) dotColor = 'bg-red-400'; if (task.id.startsWith('FEA')) dotColor = 'bg-green-400';
              return (
                <TaskListItem
                  key={task.id}
                  task={task}
                  onSelect={() => {
                    dispatch(setSelectedTaskId(task.id))
                    dispatch(openNewTask(task))
                  }
                  }
                  isSelected={task.id === selectedId}
                  icon=<span className={`block w-2 h-2 rounded-full ml-2 flex-shrink-0 ${dotColor}`} /> iconColor="text-transparent"
                />)
            })}
          </div>
        )
      }
    </div >
  );
};

export default TaskGroup;