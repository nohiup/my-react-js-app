
import React from 'react';
import type { Task, User } from '../../types';
import TaskDetails from './TaskDetails';
import ChartTask from './containers/ChartTask';

interface MainContentProps {
  task: Task;
  users: User[];
  onTaskUpdate: (task: Task) => void;
}

const MainContent: React.FC<MainContentProps> = ({ task, users, onTaskUpdate }) => {
  if (task.id === 'PIN-001') {
    return (
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 app-background text-normal">
        <ChartTask></ChartTask>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 app-background text-normal">
      <TaskDetails task={task} users={users} onTaskUpdate={onTaskUpdate} />
    </div>
  );
};

export default MainContent;
