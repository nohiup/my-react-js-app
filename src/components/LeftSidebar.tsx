import React, { useEffect } from "react";
import NavIcon from "./items/NavIcon";
import NavBottomIcon from "./items/NavBottomIcons";
import { ICONS, DIMENS } from "../../constants";
import TaskGroup from "./containers/TaskGroup";
import { motion } from "framer-motion";
import { Stack } from "./ui/stack";
import { TerminalDialog } from "./items/TerminalDialog";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/configureStore";
import { toggleDarkMode, toggleSidebar } from "@/store/LeftSidebar/leftSidebarSlice";
import { fetchLeftSidebarTask } from "@/store/LeftSidebar/leftSidebarTaskSlice";
import { Skeleton } from "./ui/skeleton";
import TabName from "@/data/enum";


const LeftSidebarUI: React.FC = ({
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.leftSidebarTask);
    const isLeftSidebarOpen = useSelector((state: RootState) => state.leftSidebar.isOpen)
    const activeTab = useSelector((state: RootState) => state.leftSidebar.activeTab);
    useEffect(() => {
        dispatch(fetchLeftSidebarTask(activeTab));
    }, [dispatch, activeTab]);

    var allTasks = data;
    if (allTasks === null) allTasks = [];

    const nowTasks = activeTab === TabName.Home ? allTasks.filter(t => ['PAY-234', 'BUG-007', 'FEA-112', 'DEV-404'].includes(t.id)) : allTasks;
    const pinnedTasks = allTasks.filter(t => ['PIN-001', 'PIN-002'].includes(t.id));
    const inboxTasks = allTasks.filter(t => ['DES-101', 'DES-102', 'DOC-001'].includes(t.id));

    return (
        //Icon left col
        <Stack row gap="gap-0">
            <Stack align="center" className="w-11 app-background border-r border-primary">
                <div className="w-11 h-11 p-2 border-b border-primary">
                    <div className="text-primary rounded flex items-center justify-center font-bold text-normal border border-primary">
                        P
                    </div>
                </div>

                <nav>
                    <Stack align="center" gap="gap-3" margin="mt-3">
                        <NavIcon icon={ICONS.home} id={TabName.Home} path="/home" />
                        <NavIcon icon={ICONS.building} id={TabName.Projects} path="/projects" />
                        <NavIcon icon={ICONS.shield} id={TabName.Security} path="/security" />
                        <NavIcon icon={ICONS.sliders} id={TabName.Settings} path="/settings" />
                    </Stack>
                </nav>

                <div className="flex-grow"></div>

                <Stack align="center" gap="gap-3">
                    <TerminalDialog icon={ICONS.command} />
                    <NavBottomIcon icon={ICONS.palette} onClick={() => dispatch(toggleDarkMode())} />
                    <NavBottomIcon icon={ICONS.helpCircle} />
                    <NavBottomIcon icon={ICONS.user} />
                </Stack>
            </Stack>

            <motion.aside
                animate={{
                    width: isLeftSidebarOpen ? "256px" : "0px",
                    opacity: isLeftSidebarOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="app-background border-r border-primary flex overflow-hidden"
                style={{ flexShrink: 0 }}>

                <Stack className="w-64 app-background">
                    <Stack row align="center" justify="justify-between" padding="px-3" className={`${DIMENS.headerHeight} border-b border-primary`}>
                        <h3 className="font-bold text-lg text-primary">PM Hub</h3>
                        <button
                            onClick={() => dispatch(toggleSidebar("none"))}
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
                    {loading && (
                        <Stack align="center" gap="gap-4">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </Stack>
                    )}
                    {!loading && (
                        <Stack padding="pr-1" className="flex-1 overflow-y-auto">
                            <TaskGroup title="Now" tasks={nowTasks} activeTab={activeTab} />
                            <TaskGroup title="Pinned" tasks={pinnedTasks} activeTab={activeTab} />
                            <TaskGroup title="Inbox" tasks={inboxTasks} badgeCount={3} activeTab={activeTab} />
                        </Stack>
                    )}
                </Stack>
            </motion.aside>
        </Stack>
    );
};

export default LeftSidebarUI;
