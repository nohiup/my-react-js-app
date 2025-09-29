import React from 'react';
import type { Task } from '../../types.ts';
import { ICONS } from '../../constants.tsx';

interface HeaderProps {
  activeTabs: Task[];
  selectedTabId?: string;
  onTabSelect: (taskId: string) => void;
  onTabClose: (taskId: string) => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void; // mới
}

const Tab: React.FC<{ task: Task; isActive: boolean; onSelect: () => void; onClose: (e: React.MouseEvent) => void; }> = ({ task, isActive, onSelect, onClose }) => (
  <div
    onClick={onSelect}
    className={`flex items-center justify-between h-full px-4 border-b-2 cursor-pointer transition-colors group whitespace-nowrap ${isActive
      ? 'border-blue-500 app-background text-title'
      : 'border-transparent text-normal background-primary-hover'
      }`}
  >
    <div className="flex items-center space-x-2 min-w-0">
      <span className="text-xs font-semibold text-normal">[{task.id.split('-')[0]}]</span>
      <span className="text-sm truncate w-full">{task.title}</span>
    </div>
    <button
      onClick={onClose}
      className={`ml-4 w-5 h-5 flex items-center justify-center rounded-md text-normal background-primary-hover hover:text-title ${isActive ? '' : 'opacity-0 group-hover:opacity-100'}`}>
      {/* Fix: Removed unnecessary and problematic `as React.ReactElement` cast. */}
      {React.cloneElement(ICONS.x, { className: "w-3.5 h-3.5" })}
    </button>
  </div>
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
      <div className="flex items-center h-full flex-1 min-w-0">
        <div className="flex-1 h-full flex items-center overflow-x-auto space-x-1">
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
        </div>
      </div>
    </header>
  );
};


export default Header;