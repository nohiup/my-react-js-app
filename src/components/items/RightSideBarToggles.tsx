import React from "react";
import { DIMENS, ICONS } from "../../../constants";
import type { RightSidebarView } from "../../hooks/useRightSidebar";

interface RightSidebarTogglesProps {
  activeView: RightSidebarView;
  onToggle: (view: Exclude<RightSidebarView, null>) => void;
}

const RightSidebarToggles: React.FC<RightSidebarTogglesProps> = ({ activeView, onToggle }) => {
  const buttonBase = "p-1.5 text-normal background-primary-hover rounded-md transition-colors";
  const getButtonClass = (view: string) =>
    `${buttonBase} ${activeView === view ? "selected-primary" : "app-background"}`;

  return (
    <div className="flex flex-col border-l border-primary app-background">
      <div className={`${DIMENS.headerHeight} flex items-center border-primary px-2`}>
        <button
          className={`${getButtonClass("info")}`}
          onClick={() => onToggle("info")}>
          {React.cloneElement(ICONS.info, { className: "w-4 h-4" })}
        </button>
      </div>
      <div className={`${DIMENS.headerHeight} flex items-center border-primary px-2`}>
        <button
          className={`${getButtonClass("message")}`}
          onClick={() => onToggle("message")}>
          {React.cloneElement(ICONS.messageSquare, { className: "w-4 h-4" })}
        </button>
      </div>

    </div>
  );
};

export default RightSidebarToggles;
