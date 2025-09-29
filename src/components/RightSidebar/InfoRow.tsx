import React from "react";

const InfoRow: React.FC<{
  icon: React.ReactElement<{
    className?: string
  }>;
  label: string;
  children:
  React.ReactNode;
}> = ({ icon, label, children }) => (
  <div>
    <div className="flex items-center space-x-2 text-normal">
      <span className="w-4 h-4 flex items-center justify-center">
        {React.cloneElement(icon, { className: "w-4 h-4 shrink-0" })}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </div>
    <div className="pl-6 pt-1 text-sm text-title">{children}</div>
  </div>);

export default InfoRow;