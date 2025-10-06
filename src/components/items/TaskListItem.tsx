import { cn } from "@/lib/utils";
import type { Task } from "../../../types";
import { Stack } from "../ui/stack";

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
  <Stack row align="center" gap="gap-3" padding="p-2"
    onClick={onSelect}
    className={cn("rounded-lg cursor-pointer transition-colors", isSelected ? "selected-primary" : "background-primary-hover"
    )}>
    <span className="flex-1 text-sm text-title truncate">
      {task.title}
    </span>
    <span className={`${iconColor} w-4 h-4 flex-shrink-0 flex items-center`}>{icon}</span>
  </Stack>
);

export default TaskListItem;