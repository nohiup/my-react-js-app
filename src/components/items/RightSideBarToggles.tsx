import React from "react";
import { DIMENS, ICONS } from "../../../constants";
import type { RightSidebarView } from "../../hooks/useRightSidebar";
import { Stack } from "../ui/stack";

interface RightSidebarTogglesProps {
  activeView: RightSidebarView;
  onToggle: (view: Exclude<RightSidebarView, null>) => void;
}

const RightSidebarToggles: React.FC<RightSidebarTogglesProps> = ({ activeView, onToggle }) => {
  const buttonBase = "p-1.5 text-normal background-primary-hover rounded-md transition-colors";
  const getButtonClass = (view: string) =>
    `${buttonBase} ${activeView === view ? "selected-primary" : "app-background"}`;

  return (
    <Stack className="border-l border-primary app-background">
      <Stack align="center" row padding="px-2" className={`${DIMENS.headerHeight} border-primary`}>
        <button
          className={`${getButtonClass("info")}`}
          onClick={() => onToggle("info")}>
          {React.cloneElement(ICONS.info, { className: "w-4 h-4" })}
        </button>
      </Stack>
      <Stack row align="center" padding="px-2" className={`${DIMENS.headerHeight} border-primary`}>
        <button
          className={`${getButtonClass("message")}`}
          onClick={() => onToggle("message")}>
          {React.cloneElement(ICONS.messageSquare, { className: "w-4 h-4" })}
        </button>
      </Stack>

    </Stack>
  );
};

export default RightSidebarToggles;
