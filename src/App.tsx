import React, { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';
import { tasks, users } from '../constants';
import type { Task } from '../types.ts';
import './App.css';
import './index.css';
import { useLeftSidebar } from './hooks/useLeftSidebar.ts';
import { useHeaderTab } from './hooks/useHeaderTab.ts';
import RightSidebarToggles from './components/items/RightSideBarToggles.tsx';
import { useRightSidebar } from './hooks/useRightSidebar.ts';
import RightSidebar from './components/RightSidebar/index.tsx';

const App: React.FC = () => {
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handlePaletteClick = () => {
    setIsDarkMode(prev => !prev);
  };

  React.useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const {
    isSidebarOpen,
    toggleSidebar,
    nowTasks,
    pinnedTasks,
    inboxTasks
  } = useLeftSidebar({ initialTasks: tasks });


  const tabs = useHeaderTab({ allTasks: tasks });

  const handleTaskSelect = (taskId: string) => {
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;
    tabs.openTab(task);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setAllTasks(prevTasks =>
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );

    // cập nhật luôn selectedTask
    if (tabs.selectedTask?.id === updatedTask.id) {
      tabs.updateTask(updatedTask); // giả sử bạn có setter
    }
  };
  const rightSidebar = useRightSidebar();

  return (
    <div className="flex flex-col h-screen font-sans text-title app-background">
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar onTaskSelect={handleTaskSelect} selectedTaskId={tabs.selectedTask?.id} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} nowTasks={nowTasks} pinnedTasks={pinnedTasks} inboxTasks={inboxTasks} onPalleteClick={handlePaletteClick} />
        <main className="flex-1 flex flex-col min-w-40 bg-[#f7f8fa]">
          <Header activeTabs={tabs.activeTabs} selectedTabId={tabs.selectedTask?.id} onTabSelect={tabs.selectTab} onTabClose={tabs.closeTab} isSidebarOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} />
          {tabs.selectedTask ? <MainContent task={tabs.selectedTask} users={users} onTaskUpdate={handleTaskUpdate} /> : <div className="flex-1 flex items-center justify-center text-slate-500">Select a task to view details</div>}
        </main>

        <RightSidebar task={tabs.selectedTask!} view={rightSidebar.activeView!} isOpen={rightSidebar.isOpen} />

        <RightSidebarToggles
          activeView={rightSidebar.activeView}
          onToggle={rightSidebar.toggleView}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;