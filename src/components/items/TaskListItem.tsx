import type { Task } from "../../../types";

type TaskListItemProps = {
  task: Task;
  onSelect: () => void;
  isSelected: boolean;
  icon: React.ReactNode;
  iconColor: string;
};

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onSelect,
  isSelected,
  icon,
  iconColor,
}) => (
  <div
    onClick={onSelect}
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${isSelected ? "selected-primary" : "background-primary-hover"
      }`}
  >
    <span className="flex-1 text-sm text-title truncate">
      {task.title}
    </span>
    <span className={`${iconColor} w-4 h-4 flex-shrink-0 flex items-center`}>{icon}</span>
  </div>
);

export default TaskListItem;