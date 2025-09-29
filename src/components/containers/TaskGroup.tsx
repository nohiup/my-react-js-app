import React, { useState } from "react";
import type { Task } from "../../../types";
import TaskListItem from "../items/TaskListItem";
import { ICONS } from "../../../constants";

const TaskGroup: React.FC<{
  title: string;
  tasks: Task[];
  onTaskSelect: (id: string) => void;
  selectedTaskId?: string;
  defaultOpen?: boolean;
  badgeCount?: number;
}> = ({ title, tasks, onTaskSelect, selectedTaskId, defaultOpen = true, badgeCount }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between pl-2 pr-5 py-1 rounded-md cursor-pointer">
        <div className="flex items-center space-x-1.5">
          <span
            className={`w-4 h-4 text-primary transition-transform ${isOpen ? "rotate-0" : "-rotate-90"
              }`}>
            {React.cloneElement(ICONS.chevronDown, { className: "w-4 h-4 text-primary" })}
          </span>
          <span className="text-xs font-bold uppercase text-primary tracking-wider">
            {title}
          </span>
        </div>
        {badgeCount && (
          <span className="text-xs font-bold background-primary rounded px-1.5  py-0.5">
            {badgeCount}
          </span>
        )}
      </div>
      {isOpen && (
        <div className="pt-2 px-4 space-y-1">
          {tasks.map(task => {
            let dotColor = 'bg-yellow-400'; if (task.id.startsWith('BUG')) dotColor = 'bg-red-400'; if (task.id.startsWith('FEA')) dotColor = 'bg-green-400';
            return (<TaskListItem key={task.id} task={task} onSelect={() => onTaskSelect(task.id)} isSelected={task.id === selectedTaskId} icon=<span className={`block w-2 h-2 rounded-full ml-2 flex-shrink-0 ${dotColor}`} /> iconColor="text-transparent" />)
          })}
        </div>
      )}
    </div>
  );
};

export default TaskGroup;