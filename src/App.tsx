import React, { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';
import { tasks, users } from '../constants';
import type { Task } from '../types.ts';
import './App.css';
import './index.css';
import { useHeaderTab } from './hooks/useHeaderTab.ts';
import RightSidebarToggles from './components/items/RightSideBarToggles.tsx';
import { useRightSidebar } from './hooks/useRightSidebar.ts';
import RightSidebar from './components/RightSidebar/index.tsx';
import { cn } from './lib/utils.ts';
import classes from './lib/classes.ts';
import { Stack } from './components/ui/stack.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/configureStore.ts';

const App: React.FC = () => {
  const [, setAllTasks] = useState<Task[]>(tasks);

  const isDarkMode = useSelector((state: RootState) => state.leftSidebar.isDarkMode);
  React.useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);


  const tabs = useHeaderTab({ allTasks: tasks });
  const rightSidebar = useRightSidebar();
  return (
    <Stack gap="gap-0" className="h-screen font-sans text-title app-background">
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 flex flex-col min-w-40 bg-[#f7f8fa]">
          <Header activeTabs={tabs.activeTabs} selectedTabId={tabs.selectedTask?.id} />
          {tabs.selectedTask ?
            <MainContent users={users} />
            :
            <div className={cn(classes.itemCentralize, "flex-1 text-slate-500")}>Select a task to view details</div>}
        </main>

        <RightSidebar task={tabs.selectedTask!} view={rightSidebar.activeView!} isOpen={rightSidebar.isOpen} />

        <RightSidebarToggles
          activeView={rightSidebar.activeView}
          onToggle={rightSidebar.toggleView}
        />
      </div>
      <Footer />
    </Stack>
  );
};

export default App;