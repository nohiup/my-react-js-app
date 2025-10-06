import React from 'react';
import type { Task } from '../../types.ts';
import { ICONS } from '../../constants.tsx';
import { Stack } from './ui/stack.tsx';
import { cn } from '@/lib/utils.ts';

interface HeaderProps {
  activeTabs: Task[];
  selectedTabId?: string;
  onTabSelect: (taskId: string) => void;
  onTabClose: (taskId: string) => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void; // mới
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

const Header: React.FC<HeaderProps> = ({
  activeTabs,
  selectedTabId,
  onTabSelect,
  onTabClose,
  isSidebarOpen,
  onSidebarToggle,
}) => {
  return (
    <header className="flex-shrink-0 h-11 app-background border-b border-primary flex items-center justify-between px-2">
      <Stack row align="center" className="h-full flex-1 min-w-0">
        <Stack row align="center" gap="gap-1" className="flex-1 h-full overflow-x-auto">
          {!isSidebarOpen && (
            <button
              onClick={onSidebarToggle}
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
                isActive={tab.id === selectedTabId}
                onSelect={() => onTabSelect(tab.id)}
                onClose={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
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