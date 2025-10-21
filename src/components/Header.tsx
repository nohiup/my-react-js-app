import React from 'react';
import type { Task } from '../../types.ts';
import { ICONS } from '../../constants.tsx';
import { Stack } from './ui/stack.tsx';
import { cn } from '@/lib/utils.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/configureStore.ts';
import { toggleSidebar } from '@/store/LeftSidebar/leftSidebarSlice.ts';
import { closeTask } from '@/store/Header/headerTabSlice.ts';
import { setSelectedTaskId } from '@/store/LeftSidebar/leftSidebarTaskSlice.ts';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  activeTabs: Task[];
  selectedTabId?: string;
}

const Tab: React.FC<{ task: Task; isActive: boolean; onSelect: () => void; onClose: (e: React.MouseEvent) => void; }> = ({ task, isActive, onSelect, onClose }) => (
  <Stack row align="center" justify="justify-between" padding="px-4"
    onClick={onSelect}
    className={cn("h-full border-b-2 cursor-pointer transition-colors group whitespace-nowrap", isActive
      ? "border-blue-500 app-background text-title"
      : "border-transparent text-normal background-primary-hover"
    )}
  >
    <Stack row align="center" className="min-w-0">
      <span className="text-xs font-semibold text-normal">[{task.id.split('-')[0]}]</span>
      <span className="text-sm truncate w-full">{task.title}</span>
    </Stack>
    <button
      onClick={onClose}
      className={`ml-4 w-5 h-5 flex items-center justify-center rounded-md text-normal background-primary-hover hover:text-title ${isActive ? '' : 'opacity-0 group-hover:opacity-100'}`}>
      {/* Fix: Removed unnecessary and problematic `as React.ReactElement` cast. */}
      {React.cloneElement(ICONS.x, { className: "w-3.5 h-3.5" })}
    </button>
  </Stack>
);

const Header: React.FC<HeaderProps> = () => {
  const isLeftSidebarOpen = useSelector((state: RootState) => state.leftSidebar.isOpen)
  const dispatch = useDispatch<AppDispatch>();
  const selectedTabTaskId = useSelector((state: RootState) => state.leftSidebarTask.selectedTaskId)
  const navigate = useNavigate();
  const active = useSelector((state: RootState) => state.leftSidebar.activeTab);
  const activeTabs = useSelector((state: RootState) => state.headerTab.openedTabTasks);
  return (
    <header className="flex-shrink-0 h-11 app-background border-b border-primary flex items-center justify-between px-2">
      <Stack row align="center" className="h-full flex-1 min-w-0">
        <Stack row align="center" gap="gap-1" className="flex-1 h-full overflow-x-auto">
          {!isLeftSidebarOpen && (
            <button
              onClick={() => dispatch(toggleSidebar("none"))}
              className="w-8 h-8 flex items-center justify-center app-background rounded-md text-title background-primary-hover"
            >
              {React.cloneElement(ICONS.sidebar, { className: "w-4 h-4" })}
            </button>
          )}
          {activeTabs.map((tab) => (
            <div key={tab.id} className="flex-1 min-w-0 max-w-fit h-full">
              <Tab
                key={tab.id}
                task={tab}
                isActive={tab.id === selectedTabTaskId}
                onSelect={() => {
                  dispatch(setSelectedTaskId(tab.id));
                  navigate(`/${active.toString()}/${tab.id}`);
                }
                }
                onClose={(e) => {
                  e.stopPropagation();
                  dispatch(closeTask(tab.id));

                  if (tab.id === selectedTabTaskId) {
                    const index = activeTabs.findIndex(t => t.id === tab.id);
                    const prevTab = activeTabs[index - 1] || activeTabs[index + 1] || null;
                    if (prevTab) {
                      dispatch(setSelectedTaskId(prevTab.id));
                    } else {
                      dispatch(setSelectedTaskId(null));
                    }
                  }
                  navigate(`/${active.toString()}/${tab.id}`);
                }}
              />
            </div>
          ))}
        </Stack>
      </Stack>
    </header>
  );
};


export default Header;