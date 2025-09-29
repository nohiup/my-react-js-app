import { useState } from "react";

export type RightSidebarView = "message" | "info" | null;

export const useRightSidebar = () => {
  const [activeView, setActiveView] = useState<RightSidebarView>(null);

  const toggleView = (view: Exclude<RightSidebarView, null>) => {
    setActiveView(prev => (prev === view ? null : view));
  };

  const isOpen = activeView !== null;

  return { activeView, toggleView, isOpen };
};
