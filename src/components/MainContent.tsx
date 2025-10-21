import React, { useEffect } from 'react';
import type { User } from '../../types';
import TaskDetails from './TaskDetails';
import ChartTask from './containers/ChartTask';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/configureStore';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './ui/empty';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { fetchMainContentTask, updateTask } from '@/store/MainContent/mainContentSlice';

interface MainContentProps {
  users: User[];
}

const MainContent: React.FC<MainContentProps> = ({ users }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTaskId = useSelector((state: RootState) => state.leftSidebarTask.selectedTaskId)
  const { task, loading } = useSelector((state: RootState) => state.mainContent);
  useEffect(() => {
    if (selectedTaskId === null || selectedTaskId === "") return;
    dispatch(fetchMainContentTask(selectedTaskId))
  }, [selectedTaskId]);

  if (selectedTaskId === null || selectedTaskId === "") {
    return (<Empty className="border border-dashed app-background">
      <EmptyHeader className="text-constrast">
        <EmptyTitle>Content Empty</EmptyTitle>
        <EmptyDescription className="text-constrast">
          Empty task content, select a task to view content
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>

      </EmptyContent>
    </Empty>)
  }
  if (loading) {
    return (
      <Empty className="w-full app-background">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="text-constrast">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    )
  }
  if (task === null) {
    return (<Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyTitle>Content Empty</EmptyTitle>
        <EmptyDescription>
          Empty task content, select a task to view content
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>

      </EmptyContent>
    </Empty>
    );
  }
  if (selectedTaskId === 'PIN-001') {
    return (
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 app-background text-normal">
        <ChartTask></ChartTask>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 app-background text-normal">
      <TaskDetails task={task} users={users} onTaskUpdate={(updatedTask) => dispatch(updateTask(updatedTask))} />
    </div>);
};

export default MainContent;
