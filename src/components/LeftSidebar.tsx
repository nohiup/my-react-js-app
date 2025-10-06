import React from "react";
import type { Task } from "../../types";
import NavIcon from "./items/NavIcon";
import NavBottomIcon from "./items/NavBottomIcons";
import { ICONS, DIMENS } from "../../constants";
import TaskGroup from "./containers/TaskGroup";
import { motion } from "framer-motion";
import { Stack } from "./ui/stack";

interface LeftSidebarUIProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    selectedTaskId?: string;
    onTaskSelect: (id: string) => void;
    nowTasks: Task[];
    pinnedTasks: Task[];
    inboxTasks: Task[];
    onPalleteClick: () => void;
}

const LeftSidebarUI: React.FC<LeftSidebarUIProps> = ({
    isSidebarOpen,
    toggleSidebar,
    selectedTaskId,
    onTaskSelect,
    nowTasks,
    pinnedTasks,
    inboxTasks,
    onPalleteClick,
}) => {
    return (
        <motion.aside
            animate={{
                width: isSidebarOpen ? "300px" : "0px",
                opacity: isSidebarOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="app-background border-r border-primary flex overflow-hidden"
            style={{ flexShrink: 0 }}
        >
            {/* Khi width = 0, nội dung vẫn render nhưng bị clip lại */}
            <Stack align="center" className="w-11 app-background border-r border-primary">
                <div className="w-11 h-11 p-2 border-b border-primary">
                    <div className="text-primary rounded flex items-center justify-center font-bold text-normal border border-primary">
                        P
                    </div>
                </div>

                <nav>
                    <Stack align="center" gap="gap-3" margin="mt-3">
                        <NavIcon icon={ICONS.home} active />
                        <NavIcon icon={ICONS.building} />
                        <NavIcon icon={ICONS.shield} />
                        <NavIcon icon={ICONS.sliders} />
                    </Stack>
                </nav>

                <div className="flex-grow"></div>

                <Stack align="center" gap="gap-3">
                    <NavBottomIcon icon={ICONS.command} />
                    <NavBottomIcon icon={ICONS.palette} onClick={onPalleteClick} />
                    <NavBottomIcon icon={ICONS.helpCircle} />
                    <NavBottomIcon icon={ICONS.user} />
                </Stack>
            </Stack>

            <Stack className="w-64 app-background">
                <Stack row align="center" justify="justify-between" padding="px-3" className={`${DIMENS.headerHeight} border-b border-primary`}>
                    <h3 className="font-bold text-lg text-primary">PM Hub</h3>
                    <button
                        onClick={toggleSidebar}
                        className="w-8 h-8 flex items-center justify-center app-background rounded-md text-title background-primary-hover">
                        {React.cloneElement(ICONS.sidebar, { className: "w-4 h-4" })}
                    </button>
                </Stack>

                <div className="m-3 border-b app-background">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-normal">
                            {React.cloneElement(ICONS.search, { className: "w-4 h-4" })}
                        </span>
                        <input
                            type="text"
                            placeholder="FILTER..."
                            className="w-full pl-9 pr-3 py-1.5 text-sm app-background border border-primary rounded-md focus:outline-none focus:border-primary tracking-wider"
                        />
                    </div>
                </div>

                <Stack padding="pr-1" className="flex-1 overflow-y-auto">
                    <TaskGroup title="Now" tasks={nowTasks} onTaskSelect={onTaskSelect} selectedTaskId={selectedTaskId} />
                    <TaskGroup title="Pinned" tasks={pinnedTasks} onTaskSelect={onTaskSelect} selectedTaskId={selectedTaskId} />
                    <TaskGroup title="Inbox" tasks={inboxTasks} onTaskSelect={onTaskSelect} selectedTaskId={selectedTaskId} badgeCount={3} />
                </Stack>
            </Stack>
        </motion.aside>
    );
};

export default LeftSidebarUI;
